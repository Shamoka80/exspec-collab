(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    });
  });

  const yearNode = document.getElementById('year');
  if (yearNode) yearNode.textContent = String(new Date().getFullYear());

  const revealNodes = document.querySelectorAll('.reveal-on-scroll');
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealNodes.forEach((element) => revealObserver.observe(element));
  } else {
    revealNodes.forEach((element) => element.classList.add('is-visible'));
  }

  const navLinks = Array.from(document.querySelectorAll('.nav-link'));
  const sectionTargets = navLinks
    .map((link) => {
      const target = document.querySelector(link.getAttribute('href') || '');
      return target ? { link, target } : null;
    })
    .filter(Boolean);

  if (sectionTargets.length && 'IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visibleEntry) return;

        sectionTargets.forEach(({ link, target }) => {
          const isActive = target.id === visibleEntry.target.id;
          if (isActive) {
            link.setAttribute('aria-current', 'true');
          } else {
            link.removeAttribute('aria-current');
          }
        });
      },
      {
        threshold: [0.2, 0.4, 0.6],
        rootMargin: '-35% 0px -45% 0px',
      }
    );

    sectionTargets.forEach(({ target }) => navObserver.observe(target));
  }

  const hero = document.querySelector('.hero');
  if (hero && !reduceMotion) {
    hero.addEventListener('pointermove', (event) => {
      const rect = hero.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      hero.style.setProperty('--mouse-x', `${x}%`);
      hero.style.setProperty('--mouse-y', `${y}%`);
    });
  }
})();
