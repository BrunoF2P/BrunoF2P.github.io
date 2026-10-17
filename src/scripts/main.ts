import { animate, frame, inView, scroll, scrollInfo, stagger } from 'motion';
import Lenis from 'lenis';

const root = document.documentElement;
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const hasFine = fine && !reduce;

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
const SPRING = { type: 'spring' as const, stiffness: 220, damping: 26, mass: 0.6 };
const SPRING_SOFT = { type: 'spring' as const, stiffness: 140, damping: 20, mass: 0.7 };

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
   Custom cursor — frame-synced, reactive
   ============================================================ */
const initCursor = () => {
  if (!hasFine) return;
  const ring = document.querySelector<HTMLElement>('.cursor');
  const dot = document.querySelector<HTMLElement>('.cursor-dot');
  if (!ring || !dot) return;

  let mx = window.innerWidth / 2;
  let my = window.innerHeight / 2;
  let rx = mx;
  let ry = my;

  const move = (e: MouseEvent) => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
  };

  const loop = () => {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
  };

  window.addEventListener('mousemove', move, { passive: true });
  /* keepAlive = true: without it Motion runs the callback once and stops the loop. */
  frame.update(loop, true);

  const hoverTargets = 'a, button, [data-cursor], input, textarea, .chip, [data-tilt]';
  document.addEventListener('mouseover', (e) => {
    if ((e.target as HTMLElement)?.closest?.(hoverTargets)) root.classList.add('cursor-hover');
  });
  document.addEventListener('mouseout', (e) => {
    if ((e.target as HTMLElement)?.closest?.(hoverTargets)) root.classList.remove('cursor-hover');
  });
  document.addEventListener('mouseleave', () => root.classList.remove('cursor-ready'));
  document.addEventListener('mouseenter', () => root.classList.add('cursor-ready'));
  document.addEventListener('pointerdown', () => root.classList.add('cursor-press'));
  document.addEventListener('pointerup', () => root.classList.remove('cursor-press'));

  root.classList.add('cursor-ready');
};
initCursor();

/* ============================================================
   Scroll progress bar + marquee velocity signal
   ============================================================ */
const initScrollProgress = () => {
  const bar = document.querySelector<HTMLElement>('.scroll-progress');
  const marquees = Array.from(document.querySelectorAll<HTMLElement>('.marquee'));
  if (!bar && !marquees.length) return;

  scrollInfo((info) => {
    if (bar) {
      const progress = Math.max(0, Math.min(1, info.y.progress || 0));
      bar.style.transform = `scaleX(${progress})`;
    }
    if (!reduce && marquees.length) {
      /* Translate scroll velocity into a soft skew on the marquees. */
      const velocity = Math.max(-1600, Math.min(1600, info.y.velocity || 0));
      const skew = (velocity / 1600) * 4.5;
      for (const m of marquees) m.style.setProperty('--skew', `${skew.toFixed(3)}deg`);
    }
  });
};
initScrollProgress();

/* ============================================================
   Split-text reveals (word level)
   ============================================================ */
const splitWords = (node: Node) => {
  for (const child of Array.from(node.childNodes)) {
    if (child.nodeType === Node.TEXT_NODE) {
      const text = child.textContent ?? '';
      if (!text.trim()) continue;
      const fragment = document.createDocumentFragment();
      for (const token of text.split(/(\s+)/)) {
        if (!token) continue;
        if (!token.trim()) {
          fragment.append(document.createTextNode(token));
          continue;
        }
        const span = document.createElement('span');
        span.className = 'split-word';
        span.textContent = token;
        fragment.append(span);
      }
      child.replaceWith(fragment);
    } else if (child.nodeType === Node.ELEMENT_NODE) {
      splitWords(child);
    }
  }
};

const initSplitText = () => {
  document.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
    splitWords(el);
    const words = Array.from(el.querySelectorAll<HTMLElement>('.split-word'));
    if (!words.length) return;
    if (reduce) {
      words.forEach((w) => (w.style.opacity = '1'));
      return;
    }
    inView(
      el,
      () => {
        animate(
          words,
          { opacity: [0, 1], y: [26, 0], rotate: [1.4, 0] },
          { duration: 0.95, delay: stagger(0.05), ease: EASE },
        );
      },
      { margin: '0px 0px -14% 0px' },
    );
  });
};
initSplitText();

/* ============================================================
   Scroll reveals — hidden up-front, released on view
   ============================================================ */
const initReveals = () => {
  const items = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
  if (reduce) {
    items.forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  const distanceOf = (el: HTMLElement) => Number(el.dataset.revealDistance ?? 26);
  items.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = `translateY(${distanceOf(el)}px)`;
  });

  const enter = (el: HTMLElement, delay = 0): void => {
    animate(
      el,
      { opacity: [0, 1], y: [distanceOf(el), 0] },
      { duration: 0.9, delay, ease: EASE },
    );
  };

  /* Grouped children animate together with a stagger. */
  document.querySelectorAll<HTMLElement>('[data-reveal-group]').forEach((group) => {
    const children = Array.from(group.querySelectorAll<HTMLElement>(':scope > [data-reveal]'));
    if (!children.length) return;
    inView(
      group,
      () => {
        animate(
          children,
          { opacity: [0, 1], y: [28, 0] },
          { duration: 0.85, delay: stagger(0.08), ease: EASE },
        );
      },
      { margin: '0px 0px -12% 0px' },
    );
  });

  /* Standalone reveals (group children are excluded). */
  document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-reveal-group] > [data-reveal])').forEach((el) => {
    inView(el, () => enter(el, Number(el.dataset.revealDelay ?? 0)), { margin: '0px 0px -10% 0px' });
  });

  /* Safety net: only release what is actually on screen. */
  window.setTimeout(() => {
    const onScreen = (el: Element) => {
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight && r.bottom > 0;
    };
    items.forEach((el) => {
      if (onScreen(el) && getComputedStyle(el).opacity === '0') {
        el.style.opacity = '1';
        el.style.transform = 'none';
      }
    });
    document.querySelectorAll<HTMLElement>('[data-split]').forEach((host) => {
      if (!onScreen(host)) return;
      host.querySelectorAll<HTMLElement>('.split-word').forEach((w) => {
        if (getComputedStyle(w).opacity === '0') w.style.opacity = '1';
      });
    });
  }, 2600);
};
initReveals();

/* ============================================================
   Hero intro (line mask reveal) + scroll parallax
   ============================================================ */
const initHero = () => {
  const lines = Array.from(document.querySelectorAll<HTMLElement>('[data-hero-line]'));
  const fades = Array.from(document.querySelectorAll<HTMLElement>('[data-hero-fade]'));

  if (lines.length) {
    if (reduce) {
      lines.forEach((l) => (l.style.transform = 'translateY(0)'));
    } else {
      animate(lines, { y: ['118%', '0%'] }, { duration: 1.1, delay: stagger(0.09, { startDelay: 0.15 }), ease: EASE_OUT });
      fades.forEach((el, i) => {
        animate(el, { opacity: [0, 1], y: [18, 0] }, { duration: 0.95, delay: 0.5 + i * 0.1, ease: EASE });
      });
    }
  } else if (!reduce) {
    fades.forEach((el, i) => {
      animate(el, { opacity: [0, 1], y: [18, 0] }, { duration: 0.95, delay: 0.2 + i * 0.1, ease: EASE });
    });
  }

  const hero = document.querySelector<HTMLElement>('.hero');
  const inner = document.querySelector<HTMLElement>('.hero__inner');
  if (hero && inner && !reduce) {
    scroll(animate(inner, { y: [0, -70], opacity: [1, 0.25] }, { ease: 'linear' }), {
      target: hero,
      offset: ['start start', 'end start'],
    });
  }
};
initHero();

/* ============================================================
   Parallax (scroll-linked)
   ============================================================ */
const initParallax = () => {
  if (reduce) return;
  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    const strength = Number(el.dataset.parallax || 60);
    scroll(animate(el, { y: [strength, -strength] }, { ease: 'linear' }), {
      target: el,
      offset: ['start end', 'end start'],
    });
  });
};
initParallax();

/* ============================================================
   Magnetic buttons / links
   ============================================================ */
const initMagnetic = () => {
  if (!hasFine) return;
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    const strength = Number(el.dataset.magnetic || 14);
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * strength;
      const y = ((e.clientY - r.top) / r.height - 0.5) * strength;
      animate(el, { x, y }, SPRING);
    });
    el.addEventListener('mouseleave', () => {
      animate(el, { x: 0, y: 0 }, SPRING_SOFT);
    });
  });
};
initMagnetic();

/* ============================================================
   3D tilt (pointer-driven, spring settle)
   ============================================================ */
const initTilt = () => {
  if (!hasFine) return;
  const max = 9;
  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      animate(
        el,
        {
          rotateX: -py * max,
          rotateY: px * max,
          y: -6,
          scale: 1.012,
          transformPerspective: 1200,
        },
        SPRING,
      );
    });
    el.addEventListener('pointerleave', () => {
      animate(el, { rotateX: 0, rotateY: 0, y: 0, scale: 1, transformPerspective: 1200 }, SPRING_SOFT);
    });
  });
};
initTilt();

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
          duration: 1.7,
          ease: EASE,
          onUpdate: () => {
            el.textContent = `${prefix}${Math.round(counter.value)}${suffix}`;
          },
        });
        animate(el, { scale: [0.82, 1] }, { duration: 0.9, ease: EASE_OUT });
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

/* Active section highlight (scroll-spy) */
const initNavSpy = () => {
  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]'));
  if (!links.length) return;
  const ids = links
    .map((link) => link.getAttribute('href')?.split('#')[1])
    .filter((id): id is string => Boolean(id));
  const sections = ids
    .map((id) => document.getElementById(id))
    .filter((el): el is HTMLElement => Boolean(el));
  if (!sections.length) return;

  const mark = () => {
    const line = window.scrollY + window.innerHeight * 0.34;
    let current = sections[0].id;
    for (const section of sections) {
      if (section.offsetTop <= line) current = section.id;
    }
    links.forEach((link) => {
      link.classList.toggle('is-current', link.getAttribute('href')?.endsWith(`#${current}`) ?? false);
    });
  };
  mark();
  window.addEventListener('scroll', mark, { passive: true });
  window.addEventListener('resize', mark, { passive: true });
};
initNavSpy();

/* ============================================================
   Theme toggle
   ============================================================ */
const initTheme = () => {
  document.querySelectorAll<HTMLElement>('[data-theme-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const next = root.dataset.theme === 'light' ? 'dark' : 'light';
      root.classList.add('theme-anim');
      root.dataset.theme = next;
      try {
        localStorage.setItem('theme', next);
      } catch {
        /* ignore */
      }
      window.setTimeout(() => root.classList.remove('theme-anim'), 620);
    });
  });
};
initTheme();

/* ============================================================
   Project filters
   ============================================================ */
const initFilters = () => {
  document.querySelectorAll<HTMLElement>('[data-filters]').forEach((group) => {
    const buttons = group.querySelectorAll<HTMLButtonElement>('[data-filter]');
    const scope = document.querySelector<HTMLElement>(group.dataset.filters || '');
    if (!scope) return;
    const cards = Array.from(scope.querySelectorAll<HTMLElement>('[data-category]'));

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const value = btn.dataset.filter || 'all';
        buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
        cards.forEach((card) => {
          const show = value === 'all' || card.dataset.category === value;
          card.classList.toggle('is-hidden', !show);
        });
        const visible = cards.filter((c) => !c.classList.contains('is-hidden'));
        /* A filtered subset drops the bento mosaic for a tidy uniform grid. */
        scope.classList.toggle('is-filtered', value !== 'all');
        document.querySelectorAll<HTMLElement>('[data-visible-count]').forEach((out) => {
          out.textContent = String(visible.length);
        });
        if (!reduce) {
          animate(
            visible,
            { opacity: [0, 1], y: [20, 0], scale: [0.985, 1] },
            { duration: 0.55, delay: stagger(0.045), ease: EASE },
          );
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
        if (!reduce) animate(el, { scale: [1, 1.045, 1] }, { duration: 0.5, ease: EASE });
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
   Card badge (cursor-following "open" affordance)
   ============================================================ */
const initCardBadge = () => {
  /* The pill follows a fine pointer; without one (or with reduced motion) CSS takes over. */
  if (!hasFine || reduce) return;
  document.querySelectorAll<HTMLElement>('[data-badge-zone]').forEach((zone) => {
    const badge = zone.querySelector<HTMLElement>('[data-badge-pill]');
    if (!badge) return;
    const place = (event: PointerEvent) => {
      const rect = zone.getBoundingClientRect();
      badge.style.transform = `translate3d(${event.clientX - rect.left}px, ${event.clientY - rect.top}px, 0) translate(-50%, -50%)`;
    };
    zone.addEventListener('pointermove', place, { passive: true });
    zone.addEventListener('pointerenter', (event) => {
      place(event);
      animate(badge, { scale: 1, opacity: 1 }, SPRING);
    });
    zone.addEventListener('pointerleave', () => {
      animate(badge, { scale: 0.4, opacity: 0 }, SPRING_SOFT);
    });
  });
};
initCardBadge();

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
