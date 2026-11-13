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

document.querySelectorAll('.podcast-preview').forEach((button) => {
  const video = button.querySelector('video');
  if (!video) return;
  const hint = button.querySelector('.edit-watch');
  const desktop = window.matchMedia('(hover: hover) and (pointer: fine)');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const normalHint = desktop.matches ? 'Hover to preview · Click for playlist ↗' : 'Play podcast playlist ↗';
  if (hint) hint.textContent = normalHint;
  let active = false;
  let visible = !('IntersectionObserver' in window);
  const stop = () => {
    active = false;
    video.pause();
    button.classList.remove('is-previewing');
    if (hint) hint.textContent = normalHint;
  };
  button.pausePreview = stop;
  const start = () => {
    if (!visible || !desktop.matches || reduceMotion.matches || document.hidden) return;
    active = true;
    video.muted = true;
    if (!video.getAttribute('src')) video.src = video.dataset.src;
    const attempt = video.play();
    if (attempt && typeof attempt.catch === 'function') attempt.catch(stop);
  };
  video.addEventListener('playing', () => {
    if (!active || !button.isConnected || !visible || document.hidden) { stop(); return; }
    button.classList.add('is-previewing');
    if (hint) hint.textContent = 'Preview playing · Click for full playlist ↗';
  });
  video.addEventListener('error', stop);
  button.addEventListener('pointerenter', start);
  button.addEventListener('pointerleave', stop);
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
  reduceMotion.addEventListener('change', () => { if (reduceMotion.matches) stop(); });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      if (!visible) stop();
      else if (button.matches(':hover')) start();
    }, { threshold: 0.25 });
    observer.observe(button);
  }
});
