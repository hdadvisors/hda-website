// HDA header — mobile menu toggle (progressive enhancement). Hugo: assets/js/header.js, load with defer.
(()=>{document.querySelectorAll('.hda-header').forEach(h=>{const b=h.querySelector('.hda-header__toggle');if(!b)return;
const set=o=>b.setAttribute('aria-expanded',String(o));set(false);h.setAttribute('data-enhanced','');
b.addEventListener('click',()=>set(b.getAttribute('aria-expanded')!=='true'));
h.addEventListener('keydown',e=>{if(e.key==='Escape'&&b.getAttribute('aria-expanded')==='true'){set(false);b.focus()}});
matchMedia('(min-width:901px)').addEventListener('change',e=>{if(e.matches)set(false)});});})();
