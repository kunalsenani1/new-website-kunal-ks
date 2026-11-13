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
