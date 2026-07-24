
(function(){
 const byId=id=>document.getElementById(id);
 const openLayer=id=>{const el=byId(id); if(el) el.classList.add('open');};
 const closeLayer=id=>{const el=byId(id); if(el) el.classList.remove('open');};
 async function openRulesSafe(){
   openLayer('rulesLayer');
   const viewer=byId('rulesViewer');
   try{
     const saved=typeof rulesGet==='function' ? await rulesGet() : null;
     if(window.rulesObjectUrl) URL.revokeObjectURL(window.rulesObjectUrl);
     if(saved && saved.blob){ window.rulesObjectUrl=URL.createObjectURL(saved.blob); viewer.src=window.rulesObjectUrl; }
     else if(typeof DEFAULT_RULES_DATA!=='undefined') viewer.src=DEFAULT_RULES_DATA;
   }catch(err){ if(viewer && typeof DEFAULT_RULES_DATA!=='undefined') viewer.src=DEFAULT_RULES_DATA; }
 }
 function openBuilder(section){
   const frame=byId('builderFrame'), layer=byId('builderLayer');
   if(!frame||!layer||typeof BUILDER_URL==='undefined') return;
   frame.onload=()=>{
     try{
       if(section==='decks') frame.contentWindow?.postMessage('armies-open-decks','*');
       if(section==='export') frame.contentWindow?.postMessage('armies-open-export','*');
     }catch(e){}
   };
   frame.src=BUILDER_URL;
   layer.classList.add('open');
 }
 byId('headerMyDecks')?.addEventListener('click',e=>{e.preventDefault();openBuilder('decks')});
 byId('headerRules')?.addEventListener('click',e=>{e.preventDefault();openRulesSafe()});
 byId('headerExport')?.addEventListener('click',e=>{e.preventDefault();openBuilder('export')});
 document.querySelectorAll('[data-open-mydecks]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();openBuilder('decks')}));
 document.querySelectorAll('[data-placeholder="Regole Armies"]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();openRulesSafe()}));
 document.querySelectorAll('[data-placeholder="Stampa ed esporta"]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();openBuilder('export')}));
 byId('closeRules')?.addEventListener('click',()=>closeLayer('rulesLayer'));
 byId('closeExportInfo')?.addEventListener('click',()=>closeLayer('exportLayer'));
 byId('closeModal')?.addEventListener('click',()=>closeLayer('simpleModal'));
 window.addEventListener('message',e=>{if(e.data==='armies-home'){closeLayer('builderLayer');closeLayer('rulesLayer');closeLayer('exportLayer');closeLayer('simpleModal')}});
})();
