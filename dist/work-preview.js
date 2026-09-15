(() => {
  const images = {
    almaymaar: '/assets/almaymaar-hero.png',
    harsukh: '/assets/harsukh-opening.png',
    downtownlahore: '/assets/downtown-video-cover.png',
    crafeupstairs: '/assets/crafe-hero.png',
    kiapakistan: '/assets/kia/image1.png',
    chakor: '/assets/chakor-hero.png',
    imarat: '/assets/imarat-hero.png'
  };
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  const preview = document.createElement('div');
  preview.className = 'work-preview';
  preview.setAttribute('aria-hidden', 'true');
  const img = document.createElement('img');
  img.alt = '';
  preview.append(img);
  document.body.append(preview);
  let active = null;
  function hide() { active = null; preview.classList.remove('is-visible'); }
  function position(x, y) {
    const width = preview.offsetWidth, height = preview.offsetHeight;
    const header = document.querySelector('.site-header').getBoundingClientRect().bottom;
    preview.style.left = Math.max(16, Math.min(innerWidth - width - 16, x + 24)) + 'px';
    preview.style.top = Math.max(header + 12, Math.min(innerHeight - height - 16, y - height / 2)) + 'px';
  }
  document.addEventListener('pointermove', event => {
    if (!finePointer.matches || event.pointerType === 'touch') return hide();
    const row = event.target.closest('.portfolio-row');
    if (!row) return hide();
    const slug = new URL(row.href).pathname.replaceAll('/', '');
    if (!images[slug]) return hide();
    if (active !== row) {
      active = row;
      preview.classList.remove('is-visible');
      img.onload = () => { if (active === row) preview.classList.add('is-visible'); };
      img.onerror = hide;
      img.src = images[slug];
      if (img.complete && img.naturalWidth) preview.classList.add('is-visible');
    }
    position(event.clientX, event.clientY);
  });
  document.addEventListener('pointerleave', hide);
  document.addEventListener('click', hide);
  document.addEventListener('keydown', hide);
  addEventListener('scroll', hide, {passive:true});
  addEventListener('resize', hide);
  addEventListener('popstate', hide);
  addEventListener('blur', hide);
  finePointer.addEventListener('change', hide);
})();
