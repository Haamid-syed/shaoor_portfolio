export function createMotion({ gsap, ScrollTrigger, isMotionEnabled, getInstrument = () => undefined }) {
  let context, introTimeline, introPrepared = false, introPlayed = false;
  const entered = new Set(), assembled = new Set();
  document.querySelectorAll('.heading-line').forEach(line => {
    const type = document.createElement('span'); type.className = 'heading-type';
    while (line.firstChild) type.append(line.firstChild);
    line.append(type);
  });

  function rise(timeline, elements, at = .12, stagger = .07) {
    if (!elements.length) return;
    timeline.fromTo(elements, { y: 18, opacity: 0 }, {
      y: 0, opacity: 1, duration: .7, stagger, ease: 'power3.out', clearProps: 'transform,opacity',
    }, at);
  }
  function draw(timeline, paths, at = .45) {
    paths.forEach((path, index) => {
      const length = path.getTotalLength();
      timeline.fromTo(path, { strokeDasharray: length, strokeDashoffset: length }, {
        strokeDashoffset: 0, duration: 1.1, delay: index * .045, ease: 'power2.inOut',
        clearProps: 'strokeDasharray,strokeDashoffset',
      }, at);
    });
  }
  function assembleParts(timeline, art, offset = 0) {
    // Keep each part's original CSS position, rotation, and scale as its landing pose.
    const groups = [
      ['.radio-body', .05, -8, 28, -5, .9],
      ['.radio-speaker,.radio-tuner', .23, 0, -12, 0, .85],
      ['.radio-controls b', .42, 0, -16, 0, .6],
      ['.radio-aerial', .34, 8, -35, 6, .9],
      ['.radio-label,.radio-footer', .5, 0, 5, 0, 1],
      ['.sensor-base', .05, 9, 30, 5, .9],
      ['.sensor-screen', .24, 0, -16, 0, .88],
      ['.sensor-slots,.sensor-led', .4, 0, -9, 0, .75],
      ['.sensor-probe', .35, -20, -26, -7, .9],
      ['.sensor-brand', .5, 0, 6, 0, 1],
      ['.pcb-board', .05, -10, 27, 6, .88],
      ['.pcb-chip', .27, 0, -23, 0, .82],
      ['.pcb-resistor,.pcb-cap,.pcb-pins', .4, 0, -18, 0, .7],
      ['.pcb-screw', .56, 0, -9, 0, .5],
      ['.motor-unit', .32, 24, -24, -9, .86],
      ['.motor-wire', .49, 8, 8, 0, .8],
      ['.pcb-caption', .66, 0, 5, 0, 1],
    ];
    groups.forEach(([selector, delay, x, y, rotation, scale]) => {
      art.querySelectorAll(selector).forEach((part, index) => {
        const landing = {
          x: Number(gsap.getProperty(part, 'x')) || 0,
          y: Number(gsap.getProperty(part, 'y')) || 0,
          rotation: Number(gsap.getProperty(part, 'rotation')) || 0,
          scale: Number(gsap.getProperty(part, 'scale')) || 1,
        };
        timeline.fromTo(part, {
          x: landing.x + x, y: landing.y + y, rotation: landing.rotation + rotation,
          scale: landing.scale * scale, opacity: 0,
        }, {
          ...landing, opacity: 1, duration: .82, ease: 'power3.out',
          clearProps: 'transform,opacity',
        }, offset + delay + index * .045);
      });
    });
    timeline.fromTo(art.querySelector('.object-shadow'), { scale: .5, opacity: 0 }, {
      scale: 1, opacity: 1, duration: .9, ease: 'power2.out', clearProps: 'transform,opacity',
    }, offset + .12);
  }
  function cardEntrance(card) {
    const timeline = gsap.timeline({ paused: true, onComplete: () => { card.dataset.assembled = 'true'; } });
    card.dataset.assembled = 'false';
    timeline.fromTo(card, { y: 28, opacity: 0 }, {
      y: 0, opacity: 1, duration: .75, ease: 'power3.out', clearProps: 'transform,opacity',
    }, 0);
    assembleParts(timeline, card.querySelector('.object-art'), .08);
    rise(timeline, card.querySelectorAll('.project-info'), .55);
    ScrollTrigger.create({
      trigger: card, start: 'top 87%', once: true,
      onEnter: () => { assembled.add(card); timeline.play(); },
    });
  }
  function sectionEntrance(section) {
    const timeline = gsap.timeline({ paused: true });
    timeline.fromTo(section, { '--chapter-line': 0 }, { '--chapter-line': 1, duration: 1, ease: 'power2.inOut' }, 0);
    rise(timeline, section.querySelectorAll('.section-kicker>span'), .04, .09);
    timeline.fromTo(section.querySelectorAll('.heading-type'), { yPercent: 108 }, {
      yPercent: 0, duration: 1, stagger: .08, ease: 'power3.out', clearProps: 'transform',
    }, .14);
    if (section.id === 'about') {
      timeline.fromTo('.notebook-wrap', { y: 42, rotation: -8, opacity: 0 }, {
        y: 0, rotation: -3, opacity: 1, duration: 1.1, ease: 'power3.out', clearProps: 'transform,opacity',
      }, .08);
      rise(timeline, section.querySelectorAll('.about-copy>p,.about-signature,.skills'), .35, .09);
      draw(timeline, [...section.querySelectorAll('.notebook-sketch path')], .48);
    }
    if (section.id === 'work') rise(timeline, section.querySelectorAll('.section-aside'), .35);
    if (section.id === 'journey') {
      rise(timeline, section.querySelectorAll('.journey-intro>p,.journey-note'), .35);
      timeline.fromTo('.timeline-item', { x: 20, opacity: 0 }, {
        x: 0, opacity: 1, duration: .8, stagger: .14, ease: 'power3.out', clearProps: 'transform,opacity',
      }, .2);
      draw(timeline, [...section.querySelectorAll('.journey-circuit path')], .48);
    }
    if (section.id === 'off-duty') {
      timeline.fromTo('.hobby-card', { y: 48, rotation: index => [-7, 5, -4][index], opacity: 0 }, {
        y: 0, rotation: index => [-2, 1.3, -1][index], opacity: 1,
        duration: 1, stagger: .12, ease: 'power3.out', clearProps: 'transform,opacity',
      }, .22);
      rise(timeline, section.querySelectorAll('.section-aside'), .4);
    }
    if (section.id === 'contact') {
      rise(timeline, section.querySelectorAll('.contact-content>p,.contact-email-block,.contact-actions,.contact-note,.contact-socials'), .4, .08);
      timeline.fromTo('.correspondence-card', { rotation: 7, y: 30, opacity: 0 }, {
        rotation: -2, y: 0, opacity: 1, duration: 1, ease: 'power3.out', clearProps: 'transform,opacity',
      }, .18);
      timeline.fromTo('.letter-paper', { '--letter-entry': '38px' }, { '--letter-entry': '0px', duration: 1.1, ease: 'power3.out' }, .28);
      rise(timeline, section.querySelectorAll('.letter-caption'), .7);
    }
    ScrollTrigger.create({ trigger: section, start: 'top 82%', once: true, onEnter: () => { entered.add(section); timeline.play(); } });
  }
  function parallax(element, trigger, from, to, start = 'top bottom') {
    gsap.fromTo(element, { y: from }, {
      y: to, ease: 'none',
      scrollTrigger: { trigger, start, end: 'bottom top', scrub: .85, invalidateOnRefresh: true },
    });
  }
  function configure() {
    context?.revert();
    if (!isMotionEnabled()) {
      introTimeline?.progress(1);
      gsap.killTweensOf('.project-visual .object-art');
      gsap.set('.project-visual .object-art', { clearProps: 'transform' });
      document.querySelectorAll('.project-card').forEach(card => { card.dataset.assembled = 'true'; });
      document.querySelector('.timeline').style.setProperty('--trace', '100%');
      getInstrument()?.setScrollProgress(0);
      return;
    }
    context = gsap.context(() => {
      document.querySelectorAll('.chapter').forEach(section => {
        if (entered.has(section) || section.getBoundingClientRect().bottom < 0) return;
        if (section.getBoundingClientRect().top < innerHeight * .82) { entered.add(section); return; }
        sectionEntrance(section);
      });
      document.querySelectorAll('.project-card').forEach(card => {
        if (assembled.has(card) || card.getBoundingClientRect().top < innerHeight * .87) {
          card.dataset.assembled = 'true'; return;
        }
        cardEntrance(card);
      });
      parallax('.instrument-depth', '.hero', 0, -48, 'top top');
      parallax('.notebook-parallax', '.about', 28, -42);
      document.querySelectorAll('.project-depth').forEach((layer, index) => {
        const depth = [23, 32, 18][index]; parallax(layer, '.work', depth, -depth);
      });
      parallax('.journey-circuit', '.journey', 12, -18);
      document.querySelectorAll('.hobby-visual').forEach((layer, index) => parallax(layer, '.off-duty', 15 + index * 4, -15 - index * 4));
      parallax('.correspondence-parallax', '.contact', 22, -32);
      ScrollTrigger.create({ trigger: '.hero', start: 'top top', end: 'bottom top', onUpdate: self => getInstrument()?.setScrollProgress(self.progress) });
      ScrollTrigger.create({ trigger: '.timeline', start: 'top 80%', end: 'bottom 68%', onUpdate: self => document.querySelector('.timeline').style.setProperty('--trace', `${self.progress * 100}%`) });
    });
    ScrollTrigger.refresh();
  }
  function prepareIntro() {
    if (introPrepared) return;
    introPrepared = true;
    if (!isMotionEnabled()) return;
    getInstrument()?.prepareEntrance();
    introTimeline = gsap.timeline({ paused: true });
    introTimeline
      .fromTo('.hero-line .line-inner', { yPercent: 110 }, { yPercent: 0, duration: 1.1, stagger: .12, ease: 'power3.out', clearProps: 'transform' }, 0)
      .fromTo('.hero-intro', { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: .6, clearProps: 'transform,opacity' }, .08)
      .fromTo('.hero-description,.hero-actions,.hero-footnote', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .7, stagger: .09, clearProps: 'transform,opacity' }, .32)
      .fromTo('.instrument-column', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .8, ease: 'power3.out', clearProps: 'transform,opacity' }, .1)
      .fromTo('.workbench-underline path', { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: .85, ease: 'power2.inOut', clearProps: 'strokeDasharray,strokeDashoffset' }, .8)
      .call(() => getInstrument()?.enter(), null, .12);
  }
  function intro() {
    if (introPlayed) return;
    introPlayed = true; prepareIntro();
    if (isMotionEnabled()) introTimeline?.play();
    else introTimeline?.progress(1);
  }
  document.querySelectorAll('.project-visual').forEach(card => {
    const art = card.querySelector('.object-art');
    card.addEventListener('pointermove', event => {
      if (!isMotionEnabled() || event.pointerType === 'touch' || card.parentElement.dataset.assembled !== 'true') return;
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - .5;
      const y = (event.clientY - bounds.top) / bounds.height - .5;
      gsap.to(art, { x: x * 14, y: y * 9 - 3, rotationY: x * 7, rotationX: -y * 5, duration: .45, overwrite: 'auto', ease: 'power3.out' });
    });
    card.addEventListener('pointerleave', () => {
      if (isMotionEnabled()) gsap.to(art, { x: 0, y: 0, rotationX: 0, rotationY: 0, duration: .65, overwrite: 'auto', ease: 'power3.out', clearProps: 'transform' });
      else gsap.set(art, { clearProps: 'transform' });
    });
  });
  return {
    configure, prepareIntro, intro,
    animateAsset(art) {
      if (!isMotionEnabled()) return undefined;
      const timeline = gsap.timeline(); assembleParts(timeline, art); return timeline;
    },
  };
}
