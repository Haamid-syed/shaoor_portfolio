import '@fontsource/cormorant-garamond/latin-400.css';
import '@fontsource/cormorant-garamond/latin-500.css';
import '@fontsource/cormorant-garamond/latin-500-italic.css';
import '@fontsource/manrope/latin-400.css';
import '@fontsource/manrope/latin-500.css';
import '@fontsource/manrope/latin-600.css';
import '@fontsource/ibm-plex-mono/latin-400.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { profile, projects, journey, hobbies } from './content.js';
import { icon, spark, circuit, illustrations, hobbyArt, notebookArt } from './art.js';
import './style.css';

gsap.registerPlugin(ScrollTrigger);
const storedMotion = localStorage.getItem('signal-room-motion');
let motionEnabled = storedMotion ? storedMotion === 'on' : !matchMedia('(prefers-reduced-motion: reduce)').matches;
document.documentElement.dataset.motion = motionEnabled ? 'on' : 'off';

document.querySelector('#app').innerHTML = `
  <div class="reading-progress" aria-hidden="true"></div>
  <header class="site-header">
    <a class="brand" href="#home" aria-label="The Signal Room home"><span class="brand-symbol">${icon('wave', 32)}</span><span>the signal room<span class="brand-period">.</span><small>A PERSONAL ENGINEERING JOURNAL</small></span></a>
    <nav class="desktop-nav" aria-label="Main navigation"><a href="#about">The maker</a><a href="#work">The work</a><a href="#journey">The journey</a><a href="#off-duty">Off duty</a></nav>
    <a href="#contact" class="nav-contact">Let’s talk ${icon('diagonal', 15)}</a>
    <button class="menu-toggle icon-button" aria-label="Open navigation" aria-expanded="false">${icon('menu')}</button>
  </header>
  <nav class="mobile-nav" aria-label="Mobile navigation" inert><a href="#about">The maker <span>01</span></a><a href="#work">The work <span>02</span></a><a href="#journey">The journey <span>03</span></a><a href="#off-duty">Off duty <span>04</span></a><a href="#contact">Let’s talk ${icon('diagonal')}</a></nav>
  <main>
    <section class="hero section-shell" id="home" aria-labelledby="hero-title">
      <div class="hero-copy">
        <div class="eyebrow hero-intro"><span class="status-dot"></span> HELLO, I’M ${profile.firstName.toUpperCase()} <span class="intro-dash">/</span> ${profile.role.toUpperCase()}</div>
        <h1 id="hero-title"><span class="hero-line">Good things</span><span class="hero-line">start with</span><span class="hero-line italic-line">a little <em>spark.</em><span class="title-spark">${spark}</span></span></h1>
        <p class="hero-description">${profile.intro}</p>
        <div class="hero-actions"><a class="button button-solid" href="#work">Explore my work ${icon('diagonal', 18)}</a><a class="text-link" href="#about">Meet the maker ${icon('arrow', 18)}</a></div>
        <div class="hero-footnote"><span class="tiny-cross">+</span> BUILT WITH INTENTION. WIRED WITH CURIOSITY.</div>
      </div>
      <div class="instrument-column">
        <div class="instrument-meta"><span>FIG. 01 — THE CURIOSITY ENGINE</span><span class="meta-cross">+</span></div>
        <div class="instrument-stage" aria-label="Interactive 3D vintage oscilloscope"><div class="stage-orbit orbit-one"></div><div class="stage-orbit orbit-two"></div><div class="stage-coordinate coord-top">Y</div><div class="stage-coordinate coord-left">X</div><canvas id="instrument-canvas" role="img" aria-label="A vintage olive-green oscilloscope showing an animated waveform"></canvas><div class="instrument-fallback" hidden>${illustrations.radio}</div><span class="annotation annotation-one">a world of possibilities<span></span></span><span class="annotation annotation-two"><span></span>everything starts<br/>with a signal.</span></div>
        <div class="instrument-controls"><button class="power-button" aria-label="Turn oscilloscope off" aria-pressed="true"><span class="power-light"></span><span>SIGNAL ON</span></button><label for="frequency">FREQUENCY<input id="frequency" type="range" min="1" max="5" step="0.1" value="2.4" aria-label="Oscilloscope frequency"/><output for="frequency" id="frequency-value">2.4 Hz</output></label><button class="reset-instrument" title="Reset 3D view" aria-label="Reset 3D view">↺</button></div>
        <div class="instrument-hint"><span class="hint-drag">↔</span> DRAG TO EXPLORE <span>·</span> TUNE TO PLAY</div>
      </div>
      <div class="hero-bottom"><span>ENGINEERING, WITH A HUMAN TOUCH.</span><a href="#about" aria-label="Continue to the maker">A FEW THINGS ABOUT ME <span>↓</span></a><span>VOL. 01 / EST. IN CURIOSITY</span></div>
    </section>
    <div class="ticker" aria-hidden="true"><div class="ticker-track">${Array.from({ length: 4 }, () => '<span>IDEAS TO CIRCUITS</span><i>✳</i><span>THOUGHTFUL BY DESIGN</span><i>✳</i><span>A LITTLE ANALOG SOUL</span><i>✳</i>').join('')}</div></div>
    <section class="about section-shell" id="about" aria-labelledby="about-title">
      <div class="section-kicker reveal"><span>01 / THE MAKER</span><span>THE PERSON BEHIND THE CIRCUITS</span></div>
      <div class="about-grid"><div class="notebook-wrap reveal">${notebookArt}<span class="notebook-caption">Always a work in progress. Always curious.</span></div><div class="about-copy"><h2 class="reveal" id="about-title">An engineer’s mind.<br/><em>A maker’s heart.</em></h2><p class="about-lead reveal">${profile.about}</p><p class="reveal">${profile.philosophy}</p><div class="about-signature reveal"><span class="signature">${profile.firstName}</span><span>THE MAKER, IN A NUTSHELL ${icon('wave', 37)}</span></div><div class="skills reveal"><span>CIRCUIT DESIGN</span><span>EMBEDDED SYSTEMS</span><span>PCB LAYOUT</span><span>A LOT OF CURIOSITY</span></div></div></div>
    </section>
    <section class="work section-shell" id="work" aria-labelledby="work-title"><div class="section-kicker reveal"><span>02 / SELECTED WORK</span><span>FROM THE NOTEBOOK TO THE WORKBENCH</span></div><div class="section-heading"><h2 class="reveal" id="work-title">From thought<br/><em>to tangible.</em></h2><p class="section-aside reveal">A few things I’ve imagined, built,<br/>broken, and made better.</p></div><div class="project-grid">${projects.map(p => `<article class="project-card reveal"><button class="project-visual ${p.color}" data-project="${p.id}" aria-label="Explore ${p.title}"><span class="project-number">EXPERIMENT / ${p.number}</span>${illustrations[p.id]}<span class="project-open">${icon('diagonal', 21)}</span><span class="visual-label">${p.category}</span></button><div class="project-info"><span class="eyebrow">${p.category}</span><button data-project="${p.id}" class="project-title">${p.title} ${icon('diagonal', 19)}</button><p>${p.subtitle}</p><div class="project-tags">${p.tags.map(t => `<span>${t}</span>`).join('')}</div></div></article>`).join('')}</div><div class="work-footnote reveal">${icon('wave', 24)}<span>Every project is a conversation between an idea and what’s possible.</span><span class="sample-label">ILLUSTRATIVE PROJECTS</span></div></section>
    <section class="journey section-shell" id="journey" aria-labelledby="journey-title"><div class="section-kicker reveal"><span>03 / THE JOURNEY</span><span>GOOD THINGS TAKE A LITTLE TIME</span></div><div class="journey-grid"><div class="journey-intro"><h2 class="reveal" id="journey-title">Connecting<br/><em>the dots.</em></h2><p class="reveal">The experiences, classrooms, and little detours that shaped the way I think and build.</p><div class="journey-circuit reveal">${circuit}</div><span class="eyebrow journey-note reveal">A TIMELINE, STILL IN THE MAKING.</span></div><div class="timeline">${journey.map((j,i) => `<article class="timeline-item reveal"><div class="timeline-marker">${i === 2 ? '◇' : '+'}</div><div class="timeline-date eyebrow">${j.date}<span>${j.type}</span></div><h3>${j.title}</h3><span class="timeline-place">${j.place}</span><p>${j.description}</p></article>`).join('')}</div></div></section>
    <section class="off-duty section-shell" id="off-duty" aria-labelledby="hobbies-title"><div class="section-kicker reveal"><span>04 / OFF DUTY</span><span>THERE’S LIFE OUTSIDE THE LAB</span></div><div class="section-heading"><h2 class="reveal" id="hobbies-title">Other things<br/><em>that make me tick.</em></h2><div class="hobbies-side reveal">${spark}<p>Curiosity doesn’t clock out.</p></div></div><div class="hobby-grid">${hobbies.map((h,i) => `<button class="hobby-card reveal" aria-expanded="false"><span class="hobby-index">0${i+1} / PERSONAL FREQUENCIES</span><div class="hobby-visual">${hobbyArt[h.id]}</div><span class="eyebrow">${h.label}</span><h3>${h.title}</h3><span class="hobby-note">${h.text}</span><span class="hobby-toggle">${icon('plus', 17)}<span>TAKE A CLOSER LOOK</span></span></button>`).join('')}</div></section>
    <section class="contact section-shell" id="contact" aria-labelledby="contact-title"><div class="section-kicker reveal"><span>05 / LET’S CONNECT</span><span>SOMETHING GOOD COULD START HERE</span></div><div class="contact-body"><div class="contact-spark reveal">${spark}</div><div class="contact-content"><h2 class="reveal" id="contact-title">Have a bright idea?<br/><em>Let’s make it real.</em></h2><p class="reveal">A project, an opportunity, or just a good conversation.<br/>There’s always room at the workbench.</p><div class="contact-actions reveal"><a class="contact-email" href="mailto:${profile.email}">${profile.email} ${icon('diagonal', 30)}</a><button class="copy-email icon-button" aria-label="Copy email address" title="Copy email address"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V4H4v12h4"/></svg></button></div><span class="contact-note reveal">SAMPLE ADDRESS · REPLACE WITH YOUR OWN</span></div><div class="postmark reveal"><span>THE SIGNAL ROOM</span>${icon('wave', 62)}<span>GOOD IDEAS WELCOME</span></div></div></section>
  </main>
  <footer class="site-footer"><a class="footer-brand" href="#home">the signal room.</a><span>DESIGNED WITH CARE. BUILT WITH CURIOSITY.</span><button class="motion-toggle" aria-pressed="${motionEnabled}" aria-label="${motionEnabled ? 'Pause' : 'Enable'} animations">${icon(motionEnabled ? 'pause' : 'play', 12)}<span>MOTION ${motionEnabled ? 'ON' : 'OFF'}</span></button><a class="back-top" href="#home">BACK TO TOP ↑</a><div class="demo-notice">An illustrative portfolio for ${profile.name}. Projects, experience, education, and hobbies are sample content.</div></footer>
  <dialog class="project-dialog" aria-labelledby="dialog-title"><button class="dialog-close icon-button" aria-label="Close project details">${icon('close', 24)}</button><div class="dialog-content"></div></dialog><div class="toast" role="status" aria-live="polite"></div>
`;

const toast = (message) => {
  const el = document.querySelector('.toast'); el.textContent = message; el.classList.add('visible');
  clearTimeout(el.hideTimer); el.hideTimer = setTimeout(() => el.classList.remove('visible'), 3200);
};
const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
function closeMenu() { menuButton.setAttribute('aria-expanded', 'false'); mobileNav.classList.remove('open'); mobileNav.inert = true; menuButton.setAttribute('aria-label', 'Open navigation'); }
menuButton.addEventListener('click', () => { const open = menuButton.getAttribute('aria-expanded') !== 'true'; menuButton.setAttribute('aria-expanded', String(open)); menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); mobileNav.classList.toggle('open', open); mobileNav.inert = !open; });
mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

const dialog = document.querySelector('.project-dialog');
let lastProjectButton;
document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
  const p = projects.find(p => p.id === button.dataset.project); lastProjectButton = button;
  dialog.querySelector('.dialog-content').innerHTML = `<div class="dialog-art ${p.color}">${illustrations[p.id]}<span class="eyebrow">EXPERIMENT / ${p.number}</span></div><div class="dialog-text"><span class="eyebrow">${p.category} · ILLUSTRATIVE PROJECT</span><h2 id="dialog-title">${p.title}</h2><p class="dialog-lead">${p.description}</p><div class="dialog-divider"></div><h3>The question</h3><p>${p.challenge}</p><h3>The approach</h3><p>${p.approach}</p><div class="dialog-tags">${p.notes.map(n => `<span>${icon('plus', 12)}${n}</span>`).join('')}</div><span class="dialog-sample">Sample case study — replace with your own project and verified results.</span></div>`;
  dialog.showModal(); document.body.classList.add('dialog-open');
}));
function closeDialog() { dialog.close(); }
dialog.querySelector('.dialog-close').addEventListener('click', closeDialog);
dialog.addEventListener('click', e => { if (e.target === dialog) { const r = dialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) closeDialog(); } });
dialog.addEventListener('close', () => { document.body.classList.remove('dialog-open'); lastProjectButton?.focus({ preventScroll: true }); });

document.querySelectorAll('.hobby-card').forEach(card => card.addEventListener('click', () => { const open = card.getAttribute('aria-expanded') !== 'true'; card.setAttribute('aria-expanded', String(open)); card.classList.toggle('expanded', open); card.querySelector('.hobby-toggle span').textContent = open ? 'A LITTLE MORE ABOUT ME' : 'TAKE A CLOSER LOOK'; }));
document.querySelector('.copy-email').addEventListener('click', async () => { try { await navigator.clipboard.writeText(profile.email); toast('Sample email copied. Replace it with your own.'); } catch { toast(`Email address: ${profile.email}`); } });

let instrument;
try { const { createInstrument } = await import('./scene.js'); instrument = createInstrument(document.querySelector('#instrument-canvas'), { motion: motionEnabled }); }
catch (error) { document.querySelector('.instrument-fallback').hidden = false; document.querySelector('#instrument-canvas').hidden = true; document.querySelector('.instrument-hint').textContent = 'A LITTLE ANALOG SOUL'; document.querySelectorAll('.instrument-controls button, .instrument-controls input').forEach(el => el.disabled = true); console.warn('3D rendering unavailable; showing static illustration.', error); }
const freqInput = document.querySelector('#frequency');
freqInput.addEventListener('input', () => { const value = Number(freqInput.value); document.querySelector('#frequency-value').value = `${value.toFixed(1)} Hz`; instrument?.setFrequency(value); });
const power = document.querySelector('.power-button');
power.addEventListener('click', () => { const on = power.getAttribute('aria-pressed') !== 'true'; power.setAttribute('aria-pressed', String(on)); power.setAttribute('aria-label', on ? 'Turn oscilloscope off' : 'Turn oscilloscope on'); power.classList.toggle('off', !on); power.querySelector('span:last-child').textContent = `SIGNAL ${on ? 'ON' : 'OFF'}`; instrument?.setPower(on); });
document.querySelector('.reset-instrument').addEventListener('click', () => instrument?.reset());

let revealContext;
function configureMotion() {
  revealContext?.revert();
  document.documentElement.dataset.motion = motionEnabled ? 'on' : 'off';
  instrument?.setMotion(motionEnabled);
  const button = document.querySelector('.motion-toggle');
  button.setAttribute('aria-pressed', String(motionEnabled)); button.setAttribute('aria-label', `${motionEnabled ? 'Pause' : 'Enable'} animations`); button.innerHTML = `${icon(motionEnabled ? 'pause' : 'play', 12)}<span>MOTION ${motionEnabled ? 'ON' : 'OFF'}</span>`;
  if (motionEnabled) revealContext = gsap.context(() => {
    gsap.from('.hero-intro, .hero-line, .hero-description, .hero-actions, .hero-footnote', { y: 28, opacity: 0, duration: 1.1, stagger: .11, ease: 'power3.out', clearProps: 'transform,opacity' });
    gsap.from('.instrument-column', { opacity: 0, y: 25, duration: 1.5, delay: .4, ease: 'power2.out', clearProps: 'transform,opacity' });
    document.querySelectorAll('.reveal').forEach(el => gsap.from(el, { y: 32, opacity: 0, duration: .9, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 93%', once: true }, clearProps: 'transform,opacity' }));
    gsap.to('.notebook-wrap', { y: -22, rotation: -1.5, ease: 'none', scrollTrigger: { trigger: '.about', start: 'top bottom', end: 'bottom top', scrub: 1 } });
  });
}
configureMotion();
document.querySelector('.motion-toggle').addEventListener('click', () => { motionEnabled = !motionEnabled; localStorage.setItem('signal-room-motion', motionEnabled ? 'on' : 'off'); configureMotion(); });
matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', e => { if (!localStorage.getItem('signal-room-motion')) { motionEnabled = !e.matches; configureMotion(); } });

document.querySelectorAll('.project-visual').forEach(card => {
  card.addEventListener('pointermove', e => { if (!motionEnabled || e.pointerType === 'touch') return; const r = card.getBoundingClientRect(); card.style.setProperty('--tilt-x', `${((e.clientY - r.top) / r.height - .5) * -7}deg`); card.style.setProperty('--tilt-y', `${((e.clientX - r.left) / r.width - .5) * 9}deg`); });
  card.addEventListener('pointerleave', () => { card.style.setProperty('--tilt-x', '0deg'); card.style.setProperty('--tilt-y', '0deg'); });
});
const sectionObserver = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) document.querySelectorAll('.desktop-nav a').forEach(a => a.classList.toggle('active', a.hash === `#${entry.target.id}`)); }); }, { rootMargin: '-20% 0px -55% 0px' });
document.querySelectorAll('main section').forEach(s => sectionObserver.observe(s));
let scrollScheduled = false;
addEventListener('scroll', () => { if (scrollScheduled) return; scrollScheduled = true; requestAnimationFrame(() => { const max = document.documentElement.scrollHeight - innerHeight; document.querySelector('.reading-progress').style.transform = `scaleX(${max ? scrollY / max : 0})`; document.querySelector('.site-header').classList.toggle('scrolled', scrollY > 30); scrollScheduled = false; }); }, { passive: true });
