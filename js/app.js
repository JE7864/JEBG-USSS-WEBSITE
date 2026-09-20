const io=new IntersectionObserver((entries)=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
document.getElementById('year').textContent=new Date().getFullYear();
const menu=document.querySelector('.menu'),nav=document.querySelector('.nav');
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open))});
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));


// Independent Basic / Visual release channels. Edit js/release-config.js for future versions.
(function(){
  const releases = window.JEBG_RELEASES || {};
  function bind(key){
    const r=releases[key]||{};
    const version=document.getElementById(key+'Version');
    const meta=document.getElementById(key+'Meta');
    const download=document.getElementById(key+'Download');
    const notes=document.getElementById(key+'Notes');
    if(!version||!meta||!download) return;
    if(r.enabled && r.downloadUrl){
      version.textContent=r.version||'Latest release';
      const parts=[r.releaseDate,r.fileSize].filter(Boolean);
      meta.textContent=parts.join(' • ') || 'Windows installer';
      if(r.sha256) meta.title='SHA-256: '+r.sha256;
      download.href=r.downloadUrl; download.classList.remove('is-disabled'); download.removeAttribute('aria-disabled');
      download.textContent='Download '+(key==='basic'?'Basic':'Visual')+' '+(r.version||'');
      download.setAttribute('target','_blank'); download.setAttribute('rel','noopener');
      if(notes && r.releaseNotesUrl){notes.href=r.releaseNotesUrl;notes.hidden=false;notes.target='_blank';notes.rel='noopener';}
    }
  }
  bind('basic'); bind('visual');
})();


// Configurable JEBG usage-request form. Edit only js/release-config.js to change the form URL.
(function(){
  const cfg=(window.JEBG_SITE_CONFIG||{}).usageRequest||{};
  const btn=document.getElementById('usageRequestButton');
  const hint=document.getElementById('usageRequestHint');
  if(!btn) return;
  if(cfg.enabled && cfg.url){
    btn.href=cfg.url;
  }else{
    btn.href='#';
    btn.classList.add('is-disabled');
    btn.setAttribute('aria-disabled','true');
    btn.removeAttribute('target');
    if(hint) hint.textContent='Usage request form is currently unavailable.';
  }
})();
