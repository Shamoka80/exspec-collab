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

  const opportunityItems = Array.from(document.querySelectorAll('.opportunity-item'));
  const interactionModeQuery = window.matchMedia('(max-width: 768px), (hover: none), (pointer: coarse)');
  const itemState = new Map();

  const setExpandedState = (item, shouldExpand) => {
    const trigger = item.querySelector('.opportunity-trigger');
    if (!trigger) return;

    trigger.setAttribute('aria-expanded', shouldExpand ? 'true' : 'false');
    item.classList.toggle('is-open', shouldExpand);
    itemState.set(item, shouldExpand);
  };

  const collapseAll = (exceptItem) => {
    opportunityItems.forEach((item) => {
      if (item !== exceptItem) setExpandedState(item, false);
    });
  };

  const refreshInteractionMode = () => {
    const mobileFirstMode = interactionModeQuery.matches;
    opportunityItems.forEach((item, index) => {
      item.classList.remove('is-hovered');
      if (mobileFirstMode) {
        setExpandedState(item, itemState.get(item) ?? false);
      } else {
        setExpandedState(item, index === 0);
      }
    });
  };

  opportunityItems.forEach((item) => {
    const trigger = item.querySelector('.opportunity-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isMobileMode = interactionModeQuery.matches;
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';

      if (isMobileMode) {
        setExpandedState(item, !isOpen);
      } else {
        collapseAll(item);
        setExpandedState(item, true);
      }
    });

    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      item.addEventListener('mouseenter', () => {
        if (interactionModeQuery.matches) return;
        collapseAll(item);
        item.classList.add('is-hovered');
        setExpandedState(item, true);
      });

      item.addEventListener('mouseleave', () => {
        item.classList.remove('is-hovered');
      });
    }
  });

  if (interactionModeQuery.addEventListener) {
    interactionModeQuery.addEventListener('change', refreshInteractionMode);
  } else {
    interactionModeQuery.addListener(refreshInteractionMode);
  }
  refreshInteractionMode();
})();
