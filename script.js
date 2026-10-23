(function(){
var $=function(s,c){return(c||document).querySelector(s)},$$=function(s,c){return[].slice.call((c||document).querySelectorAll(s))};
var WA='34600000000',fine=matchMedia('(hover:hover) and (pointer:fine)').matches,RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
var b=$('.burger'),m=$('.menu');b.addEventListener('click',function(){var o=m.classList.toggle('open');b.setAttribute('aria-expanded',o)});
// modo urgencia
var u=$('#urgent');try{if(sessionStorage.getItem('urg')==='1'){u.checked=true;document.body.classList.add('urgent')}}catch(e){}
u.addEventListener('change',function(){document.body.classList.toggle('urgent',u.checked);try{sessionStorage.setItem('urg',u.checked?'1':'0')}catch(e){}});
// estado en vivo
var g={};new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Madrid',weekday:'short',hour:'numeric',minute:'numeric',hour12:false}).formatToParts(new Date()).forEach(function(p){g[p.type]=p.value});
var d={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6}[g.weekday],t=(+g.hour%24)*60+ +g.minute;
var open=(d>=1&&d<=5&&t>=480&&t<1200)||(d===6&&t>=540&&t<840);var lv=$('#live');
if(lv){lv.textContent=open?'Técnicos disponibles hoy en Madrid':'Fuera de horario · urgencias 24 h';lv.style.setProperty('--c',open?'#2bb673':'#ff5a1f')}
// plano: longitud de trazos
$$('.ln path,.ln circle,.ln rect').forEach(function(p){try{p.style.setProperty('--len',Math.ceil(p.getTotalLength()))}catch(e){}});
// botones magnéticos + cursor
if(fine&&!RM){$$('.mag').forEach(function(el){el.addEventListener('mousemove',function(e){var r=el.getBoundingClientRect(),x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;el.style.transform='translate('+x*.22+'px,'+y*.35+'px)'});
el.addEventListener('mouseleave',function(){el.style.transform=''})});
})})}
// contadores
function count(el){var to=+el.dataset.count,dec=+(el.dataset.dec||0),suf=el.dataset.suf||'',s=null;function f(ts){if(!s)s=ts;var k=Math.min((ts-s)/1400,1),v=to*(1-Math.pow(1-k,3));el.textContent=(dec?v.toFixed(dec).replace('.',','):Math.round(v).toLocaleString('es-ES'))+suf;if(k<1)requestAnimationFrame(f)}requestAnimationFrame(f)}
// reveal
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');if(x.target.dataset.count)count(x.target);io.unobserve(x.target)}})},{threshold:.15});
$$('.scard,.steps li,blockquote,.srow,.cc,details,.z,.calc').forEach(function(el,i){el.classList.add('reveal');el.style.transitionDelay=(i%3)*80+'ms';io.observe(el)});$$('[data-count]').forEach(function(el){io.observe(el)})}
else $$('[data-count]').forEach(function(el){el.textContent=el.dataset.count});
// barra de progreso del proceso
var pr=$('.prog');if(pr){function pp(){var r=pr.parentNode.getBoundingClientRect(),v=Math.min(Math.max((innerHeight*.85-r.top)/(r.height+innerHeight*.3),0),1);pr.style.setProperty('--pp',v)}addEventListener('scroll',pp,{passive:true});pp()}
// calculadora
var calc=$('#calc');if(calc){var R=$('#qr'),sel=$('#qsvc .opt.on'),f=1;
function eur(n){return(Math.round(n/50)*50).toLocaleString('es-ES')+' €'}
function upd(fl){var v=+R.value,lo=v*sel.dataset.min*f,hi=v*sel.dataset.max*f;$('#qv').textContent=v+' '+sel.dataset.u;var o=$('#qout');o.textContent=eur(lo)+' – '+eur(hi);if(fl){o.classList.remove('flash');void o.offsetWidth;o.classList.add('flash')}
R.style.setProperty('--p',((v-R.min)/(R.max-R.min)*100)+'%');
$('#qgo').href='https://wa.me/'+WA+'?text='+encodeURIComponent('Hola! Quiero presupuesto cerrado para '+sel.textContent.toLowerCase()+' ('+v+' '+sel.dataset.u+', calidad '+$('#qq .opt.on').textContent.toLowerCase()+'). La calculadora me da '+o.textContent+'.')}
$$('#qsvc .opt').forEach(function(o){o.addEventListener('click',function(){$$('#qsvc .opt').forEach(function(x){x.classList.remove('on')});o.classList.add('on');sel=o;var r=o.dataset.r.split(',');R.min=r[0];R.max=r[1];R.value=r[2];$('#qmin').textContent=r[0];$('#qmax').textContent=r[1];upd(true)})});
$$('#qq .opt').forEach(function(o){o.addEventListener('click',function(){$$('#qq .opt').forEach(function(x){x.classList.remove('on')});o.classList.add('on');f=+o.dataset.f;upd(true)})});
R.addEventListener('input',function(){upd(false)});upd(false)}
// zonas
$$('.z').forEach(function(z){function s(){$$('.z').forEach(function(x){x.classList.remove('on')});z.classList.add('on');$('#eta').innerHTML=z.textContent+': llegamos en unos <b>'+z.dataset.t+' min</b>'}z.addEventListener('mouseenter',s);z.addEventListener('click',s)});
// contacto
var cf=$('#cf');if(cf){var pick=null,q=new URLSearchParams(location.search).get('s');
$$('#cs .opt').forEach(function(o){if(o.dataset.k===q){o.classList.add('on');pick=o.textContent}o.addEventListener('click',function(){$$('#cs .opt').forEach(function(x){x.classList.remove('on')});o.classList.add('on');pick=o.textContent})});
cf.addEventListener('submit',function(e){e.preventDefault();var v=function(n){return cf.querySelector('[name='+n+']').value.trim()};
var msg='Hola! Soy '+v('n')+' ('+v('t')+').'+(pick?' Necesito: '+pick+'.':'')+(v('z')?' Zona: '+v('z')+'.':'')+(v('m')?'\n'+v('m'):'');window.open('https://wa.me/'+WA+'?text='+encodeURIComponent(msg),'_blank','noopener')})}
})();
