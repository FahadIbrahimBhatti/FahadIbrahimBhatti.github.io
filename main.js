// Lightweight enhancement only. The page remains fully readable without JavaScript.
(() => {
  const root = document.documentElement;
  const themeToggle = document.querySelector('.theme-toggle');
  const mobileButton = document.querySelector('.menu-button');
  const nav = document.querySelector('.primary-nav');

  try {
    const savedTheme = localStorage.getItem('fahd-site-theme');
    if (savedTheme === 'dark' || savedTheme === 'light') root.dataset.theme = savedTheme;
  } catch (_) { /* Storage can be unavailable in private browser contexts. */ }

  const updateThemeLabel = () => {
    themeToggle?.setAttribute('aria-label', root.dataset.theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  };
  updateThemeLabel();
  themeToggle?.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('fahd-site-theme', root.dataset.theme); } catch (_) {}
    updateThemeLabel();
  });

  mobileButton?.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    mobileButton.setAttribute('aria-expanded', String(isOpen));
    mobileButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    mobileButton?.setAttribute('aria-expanded','false');
    mobileButton?.setAttribute('aria-label', 'Open navigation');
  }));

  if ('IntersectionObserver' in window) {
    const sectionLinks = new Map([...document.querySelectorAll('.primary-nav a')].map(a => [a.hash.slice(1), a]));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        sectionLinks.forEach(link => link.classList.remove('active'));
        sectionLinks.get(entry.target.id)?.classList.add('active');
      });
    }, {rootMargin:'-25% 0px -58% 0px', threshold:0});
    sectionLinks.forEach((_, id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
  }
  document.getElementById('year').textContent = String(new Date().getFullYear());
})();
