export function createLoader({ gsap, app, isMotionEnabled, prepareIntro, playIntro, afterReveal }) {
  const loader = document.querySelector('#page-loader');
  const started = performance.now();
  let released = false, revealPromise, exitTimeline;
  if (loader) {
    app.inert = true;
    document.body.classList.add('is-loading');
  }

  function release() {
    if (released) return;
    released = true;
    loader?.remove();
    app.inert = false;
    document.body.classList.remove('is-loading');
    afterReveal();
  }

  async function revealOnce() {
    const remaining = loader && isMotionEnabled() ? Math.max(0, 1050 - (performance.now() - started)) : 0;
    if (remaining) await new Promise(resolve => setTimeout(resolve, remaining));
    // Set the hero's initial pose while the paper is still opaque. Never hide it after uncovering it.
    prepareIntro();
    if (!loader || !isMotionEnabled()) {
      playIntro();
      release();
      return;
    }
    await new Promise(requestAnimationFrame);
    await new Promise(resolve => {
      exitTimeline = gsap.timeline({ onComplete: () => { release(); resolve(); } });
      exitTimeline
        .to(loader.querySelector('.loader-calibration'), { opacity: 0, y: -8, duration: .24, ease: 'power2.in' }, 0)
        .to(loader.querySelectorAll('.loader-panel'), {
          yPercent: index => index === 0 ? -101 : 101,
          duration: .86,
          ease: 'power3.inOut',
          force3D: true,
        }, .1)
        .call(playIntro, null, .18);
    });
  }

  return {
    stage(number, text) {
      if (!loader || released) return;
      loader.querySelector('.loader-stage').textContent = text;
      loader.querySelector('.loader-count').textContent = `0${number} / 03`;
      loader.style.setProperty('--load', number / 3);
    },
    reveal() {
      if (!revealPromise) revealPromise = revealOnce().catch(error => { release(); throw error; });
      return revealPromise;
    },
    syncMotion() { if (!isMotionEnabled()) exitTimeline?.progress(1); },
    cancel() { exitTimeline?.kill(); release(); },
  };
}
