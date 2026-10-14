import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

export async function createInstrument(canvas, options = {}) {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.8));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.shadowMap.autoUpdate = false;
  renderer.shadowMap.needsUpdate = true;
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
  addBox(5.6,3.6,2.8,materials.shell,0,0,-.2,.17).userData.assembly='housing';
  addBox(5.37,3.34,.12,materials.trim,0,0,1.21,.09).userData.assembly='panel';
  addBox(5.24,3.20,.10,materials.cream,0,0,1.29,.09).userData.assembly='panel';
  // Vented side housing, with distinct depth and metalwork.
  for(let i=0;i<11;i++) addBox(.032,.98,.07,materials.dark,2.81,.34,-1.1+i*.145,.009);
  for(let i=0;i<4;i++) addBox(.45,.035,.08,materials.trim,2.81,-1.06+i*.11,.0,.007).rotation.y = Math.PI/2;
  addBox(3.11,2.65,.18,materials.dark,-.78,.04,1.4,.17).userData.assembly='screen';
  addBox(2.86,2.39,.10,materials.trim,-.78,.04,1.51,.16).userData.assembly='screen';
  addBox(2.68,2.20,.10,materials.dark,-.78,.04,1.57,.16).userData.assembly='screen';

  const screenCanvas = document.createElement('canvas'); screenCanvas.width = 768; screenCanvas.height = 576;
  const screenContext = screenCanvas.getContext('2d');
  const screenTexture = new THREE.CanvasTexture(screenCanvas); screenTexture.colorSpace = THREE.SRGBColorSpace;
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(2.49,2.02), new THREE.MeshBasicMaterial({ map: screenTexture }));
  screen.position.set(-.78,.04,1.635); screen.userData.assembly='screen'; model.add(screen);
  const screenGlass = new THREE.Mesh(new THREE.PlaneGeometry(2.49,2.02), new THREE.MeshPhysicalMaterial({ color: 0xadbd91, transparent: true, opacity: .06, roughness: .18, metalness: .05, clearcoat: 1 })); screenGlass.position.set(-.78,.04,1.64); screenGlass.userData.assembly='screen'; model.add(screenGlass);

  function label(text, x,y,w,h,size=26,color='#5c5b47',bg=null) {
    const c = document.createElement('canvas'); c.width = 512; c.height = Math.round(512*h/w);
    const ctx = c.getContext('2d'); if(bg) { ctx.fillStyle = bg; ctx.fillRect(0,0,c.width,c.height); }
    ctx.fillStyle = color; ctx.font = `${size}px monospace`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text,c.width/2,c.height/2);
    const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({ map:tex, transparent:true, depthWrite:false })); plane.position.set(x,y,1.36); plane.userData.assembly='label'; model.add(plane); return plane;
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
    group.userData.assembly='knob'; model.add(group);return group;
  }
  knob(1.72,.25,.28); const frequencyKnob=knob(1.72,-.65,.28);
  frequencyKnob.userData.control = "frequency";
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
  for(const x of [-2.1,2.1])for(const z of [-1.15,.75]) addBox(.49,.22,.48,materials.rubber,x,-1.9,z,.065).userData.assembly='base';
  const pedestal = new THREE.Mesh(new THREE.CylinderGeometry(4.13,4.13,.15,96),new THREE.MeshStandardMaterial({ color:0xd5d5bc, roughness:.88 })); pedestal.position.y=-2.11;pedestal.receiveShadow=true;scene.add(pedestal);
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(60,60),new THREE.ShadowMaterial({ opacity:.16 }));floor.rotation.x=-Math.PI/2;floor.position.y=-2.2;floor.receiveShadow=true;scene.add(floor);

  const assemblyTiming={
    housing:{delay:0,z:-.5,y:.12,scale:.96},
    panel:{delay:.12,z:.6,y:0,scale:.96},
    screen:{delay:.24,z:.75,y:.05,scale:.92},
    knob:{delay:.42,z:.8,y:0,scale:.82},
    label:{delay:.58,z:.16,y:0,scale:1},
    hardware:{delay:.28,z:.28,y:.1,scale:.94},
  };
  const assemblyParts=model.children.filter(part=>part.userData.assembly!=='base').map((part,index)=>({
    part,position:part.position.clone(),scale:part.scale.clone(),
    timing:{...assemblyTiming[part.userData.assembly||'hardware'],stagger:(index%4)*.025},
  }));
  let assemblyPrepared=false,assemblyActive=false,assemblyTime=0;
  let targetScroll=0,scrollDepth=0;
  function finishEntrance(){
    assemblyParts.forEach(({part,position,scale})=>{part.visible=true;part.position.copy(position);part.scale.copy(scale);});
    assemblyPrepared=false;assemblyActive=false;renderer.shadowMap.needsUpdate=true;
  }
  function updateEntrance(dt){
    if(!assemblyActive)return;
    assemblyTime+=dt;
    let complete=true;
    assemblyParts.forEach(({part,position,scale,timing})=>{
      const progress=THREE.MathUtils.clamp((assemblyTime-timing.delay-timing.stagger)/.85,0,1);
      const eased=1-(1-progress)**3;
      part.visible=progress>0;
      part.position.set(position.x,position.y+timing.y*(1-eased),position.z+timing.z*(1-eased));
      part.scale.copy(scale).multiplyScalar(THREE.MathUtils.lerp(timing.scale,1,eased));
      if(progress<1)complete=false;
    });
    renderer.shadowMap.needsUpdate=true;
    if(complete)finishEntrance();
  }

  let frequency=2.4, targetFrequency=2.4, powerLevel=1, on=true;
  let waveform='sine', previousWaveform='sine', waveformMix=1;
  let motion=options.motion!==false, phase=0, frame=null, dragging=false, inView=true;
  let dragMode='case', lastTime=0, lastScreenTime=0, dragTime=0;
  let targetRotation={x:0,y:0}, velocity={x:0,y:0};
  let startPointer={x:0,y:0}, lastPointer={x:0,y:0}, baseRotation={x:0,y:0}, baseFrequency=2.4;
  const raycaster=new THREE.Raycaster();
  const pointer=new THREE.Vector2();
  const damp=(from,to,speed,dt)=>THREE.MathUtils.lerp(from,to,1-Math.exp(-speed*dt));

  function signal(angle,type){
    if(type==='triangle')return Math.asin(Math.sin(angle))*2/Math.PI;
    if(type==='square')return Math.tanh(Math.sin(angle)*14);
    return Math.sin(angle);
  }
  function drawScreen(){
    const ctx=screenContext,w=screenCanvas.width,h=screenCanvas.height;
    ctx.fillStyle='#26362b';ctx.fillRect(0,0,w,h);
    const gradient=ctx.createRadialGradient(w/2,h/2,10,w/2,h/2,w*.65);
    gradient.addColorStop(0,`rgba(124,151,86,${.05+powerLevel*.13})`);
    gradient.addColorStop(1,'rgba(9,19,14,.6)');ctx.fillStyle=gradient;ctx.fillRect(0,0,w,h);
    ctx.strokeStyle=`rgba(160,180,113,${.06+powerLevel*.16})`;ctx.lineWidth=1;
    for(let x=32;x<w;x+=64){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke();}
    for(let y=32;y<h;y+=64){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke();}
    ctx.setLineDash([4,7]);ctx.strokeStyle=`rgba(195,211,134,${.08+powerLevel*.25})`;
    ctx.beginPath();ctx.moveTo(w/2,0);ctx.lineTo(w/2,h);ctx.moveTo(0,h/2);ctx.lineTo(w,h/2);ctx.stroke();ctx.setLineDash([]);
    if(powerLevel>.015){
      ctx.globalAlpha=powerLevel;ctx.shadowColor='#d4e899';ctx.shadowBlur=12;
      ctx.strokeStyle='#cbd88e';ctx.lineWidth=3;ctx.beginPath();
      for(let x=0;x<=w;x+=2){
        const angle=(x/w)*Math.PI*2*frequency+phase;
        const shape=THREE.MathUtils.lerp(signal(angle,previousWaveform),signal(angle,waveform),waveformMix);
        const y=h/2+shape*h*.26*powerLevel**2;
        if(x===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
      }
      ctx.stroke();ctx.shadowBlur=0;
      ctx.fillStyle='#b6c984';ctx.font='19px monospace';ctx.fillText('CH 1',26,35);ctx.fillText(`${frequency.toFixed(1)} Hz`,w-140,35);
      ctx.font='15px monospace';ctx.fillStyle='#839264';ctx.fillText(waveform.toUpperCase(),26,h-22);ctx.fillText('SR–01 / INPUT A',w-205,h-22);
      ctx.globalAlpha=1;
    }
    ctx.fillStyle='rgba(8,14,10,.11)';for(let y=0;y<h;y+=4)ctx.fillRect(0,y,w,1);
    screenTexture.needsUpdate=true;
  }
  function render(updateScreen=true){if(updateScreen)drawScreen();renderer.render(scene,camera);}
  function animate(time){
    frame=null;if(!inView||document.hidden)return;
    const dt=THREE.MathUtils.clamp((time-lastTime)/1000,.001,.05);lastTime=time;
    if(motion){
      phase+=dt*.55;
      frequency=damp(frequency,targetFrequency,12,dt);
      powerLevel=damp(powerLevel,on?1:0,on?5:13,dt);
      waveformMix=damp(waveformMix,1,10,dt);
      if(!dragging){
        targetRotation.x=THREE.MathUtils.clamp(targetRotation.x+velocity.x*dt,-.35,.35);
        targetRotation.y=THREE.MathUtils.clamp(targetRotation.y+velocity.y*dt,-1.45,1.45);
        velocity.x*=Math.exp(-8*dt);velocity.y*=Math.exp(-8*dt);
      }
    }else{frequency=targetFrequency;powerLevel=on?1:0;waveformMix=1;velocity={x:0,y:0};}
    if(assemblyActive){if(motion)updateEntrance(dt);else finishEntrance();}
    scrollDepth=motion?damp(scrollDepth,targetScroll,9,dt):0;
    camera.position.set(7.8,5.1+scrollDepth*.7,12.8+scrollDepth*.45);
    camera.lookAt(0,-.25+scrollDepth*.18,0);
    const oldX=instrument.rotation.x,oldY=instrument.rotation.y;
    instrument.rotation.x=motion?damp(oldX,targetRotation.x,15,dt):targetRotation.x;
    instrument.rotation.y=motion?damp(oldY,targetRotation.y,15,dt):targetRotation.y;
    if(Math.abs(oldX-instrument.rotation.x)+Math.abs(oldY-instrument.rotation.y)>.0001)renderer.shadowMap.needsUpdate=true;
    frequencyKnob.rotation.z=(frequency-2.4)*.6;
    ledMaterial.emissiveIntensity=powerLevel*.65;
    const updateScreen=!motion||time-lastScreenTime>1000/30;
    if(updateScreen)lastScreenTime=time;
    render(updateScreen);
    if(motion)frame=requestAnimationFrame(animate);
  }
  function start(){if(frame===null&&inView&&!document.hidden){lastTime=performance.now();frame=requestAnimationFrame(animate);}}
  function setFrequency(value,notify=false){
    targetFrequency=THREE.MathUtils.clamp(value,1,5);
    if(notify)options.onFrequencyChange?.(targetFrequency);
    start();
  }
  function overDial(e){
    const rect=canvas.getBoundingClientRect();
    pointer.set((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1);
    raycaster.setFromCamera(pointer,camera);
    return raycaster.intersectObject(frequencyKnob,true).length>0;
  }
  canvas.addEventListener('pointerdown',e=>{
    if(e.button!==0)return;
    if(assemblyActive||assemblyPrepared){finishEntrance();model.updateMatrixWorld(true);}
    dragging=true;canvas.setPointerCapture(e.pointerId);
    dragMode=overDial(e)?'frequency':'case';
    startPointer={x:e.clientX,y:e.clientY};lastPointer={...startPointer};
    baseRotation={...targetRotation};baseFrequency=targetFrequency;
    velocity={x:0,y:0};dragTime=performance.now();
    canvas.classList.add('dragging');canvas.style.cursor=dragMode==='frequency'?'ns-resize':'grabbing';
  });
  canvas.addEventListener('pointermove',e=>{
    if(!dragging){canvas.style.cursor=overDial(e)?'ns-resize':'grab';return;}
    const now=performance.now(),dt=Math.max((now-dragTime)/1000,.008);
    if(dragMode==='frequency')setFrequency(Math.round((baseFrequency+(startPointer.y-e.clientY)*.025)*10)/10,true);
    else{
      targetRotation.y=THREE.MathUtils.clamp(baseRotation.y+(e.clientX-startPointer.x)*.006,-1.45,1.45);
      targetRotation.x=THREE.MathUtils.clamp(baseRotation.x+(e.clientY-startPointer.y)*.004,-.35,.35);
      velocity.y=THREE.MathUtils.clamp((e.clientX-lastPointer.x)*.006/dt,-1.5,1.5);
      velocity.x=THREE.MathUtils.clamp((e.clientY-lastPointer.y)*.004/dt,-.7,.7);
    }
    lastPointer={x:e.clientX,y:e.clientY};dragTime=now;start();
  });
  function endDrag(){
    if(performance.now()-dragTime>80)velocity={x:0,y:0};
    dragging=false;canvas.classList.remove('dragging');canvas.style.cursor='grab';start();
  }
  canvas.addEventListener('pointerup',endDrag);
  canvas.addEventListener('pointercancel',()=>{velocity={x:0,y:0};endDrag();});
  canvas.addEventListener('lostpointercapture',endDrag);
  canvas.addEventListener('keydown',e=>{
    const keys=['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home'];if(!keys.includes(e.key))return;
    e.preventDefault();velocity={x:0,y:0};
    if(assemblyActive||assemblyPrepared)finishEntrance();
    if(e.key==='Home')targetRotation={x:0,y:0};
    if(e.key==='ArrowLeft')targetRotation.y=THREE.MathUtils.clamp(targetRotation.y-.15,-1.45,1.45);
    if(e.key==='ArrowRight')targetRotation.y=THREE.MathUtils.clamp(targetRotation.y+.15,-1.45,1.45);
    if(e.key==='ArrowUp')targetRotation.x=THREE.MathUtils.clamp(targetRotation.x-.1,-.35,.35);
    if(e.key==='ArrowDown')targetRotation.x=THREE.MathUtils.clamp(targetRotation.x+.1,-.35,.35);
    start();
  });
  const resize=()=>{
    const rect=canvas.getBoundingClientRect();if(!rect.width||!rect.height)return;
    renderer.setSize(rect.width,rect.height,false);camera.aspect=rect.width/rect.height;camera.updateProjectionMatrix();
    renderer.shadowMap.needsUpdate=true;render();
  };
  // Warm the shader programs while the loading paper is still covering the page.
  // Installing observers afterwards prevents an eager resize render from compiling synchronously.
  const initialBounds=canvas.getBoundingClientRect();
  renderer.setSize(Math.max(1,initialBounds.width),Math.max(1,initialBounds.height),false);
  camera.aspect=Math.max(1,initialBounds.width)/Math.max(1,initialBounds.height);camera.updateProjectionMatrix();
  drawScreen();
  try{await renderer.compileAsync(scene,camera);}catch(error){renderer.dispose();throw error;}
  const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(canvas);
  const observer=new IntersectionObserver(entries=>{
    inView=entries[0].isIntersecting;
    if(inView)start();else{cancelAnimationFrame(frame);frame=null;velocity={x:0,y:0};}
  });observer.observe(canvas);
  document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(frame);frame=null;velocity={x:0,y:0};}else start();});
  resize();start();
  return{
    setFrequency,
    setWaveform(value){if(!['sine','triangle','square'].includes(value)||value===waveform)return;previousWaveform=waveform;waveform=value;waveformMix=motion?0:1;start();},
    setPower(value){on=Boolean(value);start();},
    setMotion(value){motion=value;if(!motion)finishEntrance();cancelAnimationFrame(frame);frame=null;start();},
    setScrollProgress(value){targetScroll=motion?THREE.MathUtils.clamp(value,0,1):0;start();},
    prepareEntrance(){if(!motion)return;assemblyPrepared=true;assemblyTime=0;assemblyParts.forEach(({part})=>{part.visible=false;});renderer.shadowMap.needsUpdate=true;start();},
    enter(){if(!motion){finishEntrance();start();return;}if(!assemblyPrepared)return;assemblyTime=0;assemblyActive=true;start();},
    reset(){targetRotation={x:0,y:0};velocity={x:0,y:0};start();},
  };
}
