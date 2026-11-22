// Keep the content and section links available when JavaScript is disabled.
(() => {
  const root = document.documentElement;
  const themeToggle = document.querySelector('.theme-toggle');
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const themeKey = 'fahd-site-theme';

  const setTheme = (theme) => {
    root.dataset.theme = theme;
    themeToggle.setAttribute('aria-label', theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
    themeColor.content = getComputedStyle(root).getPropertyValue('--bg').trim();
  };

  try {
    const savedTheme = localStorage.getItem(themeKey);
    if (savedTheme === 'light' || savedTheme === 'dark') setTheme(savedTheme);
  } catch {
    // The toggle still works when storage is unavailable.
  }

  themeToggle.addEventListener('click', () => {
    const theme = root.dataset.theme === 'light' ? 'dark' : 'light';
    setTheme(theme);
    try {
      localStorage.setItem(themeKey, theme);
    } catch {
      // The current page still uses the selected theme.
    }
  });

  const nav = document.querySelector('.primary-nav');
  const menuButton = document.querySelector('.menu-button');
  const mobileNav = matchMedia('(max-width: 52rem)');
  const sections = [...nav.querySelectorAll('a')].map((link) => ({
    link,
    section: document.getElementById(link.hash.slice(1)),
  }));

  const setMenu = (open) => {
    nav.classList.toggle('open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  };

  menuButton.addEventListener('click', () => {
    const open = !nav.classList.contains('open');
    setMenu(open);
    if (open) sections[0].link.focus();
  });
  mobileNav.addEventListener('change', () => setMenu(false));

  const header = document.querySelector('.site-header');
  header.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('open')) {
      setMenu(false);
      menuButton.focus();
    }
  });
  header.addEventListener('focusout', (event) => {
    if (!header.contains(event.relatedTarget)) setMenu(false);
  });

  sections.forEach(({ link, section }) => {
    link.addEventListener('click', () => {
      if (!mobileNav.matches) return;
      setMenu(false);
      section.setAttribute('tabindex', '-1');
      section.focus({ preventScroll: true });
    });
  });

  let currentLink;
  let framePending = false;
  const updateCurrentLink = () => {
    framePending = false;
    const boundary = header.getBoundingClientRect().bottom + 28;
    const atEnd = window.scrollY + window.innerHeight >= root.scrollHeight - 2;
    const active = atEnd
      ? sections.at(-1)
      : sections.findLast(({ section }) => section.getBoundingClientRect().top <= boundary);

    if (active?.link === currentLink) return;
    currentLink?.removeAttribute('aria-current');
    currentLink = active?.link;
    currentLink?.setAttribute('aria-current', 'location');
  };

  const scheduleUpdate = () => {
    if (framePending) return;
    framePending = true;
    requestAnimationFrame(updateCurrentLink);
  };

  root.classList.add('js');
  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate);
  window.addEventListener('load', scheduleUpdate);
  updateCurrentLink();
  document.getElementById('year').textContent = String(new Date().getFullYear());
})();
