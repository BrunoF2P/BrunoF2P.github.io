import { animate, inView, scroll, stagger } from 'motion';
import Lenis from 'lenis';

const root = document.documentElement;
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/* ============================================================
   Smooth scroll (Lenis)
   ============================================================ */
let lenis: Lenis | null = null;
const initLenis = () => {
  if (reduce) return;
  lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true });
  const raf = (time: number) => {
    lenis?.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);
};
initLenis();

/* Anchor navigation through Lenis */
document.addEventListener('click', (event) => {
  const link = (event.target as HTMLElement)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
  if (!link) return;
  const id = link.getAttribute('href');
  if (!id || id === '#') return;
  const target = document.querySelector(id);
  if (!target) return;
  event.preventDefault();
  if (lenis) lenis.scrollTo(target as HTMLElement, { offset: -10 });
  else (target as HTMLElement).scrollIntoView({ behavior: 'smooth' });
});

/* ============================================================
   Custom cursor
   ============================================================ */
const initCursor = () => {
  if (!fine || reduce) return;
  const ring = document.querySelector<HTMLElement>('.cursor');
  const dot = document.querySelector<HTMLElement>('.cursor-dot');
  if (!ring || !dot) return;

  let mx = window.innerWidth / 2;
  let my = window.innerHeight / 2;
  let rx = mx;
  let ry = my;
  let raf = 0;

  const move = (e: MouseEvent) => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
  };
  const loop = () => {
    rx += (mx - rx) * 0.16;
    ry += (my - ry) * 0.16;
    ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
    raf = requestAnimationFrame(loop);
  };

  window.addEventListener('mousemove', move, { passive: true });

  const hoverTargets = 'a, button, [data-cursor], input, textarea, .chip';
  document.addEventListener('mouseover', (e) => {
    if ((e.target as HTMLElement)?.closest?.(hoverTargets)) root.classList.add('cursor-hover');
  });
  document.addEventListener('mouseout', (e) => {
    if ((e.target as HTMLElement)?.closest?.(hoverTargets)) root.classList.remove('cursor-hover');
  });
  document.addEventListener('mouseleave', () => root.classList.remove('cursor-ready'));
  document.addEventListener('mouseenter', () => root.classList.add('cursor-ready'));

  root.classList.add('cursor-ready');
  loop();
  window.addEventListener('pagehide', () => cancelAnimationFrame(raf), { once: true });
};
initCursor();

/* ============================================================
   Scroll reveals (motion inView)
   ============================================================ */
const reveal = (el: Element, delay = 0) => {
  const node = el as HTMLElement;
  const distance = Number(node.dataset.revealDistance ?? 26);
  animate(
    node,
    { opacity: [0, 1], transform: [`translateY(${distance}px)`, 'translateY(0px)'] },
    { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] },
  );
};

const initReveals = () => {
  const items = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (reduce) {
    items.forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  const groups = document.querySelectorAll<HTMLElement>('[data-reveal-group]');
  groups.forEach((group) => {
    const children = group.querySelectorAll<HTMLElement>(':scope > [data-reveal]');
    inView(
      group,
      () => {
        animate(
          children,
          { opacity: [0, 1], transform: ['translateY(28px)', 'translateY(0px)'] },
          { duration: 0.8, delay: stagger(0.08), ease: [0.22, 1, 0.36, 1] },
        );
      },
      { margin: '0px 0px -12% 0px' },
    );
  });

  document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-reveal-group] > [data-reveal])').forEach((el) => {
    inView(el, () => reveal(el, Number(el.dataset.revealDelay ?? 0)), { margin: '0px 0px -10% 0px' });
  });

  /* Safety: never leave content hidden. */
  window.setTimeout(() => {
    document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
      if (getComputedStyle(el).opacity === '0') {
        el.style.opacity = '1';
        el.style.transform = 'none';
      }
    });
  }, 2600);
};
initReveals();

/* ============================================================
   Hero intro (line mask reveal)
   ============================================================ */
const initHero = () => {
  const lines = document.querySelectorAll<HTMLElement>('[data-hero-line]');
  if (!lines.length) return;
  if (reduce) {
    lines.forEach((l) => (l.style.transform = 'translateY(0)'));
    return;
  }
  animate(lines, { transform: ['translateY(118%)', 'translateY(0%)'] }, { duration: 1.05, delay: stagger(0.09, { startDelay: 0.15 }), ease: [0.16, 1, 0.3, 1] });
  document.querySelectorAll<HTMLElement>('[data-hero-fade]').forEach((el, i) => {
    animate(el, { opacity: [0, 1], transform: ['translateY(18px)', 'translateY(0px)'] }, { duration: 0.9, delay: 0.5 + i * 0.1, ease: [0.22, 1, 0.36, 1] });
  });
};
initHero();

/* ============================================================
   Parallax (scroll-linked)
   ============================================================ */
const initParallax = () => {
  if (reduce) return;
  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    const strength = Number(el.dataset.parallax || 60);
    scroll(
      animate(el, { y: [strength, -strength] }, { ease: 'linear' }),
      { target: el, offset: ['start end', 'end start'] },
    );
  });
};
initParallax();

/* ============================================================
   Magnetic buttons
   ============================================================ */
const initMagnetic = () => {
  if (reduce || !fine) return;
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    const strength = Number(el.dataset.magnetic || 14);
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * strength;
      const y = ((e.clientY - r.top) / r.height - 0.5) * strength;
      animate(el, { x, y }, { duration: 0.4, ease: [0.22, 1, 0.36, 1] });
    });
    el.addEventListener('mouseleave', () => {
      animate(el, { x: 0, y: 0 }, { duration: 0.55, ease: [0.22, 1, 0.36, 1] });
    });
  });
};
initMagnetic();

/* ============================================================
   Counters
   ============================================================ */
const initCounters = () => {
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    const raw = el.dataset.count || '';
    const match = raw.match(/^(\D*)(\d+)(\D*)$/);
    if (!match) {
      el.textContent = raw;
      return;
    }
    const [, prefix, digits, suffix] = match;
    const end = Number(digits);
    if (reduce) {
      el.textContent = raw;
      return;
    }
    inView(
      el,
      () => {
        const counter = { value: 0 };
        const controls = animate(counter, { value: end }, {
          duration: 1.6,
          ease: [0.22, 1, 0.36, 1],
          onUpdate: () => {
            el.textContent = `${prefix}${Math.round(counter.value)}${suffix}`;
          },
        });
        return () => controls.stop();
      },
      { margin: '0px 0px -15% 0px' },
    );
  });
};
initCounters();

/* ============================================================
   Nav: scrolled state + mobile menu
   ============================================================ */
const initNav = () => {
  const nav = document.querySelector<HTMLElement>('[data-nav]');
  const onScroll = () => {
    if (!nav) return;
    nav.classList.toggle('is-scrolled', window.scrollY > 24);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const toggle = document.querySelector<HTMLElement>('[data-menu-toggle]');
  const menu = document.querySelector<HTMLElement>('[data-menu]');
  if (toggle && menu) {
    const setOpen = (open: boolean) => {
      menu.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      root.classList.toggle('menu-open', open);
      if (open) lenis?.stop();
      else lenis?.start();
    };
    toggle.addEventListener('click', () => setOpen(!menu.classList.contains('is-open')));
    menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  }
};
initNav();

/* ============================================================
   Theme toggle
   ============================================================ */
const initTheme = () => {
  document.querySelectorAll<HTMLElement>('[data-theme-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const next = root.dataset.theme === 'light' ? 'dark' : 'light';
      root.dataset.theme = next;
      try {
        localStorage.setItem('theme', next);
      } catch {
        /* ignore */
      }
    });
  });
};
initTheme();

/* ============================================================
   Project filters
   ============================================================ */
const initFilters = () => {
  const groups = document.querySelectorAll<HTMLElement>('[data-filters]');
  groups.forEach((group) => {
    const buttons = group.querySelectorAll<HTMLButtonElement>('[data-filter]');
    const scope = document.querySelector<HTMLElement>(group.dataset.filters || '');
    if (!scope) return;
    const cards = scope.querySelectorAll<HTMLElement>('[data-category]');

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const value = btn.dataset.filter || 'all';
        buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
        cards.forEach((card) => {
          const show = value === 'all' || card.dataset.category === value;
          card.classList.toggle('is-hidden', !show);
        });
        if (!reduce) {
          const visible = Array.from(cards).filter((c) => !c.classList.contains('is-hidden'));
          animate(visible, { opacity: [0, 1], transform: ['translateY(16px) scale(0.99)', 'translateY(0) scale(1)'] }, { duration: 0.5, delay: stagger(0.04), ease: [0.22, 1, 0.36, 1] });
        }
      });
    });
  });
};
initFilters();

/* ============================================================
   Copy to clipboard
   ============================================================ */
const initCopy = () => {
  document.querySelectorAll<HTMLElement>('[data-copy]').forEach((el) => {
    const label = el.querySelector<HTMLElement>('[data-copy-label]');
    const original = label?.textContent ?? '';
    el.addEventListener('click', async () => {
      const value = el.dataset.copy || '';
      try {
        await navigator.clipboard.writeText(value);
      } catch {
        /* ignore */
      }
      if (label) {
        label.textContent = el.dataset.copyDone || 'Copied!';
        window.setTimeout(() => (label.textContent = original), 1800);
      }
    });
  });
};
initCopy();

/* ============================================================
   Spotlight (cursor-follow glow inside cards)
   ============================================================ */
const initSpotlight = () => {
  if (!fine) return;
  document.querySelectorAll<HTMLElement>('[data-spotlight]').forEach((el) => {
    el.addEventListener(
      'pointermove',
      (event) => {
        const rect = el.getBoundingClientRect();
        el.style.setProperty('--mx', `${event.clientX - rect.left}px`);
        el.style.setProperty('--my', `${event.clientY - rect.top}px`);
      },
      { passive: true },
    );
  });
};
initSpotlight();

/* ============================================================
   Language switch (remember explicit choice)
   ============================================================ */
const initLangSwitch = () => {
  document.querySelectorAll<HTMLElement>('[data-set-lang]').forEach((el) => {
    el.addEventListener('click', () => {
      const value = el.dataset.setLang;
      if (value) {
        document.cookie = `lang=${value}; path=/; max-age=31536000; samesite=lax`;
      }
    });
  });
};
initLangSwitch();

/* ============================================================
   Page transition curtain
   ============================================================ */
const initPageTransition = () => {
  window.addEventListener('pageshow', () => root.classList.remove('is-leaving'));
  if (reduce) return;
  document.addEventListener('click', (event) => {
    if (event.defaultPrevented) return;
    const link = (event.target as HTMLElement)?.closest?.('a[href]') as HTMLAnchorElement | null;
    if (!link) return;
    const href = link.getAttribute('href') || '';
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
    if (link.target === '_blank' || link.hasAttribute('download')) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    let url: URL;
    try {
      url = new URL(link.href, location.href);
    } catch {
      return;
    }
    if (url.origin !== location.origin) return;
    if (url.pathname === location.pathname && url.search === location.search) return;
    event.preventDefault();
    root.classList.add('is-leaving');
    window.setTimeout(() => {
      location.href = url.href;
    }, 430);
  });
};
initPageTransition();

root.classList.add('motion-ready');
