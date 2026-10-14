import '@fontsource/cormorant-garamond/latin-500.css';
import '@fontsource/cormorant-garamond/latin-600.css';
import '@fontsource/cormorant-garamond/latin-700.css';
import '@fontsource/manrope/latin-400.css';
import '@fontsource/manrope/latin-500.css';
import '@fontsource/ibm-plex-mono/latin-400.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { profile, projects, journey, hobbies } from './content.js';
import { circuit, illustrations, hobbyArt, notebookArt } from './art.js';
import { createMotion } from './motion.js';
import { createLoader } from './loader.js';
import './style.css';
import './edition.css';
import './responsive.css';

gsap.registerPlugin(ScrollTrigger);
const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
let storedMotion;
try { storedMotion = localStorage.getItem('signal-room-motion'); } catch { /* Storage may be unavailable. */ }
let motionEnabled = storedMotion ? storedMotion === 'on' : !motionPreference.matches;
document.documentElement.dataset.motion = motionEnabled ? 'on' : 'off';

document.querySelector('#app').innerHTML = `
  <div class="reading-progress" aria-hidden="true"></div>
  <header class="site-header">
    <a class="brand" href="#home" aria-label="The Signal Room home"><span class="brand-monogram">${profile.initials}</span><span>the signal room<small>THE NOTEBOOK OF ${profile.name.toUpperCase()}</small></span></a>
    <nav class="desktop-nav" aria-label="Main navigation"><a href="#about">About</a><a href="#work">Projects</a><a href="#journey">Work & study</a><a href="#off-duty">Outside work</a></nav>
    <a href="#contact" class="nav-contact">Contact <span>05</span></a>
    <button class="menu-toggle" aria-label="Open navigation" aria-expanded="false">Menu</button>
  </header>
  <nav class="mobile-nav" aria-label="Mobile navigation" inert><a href="#about">About <span>01</span></a><a href="#work">Projects <span>02</span></a><a href="#journey">Work & study <span>03</span></a><a href="#off-duty">Outside work <span>04</span></a><a href="#contact">Contact <span>05</span></a></nav>
  <main>
    <section class="hero section-shell" id="home" aria-labelledby="hero-title">
      <div class="hero-copy">
        <div class="eyebrow hero-intro">${profile.name.toUpperCase()} <span class="intro-dash">/</span> ${profile.role.toUpperCase()}</div>
        <h1 id="hero-title"><span class="hero-line"><span class="line-inner">Built at</span></span><span class="hero-line hero-final-line"><span class="line-inner">the <span class="ink-word">workbench<span class="workbench-underline" aria-hidden="true"><svg viewBox="0 0 480 24" preserveAspectRatio="none"><path pathLength="1" d="M3 13 C17 4 28 21 44 12 S71 4 88 12 S116 21 134 11 S160 5 179 13 S207 20 224 11 S252 4 270 12 S297 21 316 11 S343 5 362 13 S390 20 407 11 S436 5 452 12 S469 16 477 10"/></svg></span></span>.</span></span></h1>
        <p class="hero-description">${profile.intro}</p>
        <div class="hero-actions"><a class="button button-solid" href="#work">View the projects <span class="button-index">02</span></a><a class="text-link" href="#about">A bit about me</a></div>
        <div class="hero-footnote"><span class="folio-tab">A / 01</span> HARDWARE · FIRMWARE · PROTOTYPES</div>
      </div>
      <div class="instrument-column">
        <div class="instrument-meta"><span>FIG. 01 / ANALOG OSCILLOSCOPE</span><span>SR–01</span></div>
        <div class="instrument-stage" aria-label="Interactive 3D vintage oscilloscope"><div class="instrument-register register-top" aria-hidden="true"></div><div class="instrument-register register-bottom" aria-hidden="true"></div><div class="instrument-depth"><canvas id="instrument-canvas" tabindex="0" role="img" aria-label="Vintage oscilloscope. Drag or use the arrow keys to rotate the case."></canvas><div class="instrument-fallback" hidden>${illustrations.radio}</div></div><span class="technical-note note-left">FRONT PANEL<br/>REV. B / 1974</span><span class="technical-note note-right">ROTATE THE CASE<br/>OR ADJUST THE SIGNAL</span></div>
        <div class="instrument-controls"><button class="power-button" aria-label="Turn oscilloscope off" aria-pressed="true"><span class="power-light"></span><span>POWER ON</span></button><label for="frequency">FREQUENCY<input id="frequency" type="range" min="1" max="5" step="0.1" value="2.4" aria-label="Oscilloscope frequency"/><output for="frequency" id="frequency-value">2.4 Hz</output></label><button class="reset-instrument" aria-label="Reset 3D view">Reset view</button></div>
        <fieldset class="waveform-selector"><legend>WAVEFORM</legend>${['sine','triangle','square'].map((wave,i)=>`<label><input type="radio" name="waveform" value="${wave}" ${i===0?'checked':''}/><span>${wave.toUpperCase()}</span></label>`).join('')}<span class="instrument-hint">DRAG / ARROW KEYS</span></fieldset>
      </div>
      <div class="hero-bottom"><span>PERSONAL PORTFOLIO / DRAFT 02</span><a href="#about">OPEN THE NOTEBOOK <span>01</span></a><span>FIVE CHAPTERS / ONE WORKBENCH</span></div>
    </section>
    <section class="about section-shell chapter" id="about" aria-labelledby="about-title">
      <div class="section-kicker"><span>01 / ABOUT</span><span>THE PERSON AT THE BENCH</span></div>
      <div class="about-grid"><div class="notebook-parallax"><div class="notebook-wrap">${notebookArt}<span class="notebook-caption">From the working notebook. Pencil, not a final drawing.</span></div></div><div class="about-copy"><h2 id="about-title"><span class="heading-line">A bit about</span><span class="heading-line">the engineer.</span></h2><p class="about-lead">${profile.about}</p><p>${profile.philosophy}</p><div class="about-signature"><span>${profile.name}</span><span>ELECTRONICS / ${profile.initials}</span></div><div class="skills"><span>Circuit design</span><span>Embedded systems</span><span>PCB layout</span></div></div></div>
    </section>
    <section class="work section-shell chapter" id="work" aria-labelledby="work-title"><div class="section-kicker"><span>02 / PROJECTS</span><span>A FEW ENTRIES FROM THE NOTEBOOK</span></div><div class="section-heading"><h2 id="work-title"><span class="heading-line">On the bench.</span></h2><p class="section-aside">Three sample projects.<br/>Open one to see the working notes.</p></div><div class="project-grid">${projects.map(p => `<article class="project-card"><button class="project-visual ${p.color}" data-project="${p.id}" aria-label="Open ${p.title}"><span class="project-number">ASSEMBLY / ${p.number}</span><div class="project-depth">${illustrations[p.id]}</div><span class="project-open">OPEN<br/>${p.number}</span><span class="visual-label">${p.id === 'radio' ? 'RF-01' : p.id === 'sensor' ? 'ENV-02' : 'MC-03'} / REV. A</span></button><div class="project-info"><span class="eyebrow">${p.category}</span><button data-project="${p.id}" class="project-title">${p.title}</button><p>${p.subtitle}</p><div class="project-tags">${p.tags.map(t => `<span>${t}</span>`).join('')}</div></div></article>`).join('')}</div><div class="work-footnote"><span>DESIGN / ASSEMBLY / TEST</span><span class="sample-label">SAMPLE CASE STUDIES</span></div></section>
    <section class="journey section-shell chapter" id="journey" aria-labelledby="journey-title"><div class="section-kicker"><span>03 / WORK & STUDY</span><span>EXPERIENCE / EDUCATION</span></div><div class="journey-grid"><div class="journey-intro"><h2 id="journey-title"><span class="heading-line">How I</span><span class="heading-line">got here.</span></h2><p>Work, study, and the things I picked up along the way.</p><div class="journey-circuit">${circuit}</div><span class="eyebrow journey-note">DATES & DETAILS TO BE ADDED.</span></div><div class="timeline">${journey.map((j,i) => `<article class="timeline-item"><div class="timeline-marker">${String(i+1).padStart(2,'0')}</div><div class="timeline-date eyebrow">${j.date}<span>${j.type}</span></div><h3>${j.title}</h3><span class="timeline-place">${j.place}</span><p>${j.description}</p></article>`).join('')}</div></div></section>
    <section class="off-duty section-shell chapter" id="off-duty" aria-labelledby="hobbies-title"><div class="section-kicker"><span>04 / OUTSIDE WORK</span><span>A CAMERA / A RECORD / A MAP</span></div><div class="section-heading"><h2 id="hobbies-title"><span class="heading-line">Away from</span><span class="heading-line">the soldering iron.</span></h2><p class="section-aside">A few other interests.<br/>Lift a card for the notes.</p></div><div class="hobby-grid">${hobbies.map((h,i) => `<button class="hobby-card" aria-expanded="false" aria-controls="hobby-${h.id}"><span class="hobby-index">FIELD NOTE / 0${i+1}</span><div class="hobby-visual">${hobbyArt[h.id]}</div><span class="eyebrow">${h.label}</span><h3>${h.title}</h3><span class="hobby-note" id="hobby-${h.id}" aria-hidden="true">${h.text}</span><span class="hobby-toggle"><span class="hobby-tab">0${i+1}</span><span class="hobby-action">LIFT THE NOTE</span></span></button>`).join('')}</div></section>
    <section class="contact section-shell chapter" id="contact" aria-labelledby="contact-title">
      <div class="section-kicker"><span>05 / CONTACT</span><span>CORRESPONDENCE</span></div>
      <div class="contact-body">
        <div class="contact-content">
          <h2 id="contact-title"><span class="heading-line">Drop me</span><span class="heading-line">a line.</span></h2>
          <p>Have a project in mind, or a role to discuss?<br/>Send a note with a few details.</p>
          <div class="contact-email-block"><span class="eyebrow">EMAIL</span><a class="contact-email" href="mailto:${profile.email}">${profile.email}</a></div>
          <div class="contact-actions"><a class="contact-compose" href="mailto:${profile.email}?subject=${encodeURIComponent(`Hello ${profile.firstName}`)}">Write an email</a><button class="copy-email" aria-label="Copy email address">Copy address</button></div>
          <span class="contact-note">SAMPLE ADDRESS / REPLACE WITH YOUR OWN</span>
          ${profile.github || profile.linkedin ? `<div class="contact-socials">${profile.github ? `<a href="${profile.github}" target="_blank" rel="noopener noreferrer">GitHub</a>` : ''}${profile.linkedin ? `<a href="${profile.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn</a>` : ''}</div>` : ''}
        </div>
        <div class="correspondence-parallax">
          <div class="correspondence-card">
            <div class="letter-paper">
              <div class="letter-head"><span>TO</span><span>PERSONAL CORRESPONDENCE</span></div>
              <strong>${profile.name}</strong><span class="letter-role">${profile.role}</span>
              <a class="letter-address" href="mailto:${profile.email}" aria-label="Email ${profile.name}">${profile.email}</a>
              <div class="letter-rule"></div><div class="letter-rule short-rule"></div>
              <span class="letter-reference">THE SIGNAL ROOM / 05</span>
            </div>
            <div class="mail-envelope" aria-hidden="true"><div class="envelope-back"></div><div class="envelope-left"></div><div class="envelope-right"></div><div class="envelope-front"></div><svg class="envelope-seams" viewBox="0 0 360 190" preserveAspectRatio="none"><path d="M1 5 180 124 359 5M1 189 153 105M359 189 207 105"/></svg><span class="mail-stamp">${profile.initials}<small>BY EMAIL</small></span></div>
          </div>
          <span class="letter-caption">No form. Just a note to my inbox.</span>
        </div>
      </div>
    </section>
  </main>
  <footer class="site-footer"><a class="footer-brand" href="#home">the signal room</a><span>${profile.name.toUpperCase()} / ELECTRONICS</span><button class="motion-toggle" aria-pressed="${motionEnabled}" aria-label="${motionEnabled?'Pause':'Enable'} animations">MOTION: ${motionEnabled?'ON':'OFF'}</button><a class="back-top" href="#home">BACK TO TOP</a><div class="demo-notice">Portfolio draft. The name, biography, projects, work, education, hobbies, and contact address are placeholders.</div></footer>
  <dialog class="project-dialog" aria-labelledby="dialog-title"><button class="dialog-close" aria-label="Close project details">Close</button><div class="dialog-content"></div></dialog><div class="toast" role="status" aria-live="polite"></div>
`;

const toast = message => {
  const el = document.querySelector('.toast'); el.textContent = message; el.classList.add('visible');
  clearTimeout(el.hideTimer); el.hideTimer = setTimeout(() => el.classList.remove('visible'), 2600);
};
const header=document.querySelector('.site-header');
let measuredHeaderHeight=0;
const headerObserver=new ResizeObserver(()=>{
  const height=Math.ceil(header.getBoundingClientRect().height);
  if(height!==measuredHeaderHeight){measuredHeaderHeight=height;document.documentElement.style.setProperty('--header-height',`${height}px`);}
});
headerObserver.observe(header);
header.classList.toggle('is-scrolled',scrollY>8);
const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
function closeMenu() { menuButton.setAttribute('aria-expanded','false'); mobileNav.classList.remove('open'); mobileNav.inert = true; menuButton.setAttribute('aria-label','Open navigation'); }
menuButton.addEventListener('click', () => { const open=menuButton.getAttribute('aria-expanded')!=='true'; menuButton.setAttribute('aria-expanded',String(open)); menuButton.setAttribute('aria-label',open?'Close navigation':'Open navigation'); mobileNav.classList.toggle('open',open); mobileNav.inert=!open; });
mobileNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});

const dialog=document.querySelector('.project-dialog');
let lastProjectButton, dialogAssetTimeline, closing=false;
document.querySelectorAll('[data-project]').forEach(button=>button.addEventListener('click',()=>{
  const p=projects.find(p=>p.id===button.dataset.project);lastProjectButton=button;closing=false;dialogAssetTimeline?.kill();
  gsap.killTweensOf([dialog,'.dialog-art .object-art','.dialog-text>*']);
  dialog.querySelector('.dialog-content').innerHTML=`<div class="dialog-art ${p.color}">${illustrations[p.id]}<span class="eyebrow">WORKING NOTES / ${p.number}</span></div><div class="dialog-text"><span class="eyebrow">${p.category}</span><h2 id="dialog-title">${p.title}</h2><p class="dialog-lead">${p.description}</p><div class="dialog-divider"></div><h3>The problem</h3><p>${p.challenge}</p><h3>Working method</h3><p>${p.approach}</p><div class="dialog-tags">${p.notes.map((n,i)=>`<span><b>0${i+1}</b>${n}</span>`).join('')}</div><span class="dialog-sample">Sample entry. Replace with your own work and measurements.</span></div>`;
  dialog.showModal();document.body.classList.add('dialog-open');
  dialogAssetTimeline=motion.animateAsset(dialog.querySelector('.object-art'));
  if(motionEnabled){gsap.fromTo(dialog,{y:16,opacity:0,scale:.985},{y:0,opacity:1,scale:1,duration:.4,ease:'power3.out',clearProps:'transform,opacity'});gsap.fromTo('.dialog-text>*',{y:9,opacity:0},{y:0,opacity:1,duration:.4,stagger:.025,delay:.1,ease:'power2.out',clearProps:'transform,opacity'});}
}));
function closeDialog(){if(closing||!dialog.open)return;closing=true;gsap.killTweensOf(dialog);if(motionEnabled)gsap.to(dialog,{opacity:0,y:9,duration:.18,ease:'power2.in',onComplete:()=>{dialog.close();gsap.set(dialog,{clearProps:'transform,opacity'});}});else dialog.close();}
dialog.querySelector('.dialog-close').addEventListener('click',closeDialog);
dialog.addEventListener('cancel',e=>{e.preventDefault();closeDialog();});
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeDialog();}});
dialog.addEventListener('close',()=>{dialogAssetTimeline?.kill();closing=false;document.body.classList.remove('dialog-open');lastProjectButton?.focus({preventScroll:true});});

document.querySelectorAll('.hobby-card').forEach(card=>card.addEventListener('click',()=>{const open=card.getAttribute('aria-expanded')!=='true';card.setAttribute('aria-expanded',String(open));card.classList.toggle('expanded',open);card.querySelector('.hobby-note').setAttribute('aria-hidden',String(!open));card.querySelector('.hobby-action').textContent=open?'CLOSE THE NOTE':'LIFT THE NOTE';if(motionEnabled&&card.querySelector('.camera-lens'))gsap.fromTo(card.querySelector('.shutter-leaf'),{scale:1,opacity:1},{scale:0,opacity:0,duration:.42,ease:'power2.out'});ScrollTrigger.refresh();}));
document.querySelectorAll('.copy-email').forEach(button=>button.addEventListener('click',async()=>{
  try{
    await navigator.clipboard.writeText(profile.email);
    toast('Email address copied.');
    button.dataset.label ||= button.textContent;
    button.textContent='Copied';button.classList.add('copied');
    clearTimeout(button.copyTimer);
    button.copyTimer=setTimeout(()=>{button.textContent=button.dataset.label;button.classList.remove('copied');},2200);
  }catch{toast(profile.email);}
}));

let instrument;
const frequency=document.querySelector('#frequency');
const power=document.querySelector('.power-button');
frequency.addEventListener('input',()=>{document.querySelector('#frequency-value').value=`${Number(frequency.value).toFixed(1)} Hz`;instrument?.setFrequency(Number(frequency.value));});
power.addEventListener('click',()=>{const on=power.getAttribute('aria-pressed')!=='true';power.setAttribute('aria-pressed',String(on));power.setAttribute('aria-label',on?'Turn oscilloscope off':'Turn oscilloscope on');power.classList.toggle('off',!on);power.querySelector('span:last-child').textContent=`POWER ${on?'ON':'OFF'}`;instrument?.setPower(on);});
document.querySelector('.reset-instrument').addEventListener('click',()=>instrument?.reset());
document.querySelectorAll('[name=waveform]').forEach(input=>input.addEventListener('change',()=>instrument?.setWaveform(input.value)));

const motion=createMotion({gsap,ScrollTrigger,isMotionEnabled:()=>motionEnabled,getInstrument:()=>instrument});
function updateMotion(){document.documentElement.dataset.motion=motionEnabled?'on':'off';instrument?.setMotion(motionEnabled);if(!motionEnabled){gsap.killTweensOf('.shutter-leaf');gsap.set('.shutter-leaf',{opacity:0,scale:0});}const button=document.querySelector('.motion-toggle');button.setAttribute('aria-pressed',String(motionEnabled));button.setAttribute('aria-label',`${motionEnabled?'Pause':'Enable'} animations`);button.textContent=`MOTION: ${motionEnabled?'ON':'OFF'}`;motion.configure();loaderController?.syncMotion();}
document.querySelector('.motion-toggle').addEventListener('click',()=>{motionEnabled=!motionEnabled;try{localStorage.setItem('signal-room-motion',motionEnabled?'on':'off');storedMotion=motionEnabled?'on':'off';}catch{}updateMotion();});
motionPreference.addEventListener('change',e=>{if(!storedMotion){motionEnabled=!e.matches;updateMotion();}});

document.querySelectorAll('.hobby-note').forEach(note=>note.addEventListener('transitionend',e=>{if(e.propertyName==='max-height')ScrollTrigger.refresh();}));

const loaderController=createLoader({
  gsap,
  app:document.querySelector('#app'),
  isMotionEnabled:()=>motionEnabled,
  prepareIntro:()=>motion.prepareIntro(),
  playIntro:()=>motion.intro(),
  afterReveal:()=>motion.configure(),
});
async function start(){
  try{
    loaderController.stage(1,'Preparing the type');
    await document.fonts.ready;
    loaderController.stage(2,'Calibrating the display');
    // Let the loader paint before constructing the 3D model.
    await new Promise(requestAnimationFrame);
    const {createInstrument}=await import('./scene.js');
    instrument=await createInstrument(document.querySelector('#instrument-canvas'),{
      motion:motionEnabled,
      onFrequencyChange:value=>{
        frequency.value=value.toFixed(1);
        document.querySelector('#frequency-value').value=`${value.toFixed(1)} Hz`;
      },
    });
    instrument.setMotion(motionEnabled);
    instrument.setFrequency(Number(frequency.value));
    instrument.setPower(power.getAttribute('aria-pressed')==='true');
    instrument.setWaveform(document.querySelector('[name=waveform]:checked').value);
  }catch(error){
    document.querySelector('.instrument-fallback').hidden=false;
    document.querySelector('#instrument-canvas').hidden=true;
    document.querySelectorAll('.instrument-controls button,.instrument-controls input,.waveform-selector input').forEach(el=>el.disabled=true);
    console.warn('3D unavailable; using the static illustration.',error);
  }finally{
    loaderController.stage(3,'Notebook ready');
    await loaderController.reveal();
  }
}
start().catch(error=>{loaderController.cancel();console.error('Portfolio initialization failed.',error);});

const sectionObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)document.querySelectorAll('.desktop-nav a').forEach(a=>a.classList.toggle('active',a.hash===`#${entry.target.id}`));});},{rootMargin:'-20% 0px -55% 0px'});
document.querySelectorAll('main section').forEach(s=>sectionObserver.observe(s));
let scrollScheduled=false;
addEventListener('scroll',()=>{if(scrollScheduled)return;scrollScheduled=true;requestAnimationFrame(()=>{const max=document.documentElement.scrollHeight-innerHeight;const progress=max?scrollY/max:0;header.classList.toggle('is-scrolled',scrollY>8);document.querySelector('.reading-progress').style.transform=`scaleX(${progress})`;scrollScheduled=false;});},{passive:true});
