function home(){return `<div class="framer-home"><section class="original-hero"><img src="/assets/hero.png" alt="Wasib Imdad seated in a studio" fetchpriority="high"><p class="original-intro">Hi, I'm<br>Wasib Imdad</p><h1>Creative<br>Maker<br>Storyteller</h1></section><section class="original-about"><div class="original-about-copy"><p class="original-label">What I do</p><p class="original-description">I find the story in an idea, then build the world around it.<br>Across brands, campaigns, places and films, I turn what needs to be said<br>into something people can see, feel, and remember.</p><a href="/work/" data-link class="original-button">View Work</a></div><img class="original-polaroids" src="/assets/polaroids.png" alt="Three photographs of Wasib’s work"></section><section class="original-video"><h2>I<br>Create<br><span id="creating-word">Brands</span><span aria-hidden="true">|</span></h2><div class="original-player"><button class="video-cover" aria-label="Play Wasib’s introduction video"><img src="/assets/home-intro-thumbnail.png" alt="Wasib presenting Downtown Lahore at a historic Lahore gateway"><span class="youtube-play" aria-hidden="true">▶</span></button></div></section><section class="original-footer" aria-label="Contact"><div>Connect With Me<br><br><a href="mailto:wasib@wasib.co">wasib@wasib.co</a></div><div>On most platforms @wasib25<br><br><a href="https://instagram.com/wasib25">Instagram</a><br><span>LinkedIn</span></div></section></div>`}
const originalRender=render;
let wordTimer,typeTimer;
render=function(){clearInterval(wordTimer);clearInterval(typeTimer);originalRender();const isHome=location.pathname==='/' ;document.body.classList.toggle('is-original-home',isHome);if(isHome){const workButton=document.querySelector('.original-button');if(workButton){if('IntersectionObserver' in window){const buttonObserver=new IntersectionObserver(entries=>{if(entries[0].isIntersecting){workButton.classList.add('is-visible');buttonObserver.disconnect()}},{threshold:.35});buttonObserver.observe(workButton)}else workButton.classList.add('is-visible')}document.querySelector('.video-cover').onclick=()=>{document.querySelector('.original-player').innerHTML='<iframe src="https://www.youtube.com/embed/gCq7XP2yFVA?autoplay=1&rel=0" title="Wasib Imdad — introduction film" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>';};if(!matchMedia('(prefers-reduced-motion: reduce)').matches){let i=0;const words=['Brands','Stories','Narratives'];const typeNext=()=>{const el=document.querySelector('#creating-word');if(!el)return;const word=words[++i%words.length];let n=0;el.textContent='';clearInterval(typeTimer);typeTimer=setInterval(()=>{el.textContent=word.slice(0,++n);if(n>=word.length){clearInterval(typeTimer);wordTimer=setTimeout(typeNext,2600)}},95)};wordTimer=setTimeout(typeNext,3000)}}};
addEventListener('popstate',()=>render());render();
const homeBeforeHover=home;
let stopHomeMotion=()=>{};
const renderBeforeMotion=render;
render=function(){
  stopHomeMotion();
  renderBeforeMotion();
  const section=document.querySelector('.original-video');
  const player=document.querySelector('.original-player');
  if(!section||!player)return;
  const tablet=document.createElement('div');
  tablet.className='intro-tablet';
  player.before(tablet);
  tablet.append(player);
  const note=document.createElement('div');
  note.className='movable-note';
  note.innerHTML='<img src="/assets/movable-note.png" alt="We’re all movable — drag the headphones, keyboard or diary" draggable="false">';
  section.append(note);
  const props=['headphones','keyboard','diary'].map(name=>{
    const img=document.createElement('img');
    img.className='desk-prop desk-'+name;
    img.src='/assets/desk-'+name+'.png';
    img.alt='';img.setAttribute('aria-hidden','true');img.draggable=false;
    section.append(img);return img;
  });
  const canvas=section;
  const detached=new Set();
  props.forEach(prop=>{
    prop.removeAttribute('aria-hidden');prop.alt='Draggable '+prop.className.replace('desk-prop desk-','');
    prop.tabIndex=0;prop.setAttribute('aria-label','Move '+prop.alt.toLowerCase()+': drag or use arrow keys');
    let drag=null;
    const detach=()=>{
      if(detached.has(prop))return;
      const rect=prop.getBoundingClientRect(),base=canvas.getBoundingClientRect();
      detached.add(prop);
      Object.assign(prop.style,{left:(rect.left-base.left)+'px',top:(rect.top-base.top)+'px',width:rect.width+'px',transform:'none',opacity:'1',zIndex:'30'});
    };
    const move=(x,y)=>{
      const upperSection=canvas.previousElementSibling;
      const upperLimit=upperSection&&upperSection.classList.contains('original-about')?-upperSection.offsetHeight:0;
      prop.style.left=x+'px';
      prop.style.top=Math.max(upperLimit,Math.min(canvas.clientHeight-prop.offsetHeight,y))+'px';
    };
    prop.onpointerdown=e=>{
      if(e.button!==0)return;
      detach();drag={id:e.pointerId,x:e.clientX,y:e.clientY,left:parseFloat(prop.style.left),top:parseFloat(prop.style.top)};
      prop.setPointerCapture(e.pointerId);prop.classList.add('is-dragging');e.preventDefault();
    };
    prop.onpointermove=e=>{if(drag&&drag.id===e.pointerId)move(drag.left+e.clientX-drag.x,drag.top+e.clientY-drag.y)};
    const release=()=>{drag=null;prop.classList.remove('is-dragging')};
    prop.onpointerup=release;prop.onpointercancel=release;prop.onlostpointercapture=release;
    prop.onkeydown=e=>{
      const delta={ArrowLeft:[-20,0],ArrowRight:[20,0],ArrowUp:[0,-20],ArrowDown:[0,20]}[e.key];
      if(!delta)return;e.preventDefault();detach();move(parseFloat(prop.style.left)+delta[0],parseFloat(prop.style.top)+delta[1]);
    };
  });
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let frame=0,smoothed=null;
  const update=()=>{
    frame=0;
    const rect=section.getBoundingClientRect();
    const target=Math.max(0,Math.min(1,(innerHeight-rect.top)/(innerHeight+Math.min(rect.height*.35,350))));
    if(smoothed===null||reduced.matches)smoothed=target;
    smoothed+=(target-smoothed)*.075;
    const progress=smoothed;
    const remaining=reduced.matches?0:1-progress;
    tablet.style.transform='translate3d('+remaining*12+'%, '+remaining*150+'px, 0) rotate('+remaining*9+'deg) scale('+(1-remaining*.14)+')';
    props.forEach((prop,i)=>{
      if(detached.has(prop))return;
      const p=reduced.matches?1:Math.max(0,Math.min(1,(progress-i*.08)/(.9-i*.08)));
      const r=1-p;
      const x=[-16,8,12][i]*r;
      const y=[25,35,40][i]*r;
      prop.style.transform='translate3d('+x+'%, '+y+'%, 0) rotate('+([-14,-5,12][i]+r*[18,12,-18][i])+'deg)';
      prop.style.opacity=String(Math.min(1,p*4));
    });
    if(Math.abs(target-smoothed)>.0005)frame=requestAnimationFrame(update);
  };
  const queue=()=>{if(!frame)frame=requestAnimationFrame(update)};
  addEventListener('scroll',queue,{passive:true});
  addEventListener('resize',queue);
  reduced.addEventListener('change',queue);
  update();
  stopHomeMotion=()=>{
    cancelAnimationFrame(frame);
    removeEventListener('scroll',queue);
    removeEventListener('resize',queue);
    reduced.removeEventListener('change',queue);
  };
};
home=function(){return homeBeforeHover().replace('<h1>Creative<br>Maker<br>Storyteller</h1>','<h1><span class="hero-word hero-word-creative">Creative</span><br><span class="hero-word hero-word-maker">Maker</span><br><span class="hero-word hero-word-storyteller">Storyteller<span class="storyteller-stop" aria-hidden="true"></span></span></h1>');};
render();
