const header = document.querySelector('.site-header');
const setHeaderState = () => {
  if (!header) return;
  header.style.background = window.scrollY > 24 ? 'rgba(11, 11, 11, 0.96)' : 'linear-gradient(180deg, rgba(11, 11, 11, 0.96), rgba(11, 11, 11, 0))';
  header.style.backdropFilter = window.scrollY > 24 ? 'blur(18px)' : 'none';
};
window.addEventListener('scroll', setHeaderState, { passive: true });
setHeaderState();
