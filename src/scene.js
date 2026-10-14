import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

export function createInstrument(canvas, options = {}) {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.8));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.5;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(33, 1, .1, 80);
  camera.position.set(7.8, 5.1, 12.8);
  camera.lookAt(0, -.25, 0);
  scene.add(new THREE.HemisphereLight(0xfffae6, 0x787963, 3.0));
  const key = new THREE.DirectionalLight(0xfff4d7, 5);
  key.position.set(-4, 8, 8); key.castShadow = true; key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.left = -9; key.shadow.camera.right = 9; key.shadow.camera.top = 9; key.shadow.camera.bottom = -9;
  key.shadow.normalBias = .03; scene.add(key);
  const fill = new THREE.DirectionalLight(0xe2e8db, 2); fill.position.set(5, 3, -4); scene.add(fill);
  const materials = {
    shell: new THREE.MeshStandardMaterial({ color: 0x798375, roughness: .67, metalness: .18 }),
    cream: new THREE.MeshStandardMaterial({ color: 0xe6dec5, roughness: .72, metalness: .08 }),
    dark: new THREE.MeshStandardMaterial({ color: 0x343c30, roughness: .6, metalness: .2 }),
    trim: new THREE.MeshStandardMaterial({ color: 0xb4b29a, roughness: .36, metalness: .65 }),
    knob: new THREE.MeshStandardMaterial({ color: 0x675c45, roughness: .51, metalness: .35 }),
    brass: new THREE.MeshStandardMaterial({ color: 0xa88752, roughness: .4, metalness: .66 }),
    rubber: new THREE.MeshStandardMaterial({ color: 0x3b3d31, roughness: .9 }),
  };
  const instrument = new THREE.Group(); scene.add(instrument);
  const model = new THREE.Group(); instrument.add(model);
  const box = (w,h,d,material,r=.07) => { const m = new THREE.Mesh(new RoundedBoxGeometry(w,h,d,3,r), material); m.castShadow = true; m.receiveShadow = true; return m; };
  const addBox = (w,h,d,material,x,y,z,r) => { const m = box(w,h,d,material,r); m.position.set(x,y,z); model.add(m); return m; };
  addBox(5.6,3.6,2.8,materials.shell,0,0,-.2,.17);
  addBox(5.37,3.34,.12,materials.trim,0,0,1.21,.09);
  addBox(5.24,3.20,.10,materials.cream,0,0,1.29,.09);
  // Vented side housing, with distinct depth and metalwork.
  for(let i=0;i<11;i++) addBox(.032,.98,.07,materials.dark,2.81,.34,-1.1+i*.145,.009);
  for(let i=0;i<4;i++) addBox(.45,.035,.08,materials.trim,2.81,-1.06+i*.11,.0,.007).rotation.y = Math.PI/2;
  addBox(3.11,2.65,.18,materials.dark,-.78,.04,1.4,.17);
  addBox(2.86,2.39,.10,materials.trim,-.78,.04,1.51,.16);
  addBox(2.68,2.20,.10,materials.dark,-.78,.04,1.57,.16);

  const screenCanvas = document.createElement('canvas'); screenCanvas.width = 768; screenCanvas.height = 576;
  const screenContext = screenCanvas.getContext('2d');
  const screenTexture = new THREE.CanvasTexture(screenCanvas); screenTexture.colorSpace = THREE.SRGBColorSpace;
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(2.49,2.02), new THREE.MeshBasicMaterial({ map: screenTexture }));
  screen.position.set(-.78,.04,1.635); model.add(screen);
  const screenGlass = new THREE.Mesh(new THREE.PlaneGeometry(2.49,2.02), new THREE.MeshPhysicalMaterial({ color: 0xadbd91, transparent: true, opacity: .06, roughness: .18, metalness: .05, clearcoat: 1 })); screenGlass.position.set(-.78,.04,1.64); model.add(screenGlass);

  function label(text, x,y,w,h,size=26,color='#5c5b47',bg=null) {
    const c = document.createElement('canvas'); c.width = 512; c.height = Math.round(512*h/w);
    const ctx = c.getContext('2d'); if(bg) { ctx.fillStyle = bg; ctx.fillRect(0,0,c.width,c.height); }
    ctx.fillStyle = color; ctx.font = `${size}px monospace`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text,c.width/2,c.height/2);
    const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({ map:tex, transparent:true, depthWrite:false })); plane.position.set(x,y,1.36); model.add(plane); return plane;
  }
  label('THE SIGNAL ROOM',1.77,1.31,1.3,.19,36);
  label('ANALOG OSCILLOSCOPE',-.77,1.47,2.8,.14,22);
  label('SR—01',1.78,1.04,1.1,.26,70);
  label('VOLTS / DIV',1.7,.73,1.28,.14,27);
  label('TIME / DIV',1.7,-.16,1.28,.14,27);
  label('INPUT',1.38,-1.13,.62,.12,28);
  label('POWER',2.20,-1.13,.59,.12,28);
  label('DC     GND     AC',-.78,-1.44,2.8,.13,25);

  function knob(x,y,r) {
    const group = new THREE.Group(); group.position.set(x,y,1.42);
    const ring = new THREE.Mesh(new THREE.CylinderGeometry(r+.055,r+.055,.07,40), materials.brass); ring.rotation.x = Math.PI/2; group.add(ring);
    const body = new THREE.Mesh(new THREE.CylinderGeometry(r,r,.33,48),materials.knob); body.rotation.x = Math.PI/2; body.position.z=.18; body.castShadow=true; group.add(body);
    const face = new THREE.Mesh(new THREE.CylinderGeometry(r*.73,r*.73,.025,48),materials.cream); face.rotation.x=Math.PI/2; face.position.z=.36; group.add(face);
    const tick = box(.028,r*.56,.018,materials.dark,.005); tick.position.set(0,r*.35,.382); group.add(tick);
    for(let i=0;i<20;i++){const a=i*Math.PI*2/20;const groove=box(.026,.08,.29,materials.dark,.004);groove.position.set(Math.sin(a)*(r-.01),Math.cos(a)*(r-.01),.17);groove.rotation.z=-a;group.add(groove);}
    for(let i=0;i<9;i++){const a=(-.8+i*.2)*Math.PI;const dot=box(.014,.035,.012,materials.dark,.003);dot.position.set(Math.sin(a)*(r+.13),Math.cos(a)*(r+.13),-.012);dot.rotation.z=-a;group.add(dot);}
    model.add(group);return group;
  }
  knob(1.72,.25,.28); const frequencyKnob=knob(1.72,-.65,.28);
  knob(1.40,-1.36,.095); knob(2.2,-1.36,.095);
  const ledMaterial = new THREE.MeshStandardMaterial({ color:0xbc673d, emissive:0x6f3316, emissiveIntensity:.7, roughness:.35 });
  const led = new THREE.Mesh(new THREE.SphereGeometry(.045,12,12),ledMaterial);led.position.set(2.45,-1.37,1.41);model.add(led);
  // Panel screws and front handle mounts.
  for(const [x,y] of [[-2.49,1.47],[2.49,1.47],[-2.49,-1.47],[2.49,-1.47]]) {
    const screw = new THREE.Mesh(new THREE.CylinderGeometry(.047,.047,.02,12),materials.trim);screw.rotation.x=Math.PI/2;screw.position.set(x,y,1.36);model.add(screw);
    addBox(.053,.009,.009,materials.dark,x,y,1.375,.001);
  }
  for(const x of [-2.89,2.89]) {
    addBox(.11,2.78,.28,materials.trim,x,.1,-.1,.05);
    const hinge=new THREE.Mesh(new THREE.CylinderGeometry(.18,.18,.08,24),materials.brass); hinge.rotation.z=Math.PI/2;hinge.position.set(x,0,-.1);model.add(hinge);
  }
  addBox(5.96,.13,.29,materials.trim,0,1.46,-.1,.06);
  addBox(2.4,.20,.32,materials.dark,0,1.49,-.1,.06);
  // Four rubber feet and a paper-colored pedestal.
  for(const x of [-2.1,2.1])for(const z of [-1.15,.75]) addBox(.49,.22,.48,materials.rubber,x,-1.9,z,.065);
  const pedestal = new THREE.Mesh(new THREE.CylinderGeometry(4.13,4.13,.15,96),new THREE.MeshStandardMaterial({ color:0xe0d7c1, roughness:.88 })); pedestal.position.y=-2.11;pedestal.receiveShadow=true;scene.add(pedestal);
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(60,60),new THREE.ShadowMaterial({ opacity:.16 }));floor.rotation.x=-Math.PI/2;floor.position.y=-2.2;floor.receiveShadow=true;scene.add(floor);

  let frequency=2.4, on=true, motion=options.motion !== false, phase=0, frame, dragging=false, inView=true;
  let targetRotation={x:0,y:0}, startPointer={x:0,y:0}, baseRotation={x:0,y:0}, lastTime=0;
  const resize = () => { const rect=canvas.getBoundingClientRect(); renderer.setSize(rect.width,rect.height,false);camera.aspect=rect.width/rect.height;camera.updateProjectionMatrix(); render(); };
  const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(canvas);
  const observer=new IntersectionObserver(entries=>{ inView=entries[0].isIntersecting;if(inView)start();else{cancelAnimationFrame(frame);frame=null;} });observer.observe(canvas);

  function drawScreen() {
    const ctx=screenContext,w=screenCanvas.width,h=screenCanvas.height;
    ctx.fillStyle=on?'#263b2e':'#263129';ctx.fillRect(0,0,w,h);
    const gradient=ctx.createRadialGradient(w/2,h/2,10,w/2,h/2,w*.65);gradient.addColorStop(0,on?'rgba(124,151,86,.18)':'rgba(60,70,54,.1)');gradient.addColorStop(1,'rgba(9,19,14,.6)');ctx.fillStyle=gradient;ctx.fillRect(0,0,w,h);
    ctx.strokeStyle=on?'rgba(160,180,113,.22)':'rgba(160,180,113,.07)';ctx.lineWidth=1;
    for(let x=32;x<w;x+=64){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke();}
    for(let y=32;y<h;y+=64){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke();}
    ctx.setLineDash([4,7]);ctx.strokeStyle='rgba(195,211,134,.4)';ctx.beginPath();ctx.moveTo(w/2,0);ctx.lineTo(w/2,h);ctx.moveTo(0,h/2);ctx.lineTo(w,h/2);ctx.stroke();ctx.setLineDash([]);
    if(on) {
      ctx.shadowColor='#d4e899';ctx.shadowBlur=17;ctx.strokeStyle='#d1df95';ctx.lineWidth=4;ctx.beginPath();
      for(let x=0;x<=w;x+=2){const y=h/2+Math.sin((x/w)*Math.PI*2*frequency+phase)*h*.26+Math.sin((x/w)*Math.PI*2*frequency*2+phase)*h*.015;if(x===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);}ctx.stroke();ctx.shadowBlur=0;
      ctx.fillStyle='#b6c984';ctx.font='19px monospace';ctx.fillText('CH 1',26,35);ctx.fillText(`${frequency.toFixed(1)} Hz`,w-140,35);ctx.font='15px monospace';ctx.fillStyle='#839264';ctx.fillText('DC  /  2 V',26,h-22);ctx.fillText('SIGNAL FOUND',w-166,h-22);
    }
    // Fine CRT scan lines.
    ctx.fillStyle='rgba(8,14,10,.11)';for(let y=0;y<h;y+=4)ctx.fillRect(0,y,w,1);
    screenTexture.needsUpdate=true;
  }
  function render() { drawScreen();renderer.render(scene,camera); }
  function animate(time) {
    frame=null;if(!inView||document.hidden)return;
    const dt=Math.min((time-lastTime)/1000,.05);lastTime=time;
    if(motion) {phase+=dt*.6;instrument.position.y=Math.sin(time*.00065)*.065;instrument.rotation.x+=(targetRotation.x-instrument.rotation.x)*.09;instrument.rotation.y+=(targetRotation.y-instrument.rotation.y)*.09;}
    else {instrument.position.y=0;instrument.rotation.x=targetRotation.x;instrument.rotation.y=targetRotation.y;}
    render();if(motion)frame=requestAnimationFrame(animate);
  }
  function start(){if(!frame&&inView&&!document.hidden){lastTime=performance.now();frame=requestAnimationFrame(animate);}}
  canvas.addEventListener('pointerdown',e=>{dragging=true;canvas.setPointerCapture(e.pointerId);startPointer={x:e.clientX,y:e.clientY};baseRotation={...targetRotation};canvas.classList.add('dragging');});
  canvas.addEventListener('pointermove',e=>{if(!dragging)return;targetRotation.y=THREE.MathUtils.clamp(baseRotation.y+(e.clientX-startPointer.x)*.006,-1.05,1.05);targetRotation.x=THREE.MathUtils.clamp(baseRotation.x+(e.clientY-startPointer.y)*.004,-.35,.35);start();});
  const endDrag=()=>{dragging=false;canvas.classList.remove('dragging');};canvas.addEventListener('pointerup',endDrag);canvas.addEventListener('pointercancel',endDrag);
  document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(frame);frame=null;}else start();});
  resize();start();
  return {
    setFrequency(value){frequency=value;frequencyKnob.rotation.z=(value-2.4)*.6;start();},
    setPower(value){on=value;ledMaterial.emissiveIntensity=value ? .7 : 0;start();},
    setMotion(value){motion=value;if(!value){cancelAnimationFrame(frame);frame=null;instrument.position.y=0;}start();},
    reset(){targetRotation={x:0,y:0};start();},
  };
}
