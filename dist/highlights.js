(() => {
  const statements=[
    'Wasib is a VETASSESS-certified Creative Director with over 10 years of multi-disciplinary experience.',
    '<strong>Most of my work begins before anyone knows what the work should be.</strong>',
    'Give me a product and I’ll look for the story. <strong>Give me a story and I’ll build a world around it.</strong>',
    'I’ve spent years selling buildings, cars, coffee and ideas. <strong>Strangely, I’ve never really believed in selling.</strong>',
    'I’m alive for the moment an idea stops being an idea <strong>and becomes something people remember</strong>'
  ];
  const previousRender=render;
  render=function(){
    previousRender();
    const footer=document.querySelector('.framer-home .original-footer');
    if(!footer)return;
    const section=document.createElement('section');
    section.className='home-highlights';section.setAttribute('aria-label','Highlights');
    section.innerHTML=`<div class="highlights-track">${statements.map((text,i)=>`<article class="highlight-slide" aria-label="Highlight ${i+1} of 5"><img src="/assets/${['highlights-stage.jpg','highlights-billboard-1.jpg','highlights-billboard-2.jpg','highlights-billboard-1.jpg','highlights-stage.jpg'][i]}" alt="" loading="lazy"><div class="highlight-copy"><span>Highlights · ${String(i+1).padStart(2,'0')}</span><p>${text}</p></div></article>`).join('')}</div><div class="highlights-controls"><div class="highlights-dots" aria-label="Choose highlight">${statements.map((_,i)=>`<button aria-label="Show highlight ${i+1}" aria-current="${i===0}"></button>`).join('')}</div><button class="highlights-scroll">Scroll<span aria-hidden="true">⌄</span></button></div>`;
    footer.before(section);
    const track=section.querySelector('.highlights-track'),buttons=[...section.querySelectorAll('.highlights-dots button')];
    const behavior=()=>matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth';
    buttons.forEach((button,i)=>button.onclick=()=>track.scrollTo({left:i*track.clientWidth,behavior:behavior()}));
    track.addEventListener('scroll',()=>{const active=Math.round(track.scrollLeft/track.clientWidth);buttons.forEach((button,i)=>button.setAttribute('aria-current',String(i===active)))},{passive:true});
    section.querySelector('.highlights-scroll').onclick=()=>footer.scrollIntoView({behavior:behavior(),block:'start'});
    track.tabIndex=0;track.setAttribute('aria-label','Highlights; swipe or use left and right arrow keys');
    track.onkeydown=e=>{if(e.key!=='ArrowLeft'&&e.key!=='ArrowRight')return;e.preventDefault();track.scrollBy({left:(e.key==='ArrowRight'?1:-1)*track.clientWidth,behavior:behavior()})};
  };
  render();
})();
