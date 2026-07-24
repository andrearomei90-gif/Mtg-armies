
const $=s=>document.querySelector(s);
const KEY_DEFINITIONS={
 "Attacco":{patterns:["\\battack(?:s|ed|ing)?\\b","\\braid\\b","\\bbattalion\\b","\\bexalted\\b","\\bmyriad\\b"],keywords:["raid","battalion","exalted","myriad"]},
 "Aura":{patterns:["\\bauras?\\b","\\benchant(?:ed|ing|s)?\\b","\\bbestow\\b"],keywords:["enchant","bestow"]},
 "Blocco":{patterns:["\\bblock(?:s|ed|ing|er|ers)?\\b","\\bmenace\\b","\\breach\\b"],keywords:["menace","reach"]},
 "Caso":{patterns:["\\brandom\\b","\\bcoin\\b","\\bflip a coin\\b","\\bdie\\b","\\bdice\\b","\\broll(?:s|ed|ing)?\\b"],keywords:[]},
 "Copia":{patterns:["\\bcopy(?:y|ies|ied|ing)?\\b","\\bcopied\\b"],keywords:["replicate","storm"]},
 "Danno":{patterns:["\\bdamage\\b","\\bdeals? damage\\b","\\bcombat damage\\b","\\bnoncombat damage\\b","\\bexcess damage\\b","\\bdeathtouch\\b","\\bfirst strike\\b","\\bdouble strike\\b","\\btrample\\b","\\btoxic\\b","\\binfect\\b","\\bwither\\b"],keywords:["deathtouch","first strike","double strike","trample","toxic","infect","wither"]},
 "Distruzione":{patterns:["\\bdestroy(?:s|ed|ing)?\\b","\\bindestructible\\b"],keywords:["indestructible"]},
 "Equipaggiamento":{patterns:["\\bequipment\\b","\\bequip(?:ped|s|ping)?\\b","\\breconfigure\\b","\\bliving weapon\\b","\\bfor mirrodin!\\b"],keywords:["equip","reconfigure","living weapon","for mirrodin!"]},
 "Esilia - sé stessa":{patterns:["\\bexile (?:this|it|that card|this card)\\b","\\bexile [^.!?]{0,80} from (?:your|its owner's) graveyard\\b","\\bexile [^.!?]{0,80} as (?:an additional )?cost\\b","\\bexile [^.!?]{0,80} instead\\b","\\bescape\\b","\\bflashback\\b","\\bdelve\\b","\\bforetell\\b","\\bsuspend\\b","\\bplot\\b"],keywords:["escape","flashback","delve","foretell","suspend","plot"]},
 "Esilia - altre carte":{patterns:["\\bexile target\\b","\\bexile another\\b","\\bexile all\\b","\\bexile each\\b","\\bexile up to\\b","\\bexile a card\\b","\\bexile cards?\\b","\\bexile permanents?\\b"],keywords:[]},
 "Gira":{patterns:["\\bturn(?:s|ed|ing)? [^.!?]{0,50} face (?:up|down)\\b","\\bflip(?:s|ped|ping)?\\b","\\btransform(?:s|ed|ing)?\\b","\\bmorph\\b","\\bmanifest\\b","\\bdisguise\\b","\\bcloak\\b"],keywords:["morph","manifest","disguise","cloak","transform"]},
 "Macina":{patterns:["\\bmill(?:s|ed|ing)?\\b","\\bput [^.!?]{0,60} cards? from [^.!?]{0,40} library into [^.!?]{0,30} graveyard\\b"],keywords:["mill"]},
 "Manovrare":{patterns:["\\bcrew\\b","\\bcrewed\\b"],keywords:["crew"]},
 "Neutralizza":{patterns:["\\bcounter target\\b","\\bcounter that\\b","\\bcounter it\\b","\\bcan't be countered\\b"],keywords:[]},
 "Paga":{patterns:["\\bpay(?:s|ing|ed)?\\b","\\bpaid\\b"],keywords:[]},
 "Pedina":{patterns:["\\btokens?\\b","\\bcreate(?:s|d|ing)? a\\b","\\bamass\\b","\\bfabricate\\b","\\bincubate\\b","\\bpopulate\\b","\\bliving weapon\\b"],keywords:["amass","fabricate","incubate","populate","living weapon"]},
 "Pesca":{patterns:["\\bdraw(?:s|n|ing)?\\b","\\bdrew\\b","\\bcycling\\b"],keywords:["cycling"]},
 "Profetizza":{patterns:["\\bscry\\b","\\bscries\\b","\\bscrying\\b"],keywords:["scry"]},
 "Regala":{patterns:["\\bgift\\b","\\bpromised a gift\\b"],keywords:["gift"]},
 "Riprendere":{patterns:["\\brebound\\b"],keywords:["rebound"]},
 "Rivela":{patterns:["\\breveal(?:s|ed|ing)?\\b","\\brevealed\\b"],keywords:[]},
 "Sacrifica":{patterns:["\\bsacrifice(?:s|d|ing)?\\b","\\bsacrificed\\b","\\bexploit\\b"],keywords:["exploit"]},
 "Santuario":{patterns:["\\bshrine(?:s)?\\b"],keywords:[]},
 "Scarta":{patterns:["\\bdiscard(?:s|ed|ing)?\\b","\\bmadness\\b","\\bcycling\\b"],keywords:["madness","cycling"]},
 "Segnalino":{patterns:["\\bcounters?\\b","\\bproliferate\\b","\\badapt\\b","\\bamass\\b","\\bbackup\\b","\\bevolve\\b","\\bfabricate\\b","\\bgraft\\b","\\bmentor\\b","\\bmodular\\b","\\briot\\b"],keywords:["proliferate","adapt","amass","backup","evolve","fabricate","graft","mentor","modular","riot"]},
 "Soglia":{patterns:["\\bthreshold\\b"],keywords:["threshold"]},
 "Spendere":{patterns:["\\bspend(?:s|ing)?\\b","\\bspent\\b"],keywords:[]},
 "Terraferma":{patterns:["\\blandfall\\b","\\ba land enters(?: the battlefield)? under your control\\b"],keywords:["landfall"]},
 "Tornare":{patterns:["\\breturn(?:s|ed|ing)?\\b","\\breturned\\b","\\bput [^.!?]{0,80} (?:onto the battlefield|into your hand|on top of|from [^.!?]{0,40} graveyard)\\b"],keywords:["unearth","disturb","recover"]},
 "Vacuità":{patterns:["\\bdevoid\\b"],keywords:["devoid"]},
 "Vita - guadagno":{patterns:["\\bgain(?:s|ed|ing)? [^.!?]{0,20} life\\b","\\blife total becomes?\\b","\\bdouble [^.!?]{0,20} life total\\b","\\blifelink\\b"],keywords:["lifelink"]},
 "Vita - perdita":{patterns:["\\blose(?:s|st|ing)? [^.!?]{0,20} life\\b","\\blost [^.!?]{0,20} life\\b","\\bhalf [^.!?]{0,20} life total\\b","\\blife total becomes?\\b"],keywords:[]},
 "Vota":{patterns:["\\bvote(?:s|d|ing)?\\b","\\bwill of the council\\b","\\bcouncil's dilemma\\b","\\bassist\\b"],keywords:["assist"]}
};
const EXCLUDED_ARMIES_TRIBES=new Set(["Army"]);
const FALLBACK_TRIBES=["Advisor","Angel","Artificer","Assassin","Beast","Bird","Cat","Cleric","Construct","Demon","Dragon","Druid","Dwarf","Elf","Elemental","Faerie","Goblin","Human","Knight","Merfolk","Orc","Pirate","Rogue","Shaman","Skeleton","Sliver","Soldier","Spirit","Vampire","Warrior","Wizard","Zombie"];
const STORAGE="armiesBuilderDecksV45", CURRENT="armiesBuilderCurrentV45";
let state={id:"",name:"Nuovo mazzo",commander:null,tribe:"",key:"Danno",bracket:2,cards:{}};
let currentCards=[];
function imageOf(c){return c.image_uris?.normal||c.card_faces?.[0]?.image_uris?.normal||""}
function oracleOf(c){return c.oracle_text||c.card_faces?.map(f=>f.oracle_text||"").join("\n")||""}
function typeOf(c){return c.type_line||c.card_faces?.map(f=>f.type_line||"").join(" // ")||""}
function escapeQuery(s){return String(s||"").replace(/["\\]/g," ").trim()}
function quote(s){return `"${escapeQuery(s)}"`}
function regexEscape(s){return String(s||"").replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}
function exactWordQuery(field,word,{plural=true}={}){
 const safe=regexEscape(escapeQuery(word));
 const body=plural&&!/s$/i.test(word)?`${safe}s?`:safe;
 return `${field}:/\\b${body}\\b/i`;
}
function keyQuery(){
 const d=KEY_DEFINITIONS[state.key]||{patterns:[],keywords:[]};
 const pieces=[...(d.patterns||[]).map(x=>`o:/${x}/i`),...(d.keywords||[]).map(x=>`kw:${quote(x)}`)];
 // Scryfall può interpretare in modo più restrittivo alcune regex complesse.
 // Per Sacrifica aggiungiamo anche la ricerca testuale semplice: intercetta
 // sacrifice, sacrifices, sacrificed e sacrificing; il controllo locale
 // successivo mantiene comunque la precisione del filtro.
 if(state.key==="Sacrifica")pieces.unshift(`o:sacrifice`);
 return pieces.length?`(${pieces.join(" or ")})`:"";
}
function cardFaces(c){return c.card_faces?.length?c.card_faces:[c]}
function faceOracle(f){return f.oracle_text||""}
function faceType(f){return f.type_line||""}
function isCreatureFace(f){return /(^|\s)Creature(\s|$)/i.test(faceType(f))}
function isLandFace(f){return /(^|\s)Land(\s|$)/i.test(faceType(f))}
function faceMentionsTribe(f,tribe){
 const safe=regexEscape(tribe);
 const plural=/s$/i.test(tribe)?safe:`${safe}s?`;
 const rx=new RegExp(`\\b${plural}\\b`,"i");
 return rx.test(faceType(f))||rx.test(faceOracle(f));
}
function faceMatchesKey(f,c){
 const d=KEY_DEFINITIONS[state.key]||{patterns:[],keywords:[]};
 const oracle=faceOracle(f);
 return (d.patterns||[]).some(p=>{try{return new RegExp(p,"i").test(oracle)}catch{return false}});
}
function isEvergreenFace(f){const o=faceOracle(f).toLowerCase();return !isCreatureFace(f)&&(o.includes("commander")||o.includes("choose a creature type"))}
function armiesCardCompatible(c){
 const faces=cardFaces(c);
 const tribe=state.tribe;
 const creatureFaces=faces.filter(isCreatureFace);
 const landFaces=faces.filter(isLandFace);
 const nonLandFaces=faces.filter(f=>!isLandFace(f));

 // Una carta composta esclusivamente da una o più facce Terra è una normale
 // terra e rimane sempre disponibile.
 if(landFaces.length&&nonLandFaces.length===0)return true;

 // Se una carta ha sia una faccia Terra sia una faccia magia, la faccia Terra
 // non la rende automaticamente valida. La parte non-Terra deve citare la
 // Tribe oppure, se non è una creatura, corrispondere alla Key selezionata.
 // Inoltre ogni eventuale faccia Creatura deve appartenere o citare la Tribe.
 if(landFaces.length&&nonLandFaces.length){
  if(creatureFaces.some(f=>!faceMentionsTribe(f,tribe)))return false;
  return nonLandFaces.some(f=>faceMentionsTribe(f,tribe)||(!isCreatureFace(f)&&faceMatchesKey(f,c)));
 }

 const citesTribe=faces.some(f=>faceMentionsTribe(f,tribe));
 const nonCreatureKeyFaces=faces.filter(f=>!isCreatureFace(f)&&faceMatchesKey(f,c));
 const citesKey=nonCreatureKeyFaces.length>0;
 // Caso speciale carte a più facce: una Key su una faccia non-creatura
 // non può rendere valida una carta se un'altra faccia è una creatura
 // che non cita/appartiene alla Tribe scelta.
 if(faces.length>1&&citesKey&&creatureFaces.some(f=>!faceMentionsTribe(f,tribe)))return false;
 return citesTribe||citesKey||faces.some(isEvergreenFace);
}
function colorQuery(){const ids=state.commander?.color_identity||[];return ids.length?`id<=${ids.join("")}`:"id:c"}
function landFilterQuery(){
 const v=$("#landType")?.value||"";
 const map={basic:"t:basic",w:"produces:w",u:"produces:u",b:"produces:b",r:"produces:r",g:"produces:g",c:"produces:c",multi:"produces>=2",fetch:"is:fetchland",shock:"is:shockland",pain:"is:painland",check:"is:checkland",fast:"is:fastland",slow:"is:slowland",bounce:"is:bounceland",triome:"is:triome",dual:"produces=2",utility:"-t:basic -is:fetchland -is:shockland -is:painland -is:checkland -is:fastland -is:slowland -is:bounceland -is:triome -produces=2"};
 return map[v]||"";
}
function commonQueryParts(){
 const parts=[colorQuery(),"game:paper","legal:commander"];
 if(Number(state.bracket)<=2)parts.push("-is:gamechanger");
 const typed=escapeQuery($("#search").value);if(typed)parts.push(`(${quote(typed)} or o:${quote(typed)})`);
 const type=$("#type").value;if(type)parts.push(`t:${type}`);
 if(type==="land"&&landFilterQuery())parts.push(landFilterQuery());
 return parts;
}
function armiesQueries(){
 if(!state.commander||!state.tribe)throw new Error("Scegli prima Commander e Tribe.");
 const tribe=escapeQuery(state.tribe);
 const common=commonQueryParts();
 const selectedType=$("#type").value;
 const queries=[];
 // Le categorie vengono interrogate separatamente: una ricerca unica molto
 // ampia veniva troncata dalla paginazione e faceva sparire molte carte.
 if(!selectedType||selectedType==="creature")queries.push([`t:creature (${exactWordQuery("t",tribe)} or ${exactWordQuery("o",tribe)})`,...common].join(" "));
 if(!selectedType||selectedType!=="creature"){
  queries.push([`-t:creature ${keyQuery()}`,...common].join(" "));
  queries.push([`-t:creature (o:${quote("commander")} or o:${quote("choose a creature type")})`,...common].join(" "));
 }
 if(selectedType!=="creature")queries.push(["t:land",...common].join(" "));
 return [...new Set(queries.filter(q=>q&&!q.includes("()")))];
}
function armiesQuery(){return armiesQueries().join(" || ")}
async function scryfallSearch(q,maxPages=30){let url=`https://api.scryfall.com/cards/search?unique=cards&order=name&q=${encodeURIComponent(q)}`;const out=[];for(let i=0;i<maxPages&&url;i++){const r=await fetch(url);const data=await r.json();if(!r.ok)throw new Error(data.details||"Errore Scryfall");out.push(...(data.data||[]));url=data.has_more?data.next_page:null;}return out}
async function fetchCreatureTypes(){try{const r=await fetch("https://api.scryfall.com/catalog/creature-types");const d=await r.json();return (d.data||FALLBACK_TRIBES).filter(t=>!EXCLUDED_ARMIES_TRIBES.has(t))}catch{return FALLBACK_TRIBES.filter(t=>!EXCLUDED_ARMIES_TRIBES.has(t))}}
function commanderTribes(c,all){
 const lines=[c.type_line||"",...(c.card_faces||[]).map(f=>f.type_line||"")];
 const oracle=oracleOf(c);
 const found=[];
 for(const t of all){
  if(EXCLUDED_ARMIES_TRIBES.has(t))continue;
  const safe=t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
  const typeRx=new RegExp(`(^|\\s)${safe}(?=\\s|$)`,"i");
  // Il testo Oracle può usare il plurale (es. "amass Orcs 5").
  // Per i tipi che terminano già in s manteniamo solo la forma esatta.
  const pluralSafe=/s$/i.test(t)?safe:`${safe}s?`;
  const oracleRx=new RegExp(`\\b${pluralSafe}\\b`,"i");
  const inType=lines.some(line=>typeRx.test((line.split("—")[1]||"").trim()));
  if(inType||oracleRx.test(oracle))found.push(t);
 }
 return [...new Set(found)];
}
function loadCurrent(){try{const s=JSON.parse(localStorage.getItem(CURRENT));if(s)state={...state,...s,cards:s.cards||{}}}catch{}}
function saveCurrent(){state.name=$("#deckName").value.trim()||"Nuovo mazzo";state.tribe=$("#tribe").value;state.key=$("#key").value;state.bracket=Number($("#bracket").value);localStorage.setItem(CURRENT,JSON.stringify(state));renderDeck();renderChips()}
function deckStore(){try{return JSON.parse(localStorage.getItem(STORAGE))||[]}catch{return []}}
function writeStore(x){localStorage.setItem(STORAGE,JSON.stringify(x))}
function explicitSave(){saveCurrent();if(!state.id)state.id=crypto.randomUUID?crypto.randomUUID():String(Date.now());const list=deckStore();const copy=JSON.parse(JSON.stringify(state));const i=list.findIndex(x=>x.id===state.id);if(i>=0)list[i]=copy;else list.push(copy);writeStore(list);localStorage.setItem(CURRENT,JSON.stringify(state));alert("Mazzo salvato.")}
function renderKeyOptions(){$("#key").innerHTML=Object.keys(KEY_DEFINITIONS).map(k=>`<option ${k===state.key?"selected":""}>${k}</option>`).join("")}
function renderChips(){$("#chips").innerHTML=[`Commander: ${state.commander?.name||"—"}`,`Tribe: ${state.tribe||"—"}`,`Key: ${state.key}`,`Bracket: ${state.bracket}`].map(x=>`<span class="chip">${x}</span>`).join("")}
function cardHTML(c,commander=false){return `<article class="card"><img loading="lazy" src="${imageOf(c)}" alt="${c.name}"><div class="body"><div class="name">${c.name}</div><div class="type">${typeOf(c)}</div><div class="actions"><button class="detail" data-detail="${c.id}">Dettagli</button><button class="add" data-${commander?"commander":"add"}="${c.id}">+</button></div></div></article>`}
function bindCards(root,commander=false){root.querySelectorAll("[data-detail]").forEach(b=>b.onclick=()=>showDetail(currentCards.find(c=>c.id===b.dataset.detail)));root.querySelectorAll(commander?"[data-commander]":"[data-add]").forEach(b=>b.onclick=()=>{const c=currentCards.find(x=>x.id===(commander?b.dataset.commander:b.dataset.add));if(commander)selectCommander(c);else addCard(c)})}
function showDetail(c){if(!c)return;$("#detailTitle").textContent=c.name;$("#detailContent").innerHTML=`<div style="display:grid;grid-template-columns:minmax(220px,330px) 1fr;gap:18px"><img src="${imageOf(c)}" style="width:100%;border-radius:14px"><div><h2>${c.name}</h2><p>${typeOf(c)}</p><p style="white-space:pre-wrap;line-height:1.5">${oracleOf(c)}</p></div></div>`;$("#detailModal").classList.add("open")}
async function selectCommander(c){state.commander=c;state.cards={};const all=await fetchCreatureTypes();const tribes=commanderTribes(c,all);$("#tribe").disabled=false;$("#tribe").innerHTML=(tribes.length?tribes:all).map(t=>`<option>${t}</option>`).join("");state.tribe=tribes[0]||all[0]||"";$("#tribe").value=state.tribe;$("#chooseCommander").textContent=c.name;$("#commanderModal").classList.remove("open");saveCurrent();runSearch()}
async function commanderSearch(){const name=escapeQuery($("#commanderSearch").value);if(!name)return;$("#commanderStatus").textContent="Ricerca in corso…";try{currentCards=await scryfallSearch(`${quote(name)} is:commander game:paper legal:commander`,2);$("#commanderResults").innerHTML=currentCards.map(c=>cardHTML(c,true)).join("")||'<div class="empty">Nessun Commander trovato.</div>';$("#commanderStatus").textContent=`${currentCards.length} risultati`;bindCards($("#commanderResults"),true)}catch(e){$("#commanderStatus").textContent=e.message}}
async function runSearch(){saveCurrent();$("#status").textContent="Ricerca completa in corso…";$("#cards").innerHTML="";try{const queries=armiesQueries();let fetched=[];for(const q of queries){const batch=await scryfallSearch(q,30);fetched.push(...batch)}const chosenType=$("#type").value, chosenLand=$("#landType").value;if(!chosenType||(chosenType==="land"&&(!chosenLand||chosenLand==="basic"))){try{const basics=await scryfallSearch(`(t:"Basic Land" or is:basic) ${colorQuery()} game:paper legal:commander`,8);fetched.push(...basics)}catch{}}const byId=new Map(fetched.map(c=>[c.id,c]));currentCards=[...byId.values()].filter(armiesCardCompatible).sort((a,b)=>a.name.localeCompare(b.name));$("#cards").innerHTML=currentCards.slice(0,300).map(c=>cardHTML(c)).join("")||'<div class="empty">Nessuna carta compatibile.</div>';$("#resultCount").textContent=`${currentCards.length} risultati`;$("#status").textContent=currentCards.length>300?`Trovate ${currentCards.length} carte compatibili; ne sono mostrate 300. Usa ricerca e tipo per restringere.`:"Sono mostrate tutte le carte compatibili con Commander, Tribe, Key e Bracket.";bindCards($("#cards"))}catch(e){$("#status").textContent=e.message;$("#cards").innerHTML='<div class="empty">Completa i filtri per vedere il catalogo.</div>';$("#resultCount").textContent=""}}
function copyLimit(c){const type=typeOf(c);if(/(^|\s)Basic(\s|$)/i.test(type)&&/(^|\s)Land(\s|$)/i.test(type))return 99;const t=oracleOf(c).toLowerCase();if(t.includes("a deck can have any number of cards named"))return 99;const m=t.match(/a deck can have up to (\w+) cards named/i);if(m){const nums={two:2,three:3,four:4,five:5,six:6,seven:7};return nums[m[1].toLowerCase()]||1}return 1}
function addCard(c){const total=1+Object.values(state.cards).reduce((n,x)=>n+x.qty,0);if(total>=100){alert("Il mazzo ha già 100 carte.");return}const old=state.cards[c.id];const qty=old?.qty||0;if(qty>=copyLimit(c)){alert("Limite copie raggiunto.");return}state.cards[c.id]={...c,qty:qty+1};saveCurrent()}
function changeQty(id,d){const c=state.cards[id];if(!c)return;const next=c.qty+d;if(next<=0)delete state.cards[id];else if(next<=copyLimit(c))c.qty=next;saveCurrent()}
function allDeckCards(){const out=[];if(state.commander)out.push({...state.commander,qty:1});for(const c of Object.values(state.cards))out.push(c);return out}
function primaryType(c){const t=typeOf(c);if(/Land/i.test(t))return "Terre";if(/Creature/i.test(t))return "Creature";if(/Instant/i.test(t))return "Istantanei";if(/Sorcery/i.test(t))return "Stregonerie";if(/Enchantment/i.test(t))return "Incantesimi";if(/Artifact/i.test(t))return "Artefatti";if(/Planeswalker/i.test(t))return "Planeswalker";if(/Battle/i.test(t))return "Battaglie";return "Altro"}
function manaCostOf(c){if(c.mana_cost)return c.mana_cost;return (c.card_faces||[]).map(f=>f.mana_cost||"").join("")}
function producedManaOf(c){const set=new Set(c.produced_mana||[]);for(const f of c.card_faces||[])for(const x of f.produced_mana||[])set.add(x);return [...set]}
function renderAnalysis(){const cards=allDeckCards();const total=cards.reduce((n,c)=>n+(c.qty||1),0);const types={"Creature":0,"Istantanei":0,"Stregonerie":0,"Incantesimi":0,"Artefatti":0,"Planeswalker":0,"Battaglie":0,"Terre":0,"Altro":0};const demand={W:0,U:0,B:0,R:0,G:0,C:0},sources={W:0,U:0,B:0,R:0,G:0,C:0};const curve=Array(8).fill(0);let mvSum=0,nonlands=0;for(const c of cards){const q=c.qty||1;types[primaryType(c)]=(types[primaryType(c)]||0)+q;const cost=manaCostOf(c);for(const sym of cost.match(/\{[^}]+\}/g)||[]){for(const col of ["W","U","B","R","G"])if(sym.includes(col))demand[col]+=q;if(sym==="{C}")demand.C+=q}for(const col of producedManaOf(c))if(sources[col]!==undefined)sources[col]+=q;if(primaryType(c)!=="Terre"){const mv=Math.max(0,Number(c.cmc)||0);curve[Math.min(7,Math.floor(mv))]+=q;mvSum+=mv*q;nonlands+=q}}const maxType=Math.max(1,...Object.values(types));const maxCurve=Math.max(1,...curve);const typeHtml=Object.entries(types).filter(([k,v])=>v>0&&k!=="Altro").map(([k,v])=>`<div><div class="statRow"><span>${k}</span><strong>${v}</strong></div><div class="barTrack"><div class="barFill" style="width:${Math.round(v/maxType*100)}%"></div></div></div>`).join("");const colors=["W","U","B","R","G","C"];const labels={W:"Bianco",U:"Blu",B:"Nero",R:"Rosso",G:"Verde",C:"Incolore"};const pieColors={W:"#f2eadb",U:"#58a9d4",B:"#514b55",R:"#d86749",G:"#56a067",C:"#a9adb1"};const pieTotal=colors.reduce((n,c)=>n+demand[c],0);let pieCursor=0;const pieStops=[];if(pieTotal){for(const c of colors){if(!demand[c])continue;const from=pieCursor;pieCursor+=demand[c]/pieTotal*360;pieStops.push(`${pieColors[c]} ${from.toFixed(2)}deg ${pieCursor.toFixed(2)}deg`)}}const pieStyle=pieTotal?`background:conic-gradient(${pieStops.join(",")})`:"";const pieLegend=colors.filter(c=>demand[c]).map(c=>`<div class="pieLegendRow"><span class="pieDot" style="background:${pieColors[c]}"></span><span>${labels[c]}</span><strong>${Math.round(demand[c]/pieTotal*100)}%</strong></div>`).join("")||'<div class="subtle">Nessun simbolo colorato.</div>';const colorHtml=colors.filter(c=>demand[c]||sources[c]).map(c=>{const cls=sources[c]&&sources[c]>=Math.ceil(demand[c]*.45)?"ok":"warning";return `<div class="manaRow"><span class="manaPip ${c}">${c}</span><span>Richiesta ${demand[c]} · Fonti ${sources[c]}</span><strong class="${demand[c]?cls:""}">${demand[c]&&sources[c]===0?"!":""}</strong></div>`}).join("")||'<div class="subtle">Nessun simbolo colorato rilevato.</div>';const curveHtml=curve.map((v,i)=>`<div class="curveCol"><div class="curveBar" style="height:${Math.max(3,Math.round(v/maxCurve*90))}px" title="${v} carte"></div><span>${i===7?"7+":i}<br><b>${v}</b></span></div>`).join("");$("#analysisBody").innerHTML=`<div class="metric"><div class="metricTitle">Completamento</div><div class="bigCount">${total} / 100</div><div class="subtle">${total<100?`${100-total} carte mancanti`:total===100?"Mazzo completo":`${total-100} carte in eccesso`}</div></div><div class="metric"><div class="metricTitle">Carte per tipo</div><div class="statRows">${typeHtml||'<div class="subtle">Aggiungi carte al mazzo.</div>'}</div></div><div class="metric"><div class="metricTitle">Bilanciamento colori</div><div class="colorPieWrap"><div class="colorPie" style="${pieStyle}" aria-label="Distribuzione dei simboli di mana"></div><div class="pieLegend">${pieLegend}</div></div><div class="manaColors">${colorHtml}</div><div class="subtle" style="margin-top:8px">Il grafico rappresenta i simboli di mana richiesti; le fonti sono stimate dai colori che le carte possono produrre.</div></div><div class="metric"><div class="metricTitle">Curva di mana</div><div class="curve">${curveHtml}</div><div class="subtle" style="margin-top:9px">Valore di mana medio: <strong>${nonlands?(mvSum/nonlands).toFixed(2):"0.00"}</strong> · Terre escluse</div></div>`}
function renderDeck(){const commander=state.commander;$("#commanderBox").innerHTML=commander?`<img src="${imageOf(commander)}"><div><strong>${commander.name}</strong><div style="color:var(--muted);font-size:12px;margin-top:5px">Commander · ${state.tribe||"—"}</div></div>`:'<div style="color:var(--muted)">Nessun Commander selezionato.</div>';const entries=Object.values(state.cards).sort((a,b)=>a.name.localeCompare(b.name));$("#deckList").innerHTML=entries.map(c=>`<div class="row"><div class="qty">${c.qty}</div><div>${c.name}</div><div class="rowbtns"><button class="small" data-minus="${c.id}">−</button><button class="small" data-plus="${c.id}">+</button></div></div>`).join("")||'<div class="empty" style="min-height:160px">Il mazzo è vuoto.</div>';$("#deckList").querySelectorAll("[data-minus]").forEach(b=>b.onclick=()=>changeQty(b.dataset.minus,-1));$("#deckList").querySelectorAll("[data-plus]").forEach(b=>b.onclick=()=>changeQty(b.dataset.plus,1));const count=(commander?1:0)+entries.reduce((n,c)=>n+c.qty,0);$("#summaryText").textContent=`${count} / 100 carte`;$("#validity").textContent=count===100?"Completo":"Da completare";renderAnalysis()}
function verifyDeck(){const errors=[];if(!state.commander)errors.push("Commander mancante.");if(!state.tribe)errors.push("Tribe mancante.");const count=(state.commander?1:0)+Object.values(state.cards).reduce((n,c)=>n+c.qty,0);if(count!==100)errors.push(`Il mazzo contiene ${count} carte invece di 100.`);for(const c of Object.values(state.cards))if(c.qty>copyLimit(c))errors.push(`${c.name}: troppe copie.`);$("#verifyResult").textContent=errors.length?errors.join(" "):"Mazzo valido.";return !errors.length}
function renderLibrary(){const list=deckStore();$("#library").innerHTML=list.map(d=>`<div class="saved"><div><strong>${d.name}</strong><div style="color:var(--muted);font-size:12px">${d.commander?.name||"Nessun Commander"} · ${d.tribe||"—"} · ${d.key||"—"}</div></div><div class="savedactions"><button class="btn" data-open="${d.id}">Apri</button><button class="btn" data-dup="${d.id}">Duplica</button><button class="btn danger" data-del="${d.id}">Elimina</button></div></div>`).join("")||'<div class="empty">Nessun mazzo salvato.</div>';$("#library").querySelectorAll("[data-open]").forEach(b=>b.onclick=()=>openDeck(b.dataset.open));$("#library").querySelectorAll("[data-dup]").forEach(b=>b.onclick=()=>duplicateDeck(b.dataset.dup));$("#library").querySelectorAll("[data-del]").forEach(b=>b.onclick=()=>deleteDeck(b.dataset.del))}
function openDeck(id){const d=deckStore().find(x=>x.id===id);if(!d)return;state=JSON.parse(JSON.stringify(d));hydrate();$("#decksModal").classList.remove("open");if(state.commander&&state.tribe)runSearch()}
function duplicateDeck(id){const list=deckStore();const d=list.find(x=>x.id===id);if(!d)return;const copy=JSON.parse(JSON.stringify(d));copy.id=crypto.randomUUID?crypto.randomUUID():String(Date.now());copy.name=`${copy.name} - copia`;list.push(copy);writeStore(list);renderLibrary()}
function deleteDeck(id){if(!confirm("Eliminare questo mazzo?"))return;writeStore(deckStore().filter(x=>x.id!==id));renderLibrary()}
function newDeck(){
 const hasWork=state.commander||Object.keys(state.cards||{}).length||((state.name||"")!=="Nuovo mazzo");
 if(hasWork&&!confirm("Creare un nuovo mazzo? Le modifiche non salvate del mazzo corrente verranno abbandonate."))return;
 state={id:"",name:"Nuovo mazzo",commander:null,tribe:"",key:"Danno",bracket:2,cards:{}};
 currentCards=[];localStorage.setItem(CURRENT,JSON.stringify(state));
 $("#search").value="";$("#type").value="";$("#landType").value="";$("#landType").hidden=true;
 $("#cards").innerHTML='<div class="empty">Scegli un Commander per iniziare un nuovo mazzo.</div>';$("#status").textContent="Nuovo mazzo pronto.";$("#resultCount").textContent="";
 hydrate();
}
function hydrate(){renderKeyOptions();$("#landType").hidden=$("#type").value!=="land";$("#deckName").value=state.name||"Nuovo mazzo";$("#bracket").value=String(state.bracket||2);$("#key").value=state.key||"Danno";$("#chooseCommander").textContent=state.commander?.name||"Scegli Commander";if(state.commander){$("#tribe").disabled=false;$("#tribe").innerHTML=`<option>${state.tribe}</option>`;$("#tribe").value=state.tribe}else{$("#tribe").disabled=true;$("#tribe").innerHTML='<option value="">Prima scegli il Commander</option>'}renderDeck();renderChips()}
function downloadTxt(){saveCurrent();const lines=[`# ${state.name}`,`# Tribe: ${state.tribe} · Key: ${state.key} · Bracket: ${state.bracket}`,"",state.commander?`COMMANDER\n1 ${state.commander.name}\n`:"","DECK",...Object.values(state.cards).sort((a,b)=>a.name.localeCompare(b.name)).map(c=>`${c.qty} ${c.name}`)];const blob=new Blob([lines.join("\n")],{type:"text/plain;charset=utf-8"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=`${state.name.replace(/[^a-z0-9_-]+/gi,"-")}.txt`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)}
function printProxy(){const cards=[];if(state.commander)cards.push({...state.commander,qty:1});for(const c of Object.values(state.cards))for(let i=0;i<c.qty;i++)cards.push(c);if(!cards.length){alert("Il mazzo è vuoto.");return}const w=window.open("","_blank");if(!w){alert("Il browser ha bloccato la finestra di stampa.");return}w.document.write(`<!doctype html><html><head><meta charset="utf-8"><style>@page{size:A4;margin:8mm}body{margin:0}.bar{padding:10px;text-align:center;background:#111;color:#fff}.sheet{display:grid;grid-template-columns:repeat(3,63mm);grid-auto-rows:88mm;justify-content:center}.slot{width:63mm;height:88mm;border:.15mm dashed #bbb;overflow:hidden}.slot img{width:100%;height:100%;object-fit:fill}@media print{.bar{display:none}.slot:nth-child(9n){break-after:page}}</style></head><body><div class="bar"><button onclick="print()">Stampa / Salva PDF</button></div><div class="sheet">${cards.map(c=>`<div class="slot"><img src="${imageOf(c)}"></div>`).join("")}</div></body></html>`);w.document.close()}
$("#homeBtn").onclick=()=>{
 if(window.parent&&window.parent!==window){window.parent.postMessage("armies-home","*")}
 else{window.location.href="index.html"}
};$("#chooseCommander").onclick=()=>$("#commanderModal").classList.add("open");$("#commanderSearchBtn").onclick=commanderSearch;$("#commanderSearch").onkeydown=e=>{if(e.key==="Enter")commanderSearch()};$("#searchBtn").onclick=runSearch;$("#search").onkeydown=e=>{if(e.key==="Enter")runSearch()};$("#resetBtn").onclick=()=>{$("#search").value="";$("#type").value="";$("#landType").value="";$("#landType").hidden=true;if(state.commander&&state.tribe)runSearch()};["tribe","key","bracket","type","landType"].forEach(id=>$("#"+id).onchange=()=>{if(id==="type"){const isLand=$("#type").value==="land";$("#landType").hidden=!isLand;if(!isLand)$("#landType").value=""}saveCurrent();if(state.commander&&state.tribe)runSearch()});$("#deckName").onchange=saveCurrent;$("#newDeckBtn").onclick=newDeck;$("#saveBtn").onclick=explicitSave;$("#decksBtn").onclick=()=>{renderLibrary();$("#decksModal").classList.add("open")};$("#exportBtn").onclick=()=>$("#exportModal").classList.add("open");$("#txtBtn").onclick=downloadTxt;$("#printBtn").onclick=printProxy;$("#verifyBtn").onclick=verifyDeck;$("#clearBtn").onclick=()=>{if(confirm("Svuotare il mazzo?")){state.cards={};saveCurrent()}};document.querySelectorAll("[data-close]").forEach(b=>b.onclick=()=>$("#"+b.dataset.close).classList.remove("open"));function setMobileView(view){document.body.classList.toggle("show-deck",view==="deck");document.body.classList.toggle("show-analysis",view==="analysis");$("#catalogTab").classList.toggle("active",view==="catalog");$("#deckTab").classList.toggle("active",view==="deck");$("#analysisTab").classList.toggle("active",view==="analysis")}$("#catalogTab").onclick=()=>setMobileView("catalog");$("#deckTab").onclick=()=>setMobileView("deck");$("#analysisTab").onclick=()=>setMobileView("analysis");
window.addEventListener('message',e=>{
 if(e.data==='armies-open-decks'){renderLibrary();$('#decksModal').classList.add('open')}
 if(e.data==='armies-open-export'){$('#exportModal').classList.add('open')}
});
loadCurrent();hydrate();if(state.commander&&state.tribe)runSearch();
