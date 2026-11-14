const header = document.querySelector('.site-header');
const setHeaderState = () => {
  if (!header) return;
  header.style.background = window.scrollY > 24 ? 'rgba(11, 11, 11, 0.96)' : 'linear-gradient(180deg, rgba(11, 11, 11, 0.96), rgba(11, 11, 11, 0))';
  header.style.backdropFilter = window.scrollY > 24 ? 'blur(18px)' : 'none';
};
window.addEventListener('scroll', setHeaderState, { passive: true });
setHeaderState();

// Load a YouTube player only when the visitor selects a project.
document.querySelectorAll('.edit-preview').forEach((button) => {
  button.addEventListener('click', () => {
    button.pausePreview?.();
    const player = document.createElement('iframe');
    player.src = button.dataset.videoSrc;
    player.title = button.dataset.videoTitle;
    player.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    player.referrerPolicy = 'strict-origin-when-cross-origin';
    player.allowFullscreen = true;
    player.tabIndex = 0;
    button.replaceWith(player);
    player.focus();
  });
});

document.querySelectorAll('.motion-choice').forEach((button) => {
  button.addEventListener('click', () => {
    const container = document.getElementById('motion-player');
    const id = button.dataset.motionId;
    if (!container || !/^[a-zA-Z0-9_-]{11}$/.test(id || '')) return;
    const player = document.createElement('iframe');
    player.src = 'https://www.youtube.com/embed/' + id + '?autoplay=1&playsinline=1&rel=0';
    player.title = button.getAttribute('aria-label') + ' by Kunal Senani';
    player.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    player.referrerPolicy = 'strict-origin-when-cross-origin';
    player.allowFullscreen = true;
    container.replaceChildren(player);
    document.querySelectorAll('.motion-choice').forEach((choice) => choice.setAttribute('aria-pressed', String(choice === button)));
    const youtube = document.getElementById('motion-youtube-link');
    if (youtube) youtube.href = 'https://youtu.be/' + id;
  });
});

// Preview the uploaded bumper while the podcast card is visible.
document.querySelectorAll('.podcast-preview').forEach((button) => {
  const video = button.querySelector('video');
  if (!video) return;
  const hint = button.querySelector('.edit-watch');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let active = false;
  let visible = false;
  let detached = false;
  let observer;
  const stop = () => {
    active = false;
    video.pause();
    button.classList.remove('is-previewing');
    if (hint) hint.textContent = 'Watch full episode';
  };
  button.pausePreview = () => {
    detached = true;
    stop();
    observer?.disconnect();
  };
  const start = () => {
    if (!visible || detached || !button.isConnected || reduceMotion.matches || document.hidden) return;
    active = true;
    video.muted = true;
    video.defaultMuted = true;
    if (!video.getAttribute('src')) video.src = video.dataset.src;
    const result = video.play();
    if (result && typeof result.catch === 'function') result.catch(stop);
  };
  video.addEventListener('playing', () => {
    if (!active || !visible || detached || document.hidden) { stop(); return; }
    button.classList.add('is-previewing');
    if (hint) hint.textContent = 'Preview playing - Watch full episode';
  });
  video.addEventListener('error', stop);
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); else start(); });
  reduceMotion.addEventListener('change', () => { if (reduceMotion.matches) stop(); else start(); });
  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting && entries[0].intersectionRatio >= 0.25;
      if (visible) start(); else stop();
    }, { threshold: [0, 0.25] });
    observer.observe(button);
  } else {
    const updateVisibility = () => {
      const rect = button.getBoundingClientRect();
      visible = rect.bottom > 0 && rect.top < window.innerHeight;
      if (visible) start(); else stop();
    };
    window.addEventListener('scroll', updateVisibility, { passive: true });
    window.addEventListener('resize', updateVisibility);
    updateVisibility();
  }
});

// Advance the portrait collection only while it is visible and idle.
document.querySelectorAll('.brand-shorts-track').forEach((track) => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let visible = false;
  let hovered = false;
  let focused = false;
  let watching = false;
  let cooldownUntil = 0;
  track.addEventListener('pointerenter', (event) => { if (event.pointerType !== 'touch') hovered = true; });
  track.addEventListener('pointerleave', () => { hovered = false; });
  track.addEventListener('focusin', () => { focused = true; });
  track.addEventListener('focusout', (event) => { focused = track.contains(event.relatedTarget); });
  const delay = () => { cooldownUntil = Date.now() + 8000; };
  track.addEventListener('pointerdown', delay, { passive: true });
  track.addEventListener('wheel', delay, { passive: true });
  track.addEventListener('keydown', delay);
  track.addEventListener('click', (event) => {
    if (event.target.closest('.edit-preview')) watching = true;
  }, true);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
    }, { threshold: 0.25 }).observe(track);
  } else {
    visible = true;
  }
  window.setInterval(() => {
    if (!visible || hovered || focused || watching || document.hidden || reducedMotion.matches || Date.now() < cooldownUntil) return;
    const max = track.scrollWidth - track.clientWidth;
    if (max <= 1) return;
    const card = track.querySelector('.brand-short');
    if (!card) return;
    const gap = parseFloat(window.getComputedStyle(track).columnGap) || 14;
    const next = track.scrollLeft >= max - 4 ? 0 : Math.min(max, track.scrollLeft + card.getBoundingClientRect().width + gap);
    track.scrollTo({ left: next, behavior: 'smooth' });
  }, 2000);
});

// BTS video and photographs beneath the profile copy.
document.querySelectorAll('.bts-carousel').forEach((carousel) => {
  const slides = [...carousel.querySelectorAll('.bts-slide')];
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const pause = carousel.querySelector('[data-bts-pause]');
  const counter = carousel.querySelector('[data-bts-counter]');
  let index = 0, timer, visible = false, paused = reduced.matches, hovering = false, focused = false;
  const stopVideo = () => carousel.querySelector('iframe')?.remove();
  const startVideo = (manual = false) => {
    if (index !== 0 || !visible || document.hidden || carousel.querySelector('iframe') || (!manual && reduced.matches)) return;
    const player = document.createElement('iframe');
    player.title = 'Sahil — Behind the Scenes';
    player.src = 'https://www.youtube.com/embed/9B6VJ8DjQhA?autoplay=1&mute=1&playsinline=1&rel=0';
    player.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    player.allowFullscreen = true;
    player.referrerPolicy = 'strict-origin-when-cross-origin';
    slides[0].appendChild(player);
  };
  const schedule = () => {
    clearTimeout(timer);
    if (!visible || paused || hovering || focused || document.hidden) return;
    timer = setTimeout(() => show(index + 1), index === 0 ? 18000 : 4000);
  };
  const show = (next, manual = false) => {
    stopVideo();
    index = (next + slides.length) % slides.length;
    slides.forEach((slide, i) => { slide.hidden = i !== index; });
    counter.textContent = String(index + 1).padStart(2, '0') + ' / 04';
    startVideo(manual);
    schedule();
  };
  carousel.querySelector('[data-bts-prev]').addEventListener('click', () => show(index - 1, true));
  carousel.querySelector('[data-bts-next]').addEventListener('click', () => show(index + 1, true));
  const updatePause = () => { pause.textContent = paused ? 'Resume slideshow' : 'Pause slideshow'; pause.setAttribute('aria-pressed', String(paused)); };
  pause.addEventListener('click', () => { paused = !paused; updatePause(); if (!paused) startVideo(true); schedule(); });
  carousel.addEventListener('pointerenter', (event) => { if (event.pointerType !== 'touch') { hovering = true; schedule(); } });
  carousel.addEventListener('pointerleave', () => { hovering = false; schedule(); });
  carousel.addEventListener('focusin', () => { focused = true; schedule(); });
  carousel.addEventListener('focusout', (event) => { focused = carousel.contains(event.relatedTarget); schedule(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stopVideo(); else startVideo(); schedule(); });
  reduced.addEventListener('change', () => { paused = reduced.matches; if (paused) stopVideo(); else startVideo(); updatePause(); schedule(); });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting && entries[0].intersectionRatio >= .25;
      if (visible) startVideo(); else stopVideo();
      schedule();
    }, { threshold: [0, .25] }).observe(carousel);
  } else { visible = true; startVideo(); schedule(); }
  updatePause();
});
