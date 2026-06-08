
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-mobile-menu]');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', menu.classList.contains('open') ? 'true' : 'false');
    });
  }

  const loadDeferred = (el) => {
    if (el.dataset.src) {
      el.src = el.dataset.src;
      el.removeAttribute('data-src');
    }
    if (el.dataset.poster) {
      el.poster = el.dataset.poster;
      el.removeAttribute('data-poster');
    }
  };

  const loadVideoSources = (video) => {
    let changed = false;
    video.querySelectorAll('source[data-src]').forEach((source) => {
      source.src = source.dataset.src;
      source.removeAttribute('data-src');
      changed = true;
    });
    if (changed) video.load();
  };

  const loadDeferredMedia = (el) => {
    loadDeferred(el);
    if (el.tagName !== 'VIDEO') return;
    el.addEventListener('pointerdown', () => loadVideoSources(el), { once: true });
    el.addEventListener('keydown', () => loadVideoSources(el), { once: true });
  };

  const deferred = document.querySelectorAll('[data-src], video[data-poster]');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        loadDeferredMedia(entry.target);
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '160px 0px' });
    deferred.forEach((el) => observer.observe(el));
  } else {
    deferred.forEach((el) => loadDeferredMedia(el));
  }
});
