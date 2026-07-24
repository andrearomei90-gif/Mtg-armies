
(function(){
 const VERSION="4.5.6-filtered";
 try{
  if(localStorage.getItem("armiesBuilderAppVersion")!==VERSION){
   localStorage.setItem("armiesBuilderAppVersion",VERSION);
   if("caches" in window)caches.keys().then(keys=>Promise.all(keys.map(k=>caches.delete(k))));
   if("serviceWorker" in navigator)navigator.serviceWorker.getRegistrations().then(rs=>rs.forEach(r=>r.unregister()));
  }
 }catch(e){}
})();
