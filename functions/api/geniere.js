const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: cors });
}

export async function onRequestPost(context) {
  const apiKey = context.env.OPENAI_API_KEY;
  if (!apiKey) return json({ error: 'OPENAI_API_KEY non configurata su Cloudflare.' }, 503);

  let body;
  try { body = await context.request.json(); }
  catch { return json({ error: 'Richiesta non valida.' }, 400); }

  const mode = body.mode;
  if (!['suggest', 'design', 'evaluate'].includes(mode)) return json({ error: 'Modalità non valida.' }, 400);

  const prompt = buildPrompt(mode, body.payload || {});
  const schema = schemaFor(mode);
  const model = context.env.OPENAI_MODEL || 'gpt-5-mini';

  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model,
      instructions: 'Sei il Geniere di Armies Builder. Rispetta sempre i vincoli forniti. Non inventare carte: quando non sei certo, segnala che la proposta deve essere validata da Scryfall. Rispondi solo nel formato JSON richiesto.',
      input: prompt,
      text: { format: { type: 'json_schema', name: `armies_${mode}`, strict: true, schema } }
    })
  });

  const data = await response.json();
  if (!response.ok) return json({ error: data?.error?.message || 'Errore OpenAI.' }, response.status);
  const text = data.output_text || data.output?.flatMap(x => x.content || []).find(x => x.type === 'output_text')?.text;
  if (!text) return json({ error: 'Risposta IA vuota.' }, 502);
  try { return json(JSON.parse(text)); }
  catch { return json({ error: 'La risposta IA non era JSON valido.' }, 502); }
}

const ARMIES_KEYS = ["Attacco", "Aura", "Blocco", "Caso", "Copia", "Danno", "Distruzione", "Equipaggiamento", "Esilia - sé stessa", "Esilia - altre carte", "Gira", "Macina", "Manovrare", "Neutralizza", "Paga", "Pedina", "Pesca", "Profetizza", "Regala", "Riprendere", "Rivela", "Sacrifica", "Santuario", "Scarta", "Segnalino", "Soglia", "Spendere", "Terraferma", "Tornare", "Vacuità", "Vita - guadagno", "Vita - perdita", "Vota"];

function buildPrompt(mode, payload) {
  const rules = `Formato Commander Armies. Il mazzo deve avere esattamente 100 carte incluso il Commander: quindi in modalità design devi restituire esattamente 99 carte nel campo deck_cards, contando le quantità. Rispetta identità colore Commander e singleton salvo terre base o eccezioni testuali. Le carte devono rispettare Tribe e Key secondo i filtri dell'app. Le terre pure sono sempre valide; le terre con altri tipi devono superare i normali filtri. Le creature che scelgono un tipo di creatura e diventano quel tipo sono valide; il solo Cangiante non basta. Non limitarti alle sole carte principali: genera la lista completa. Usa nomi ufficiali inglesi di Scryfall per le carte. Le sole Key Armies ammesse sono: Attacco, Aura, Blocco, Caso, Copia, Danno, Distruzione, Equipaggiamento, Esilia - sé stessa, Esilia - altre carte, Gira, Macina, Manovrare, Neutralizza, Paga, Pedina, Pesca, Profetizza, Regala, Riprendere, Rivela, Sacrifica, Santuario, Scarta, Segnalino, Soglia, Spendere, Terraferma, Tornare, Vacuità, Vita - guadagno, Vita - perdita, Vota. Non inventare, tradurre, pluralizzare o rinominare le Key.`;
  return `${rules}\nModalità: ${mode}.\nDati utente:\n${JSON.stringify(payload, null, 2)}`;
}

function schemaFor(mode) {
  if (mode === 'suggest') return {
    type: 'object', additionalProperties: false,
    required: ['commander', 'tribe', 'key', 'score', 'strategy', 'reason'],
    properties: {
      commander: { type: 'string' }, tribe: { type: 'string' }, key: { type: 'string', enum: ARMIES_KEYS },
      score: { type: 'integer', minimum: 0, maximum: 100 }, strategy: { type: 'string' }, reason: { type: 'string' }
    }
  };
  if (mode === 'design') return {
    type: 'object', additionalProperties: false,
    required: ['name', 'summary', 'targets', 'core_cards', 'deck_cards'],
    properties: {
      name: { type: 'string' }, summary: { type: 'string' },
      targets: {
        type: 'object', additionalProperties: false,
        required: ['lands', 'ramp', 'draw', 'interaction', 'protection', 'creatures'],
        properties: {
          lands: { type: 'integer' }, ramp: { type: 'integer' }, draw: { type: 'integer' },
          interaction: { type: 'integer' }, protection: { type: 'integer' }, creatures: { type: 'integer' }
        }
      },
      core_cards: { type: 'array', maxItems: 25, items: {
        type: 'object', additionalProperties: false, required: ['name', 'role', 'reason'],
        properties: { name: { type: 'string' }, role: { type: 'string' }, reason: { type: 'string' } }
      }},
      deck_cards: { type: 'array', minItems: 1, maxItems: 99, items: {
        type: 'object', additionalProperties: false, required: ['name', 'qty', 'role'],
        properties: {
          name: { type: 'string' },
          qty: { type: 'integer', minimum: 1, maximum: 40 },
          role: { type: 'string' }
        }
      }}
    }
  };
  return {
    type: 'object', additionalProperties: false,
    required: ['score', 'summary', 'proposals'],
    properties: {
      score: { type: 'integer', minimum: 0, maximum: 100 }, summary: { type: 'string' },
      proposals: { type: 'array', maxItems: 20, items: {
        type: 'object', additionalProperties: false,
        required: ['severity', 'title', 'reason', 'remove', 'add'],
        properties: {
          severity: { type: 'string', enum: ['errore', 'debolezza', 'miglioria'] },
          title: { type: 'string' }, reason: { type: 'string' },
          remove: { type: 'string' }, add: { type: 'string' }
        }
      }}
    }
  };
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { ...cors, 'Content-Type': 'application/json; charset=utf-8' } });
}
