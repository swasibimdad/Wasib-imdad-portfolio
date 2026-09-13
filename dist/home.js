function home(){return `<div class="framer-home"><section class="original-hero"><img src="/assets/hero.png" alt="Wasib Imdad seated in a studio" fetchpriority="high"><p class="original-intro">Hi, I'm<br>Wasib Imdad</p><h1>Creative<br>Maker<br>Storyteller</h1></section><section class="original-about"><div class="original-about-copy"><p class="original-label">What I do</p><p class="original-description">I find the story in an idea, then build the world around it.<br>Across brands, campaigns, places and films, I turn what needs to be said<br>into something people can see, feel, and remember.</p><a href="/work/" data-link class="original-button">View Work</a></div><img class="original-polaroids" src="/assets/polaroids.png" alt="Three photographs of Wasib’s work"></section><section class="original-video"><h2>I<br>Create<br><span id="creating-word">Brands</span><span aria-hidden="true">|</span></h2><div class="original-player"><button class="video-cover" aria-label="Play Wasib’s introduction video"><img src="/assets/home-intro-thumbnail.png" alt="Wasib presenting Downtown Lahore at a historic Lahore gateway"><span class="youtube-play" aria-hidden="true">▶</span></button></div></section><section class="original-footer" aria-label="Contact"><div>Connect With Me<br><br><a href="mailto:wasib@wasib.co">wasib@wasib.co</a></div><div>On most platforms @wasib25<br><br><a href="https://instagram.com/wasib25">Instagram</a><br><span>LinkedIn</span></div></section></div>`}
const originalRender=render;
let wordTimer;
render=function(){clearInterval(wordTimer);originalRender();const isHome=location.pathname==='/' ;document.body.classList.toggle('is-original-home',isHome);if(isHome){document.querySelector('.video-cover').onclick=()=>{document.querySelector('.original-player').innerHTML='<iframe src="https://www.youtube.com/embed/gCq7XP2yFVA?autoplay=1&rel=0" title="Wasib Imdad — introduction film" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>';};if(!matchMedia('(prefers-reduced-motion: reduce)').matches){let i=0;wordTimer=setInterval(()=>{const el=document.querySelector('#creating-word');if(el)el.textContent=['Brands','Stories','Narratives'][++i%3]},3000)}}};
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
  const props=['headphones','keyboard','diary'].map(name=>{
    const img=document.createElement('img');
    img.className='desk-prop desk-'+name;
    img.src='/assets/desk-'+name+'.png';
    img.alt='';img.setAttribute('aria-hidden','true');img.draggable=false;
    section.append(img);return img;
  });
  const headphones=props[0];
  headphones.removeAttribute('aria-hidden');headphones.alt='Draggable headphones';
  headphones.tabIndex=0;headphones.setAttribute('aria-label','Move headphones: drag or use arrow keys');
  const canvas=section.closest('.framer-home');
  let detached=false,drag=null;
  const detach=()=>{
    if(detached)return;
    const rect=headphones.getBoundingClientRect(),base=canvas.getBoundingClientRect();
    detached=true;
    Object.assign(headphones.style,{left:(rect.left-base.left)+'px',top:(rect.top-base.top)+'px',width:rect.width+'px',transform:'none',opacity:'1',zIndex:'30'});
    canvas.append(headphones);
  };
  const move=(x,y)=>{
    headphones.style.left=Math.max(0,Math.min(canvas.clientWidth-headphones.offsetWidth,x))+'px';
    headphones.style.top=Math.max(0,Math.min(canvas.offsetHeight-headphones.offsetHeight,y))+'px';
  };
  headphones.onpointerdown=e=>{
    if(e.button!==0)return;
    detach();drag={id:e.pointerId,x:e.pageX,y:e.pageY,left:parseFloat(headphones.style.left),top:parseFloat(headphones.style.top)};
    headphones.setPointerCapture(e.pointerId);headphones.classList.add('is-dragging');e.preventDefault();
  };
  headphones.onpointermove=e=>{if(drag&&drag.id===e.pointerId)move(drag.left+e.pageX-drag.x,drag.top+e.pageY-drag.y)};
  const release=()=>{drag=null;headphones.classList.remove('is-dragging')};
  headphones.onpointerup=release;headphones.onpointercancel=release;headphones.onlostpointercapture=release;
  headphones.onkeydown=e=>{
    const delta={ArrowLeft:[-20,0],ArrowRight:[20,0],ArrowUp:[0,-20],ArrowDown:[0,20]}[e.key];
    if(!delta)return;e.preventDefault();detach();move(parseFloat(headphones.style.left)+delta[0],parseFloat(headphones.style.top)+delta[1]);
  };
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
      if(i===0&&detached)return;
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
home=function(){return homeBeforeHover().replace('<h1>Creative<br>Maker<br>Storyteller</h1>','<h1><span class="hero-word hero-word-creative">Creative</span><br><span class="hero-word hero-word-maker">Maker</span><br><span class="hero-word hero-word-storyteller">Storyteller</span></h1>');};
render();
