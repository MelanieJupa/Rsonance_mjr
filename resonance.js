(() => {
 const canvas=document.querySelector('#universe'),ctx=canvas.getContext('2d');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 let w=0,h=0,time=0,last=0,paused=reduced,pulseStart=-100,hovered=-1,audioWave=0;
 const paths=[
  [[-.62,.2],[-.8,-.64],[.75,-.49],[0,0]],
  [[.7,-.66],[.9,.53],[-.38,.2],[0,0]],
  [[-.65,-.75],[.1,.71],[.92,-.26],[0,0]],
  [[.7,.3],[.66,-.65],[-.54,-.26],[0,0]],
  [[-.32,.75],[-.86,-.23],[.57,-.12],[0,0]],
  [[.28,-.8],[-.66,-.58],[-.22,.49],[0,0]],
  [[-.8,-.12],[-.7,.41],[.65,.24],[0,0]],
  [[.7,.65],[-.58,.65],[.18,-.58],[0,0]]
 ];
 const random=n=>{const x=Math.sin(n*127.1+311.7)*43758.5453;return x-Math.floor(x);};
 function point(path,t){const a=1-t;return {x:(a*a*a*path[0][0]+3*a*a*t*path[1][0]+3*a*t*t*path[2][0])*w+w*.5,y:(a*a*a*path[0][1]+3*a*a*t*path[1][1]+3*a*t*t*path[2][1])*h+h*.5};}
 const bands=paths.map((path,i)=>({path,points:[],particles:Array.from({length:Math.round(window.staySongs[i].views/500000)},(_,j)=>({phase:random(j+i*9000),offset:(random(j+i*9000+500)-.5),size:.45+random(j+i*9000+1100)*1.2,brightness:.18+Math.pow(random(j+i*9000+2200),2)*.82}))}));
 const blues=[[55,91,255],[90,151,255],[42,66,215],[137,172,255],[49,112,246],[103,119,255],[45,76,235],[173,198,255]];
 function lightTexture(rgb){const c=document.createElement('canvas');c.width=c.height=64;const x=c.getContext('2d'),g=x.createRadialGradient(32,32,0,32,32,32);g.addColorStop(0,'rgba(246,250,255,1)');g.addColorStop(.12,`rgba(${rgb.join(',')},.9)`);g.addColorStop(.35,`rgba(${rgb.join(',')},.4)`);g.addColorStop(1,`rgba(${rgb.join(',')},0)`);x.fillStyle=g;x.fillRect(0,0,64,64);return c;}const lights=blues.map(lightTexture);
 function resize(){const box=canvas.getBoundingClientRect();w=box.width;h=box.height;const d=Math.min(devicePixelRatio||1,2);canvas.width=w*d;canvas.height=h*d;ctx.setTransform(d,0,0,d,0,0);bands.forEach(b=>{const raw=Array.from({length:1001},(_,j)=>point(b.path,j/1000)),distance=[0];for(let j=1;j<raw.length;j++)distance.push(distance[j-1]+Math.hypot(raw[j].x-raw[j-1].x,raw[j].y-raw[j-1].y));b.length=distance[1000];let n=1;b.points=Array.from({length:321},(_,j)=>{const target=j/320*b.length;while(n<1000&&distance[n]<target)n++;const f=(target-distance[n-1])/(distance[n]-distance[n-1]||1);return{x:raw[n-1].x+(raw[n].x-raw[n-1].x)*f,y:raw[n-1].y+(raw[n].y-raw[n-1].y)*f};});});}new ResizeObserver(resize).observe(canvas);resize();
 function draw(now){requestAnimationFrame(draw);const dt=Math.min((now-last)/1000,.04);last=now;if(!paused&&!document.hidden)time+=dt;ctx.clearRect(0,0,w,h);const targetWave=!reduced&&window.stayIsPlaying?Math.min(1,window.stayAudioLevel||0):0;audioWave+=(targetWave-audioWave)*Math.min(1,dt*6);const age=time-pulseStart,surge=age>=0&&age<5?Math.sin(Math.min(1,age/.55)*Math.PI/2)*(1-age/5):0;
  for(const [i,b]of bands.entries()){
   const active=hovered===i;
   for(const star of b.particles){const t=(star.phase+time*8/b.length)%1,index=Math.min(319,Math.floor(t*320)),a=b.points[index],bnext=b.points[index+1],dx=bnext.x-a.x,dy=bnext.y-a.y,len=Math.hypot(dx,dy)||1;const envelope=Math.sin(Math.PI*t),wave=audioWave*(window.stayPlayingIndex===i?1:0)*(Math.sin(t*72-time*5.5+i*.7)*5+Math.sin(t*119-time*8)*2.5)*envelope;const spread=star.offset*(8+Math.min(w,h)*.032)*envelope+wave;const fraction=t*320-index,x=a.x+dx*fraction-dy/len*spread,y=a.y+dy*fraction+dx/len*spread;const size=star.size*(active?4.4:3.5)*(star.brightness>.8?1.35:1)*(1+surge*.75);ctx.globalAlpha=Math.min(1,(active?1:.85)*star.brightness*(Math.min(1,t*8))*(1-t*.36)*(1+surge*3));ctx.drawImage(lights[i],x-size,y-size,size*2,size*2);}
  }ctx.globalAlpha=1;
  const glow=reduced?1:1+Math.sin(time*.65)*.065;const x=w*.5,y=h*.5,r=Math.min(w,h),halo=ctx.createRadialGradient(x,y,0,x,y,r*.23);halo.addColorStop(0,`rgba(207,224,255,${.45*glow})`);halo.addColorStop(.12,`rgba(96,136,255,${.34*glow})`);halo.addColorStop(.42,'rgba(33,74,255,.14)');halo.addColorStop(1,'rgba(20,50,255,0)');ctx.fillStyle=halo;ctx.fillRect(x-r*.23,y-r*.23,r*.46,r*.46);
  ctx.save();ctx.translate(x,y);const breath=reduced?1:1+Math.sin(time*.7)*.008;ctx.scale(breath,breath);ctx.beginPath();const tall=Math.min(85,r*.115),wide=tall*.56;ctx.moveTo(0,-tall);ctx.bezierCurveTo(3,-8,5,-5,wide,0);ctx.bezierCurveTo(5,5,3,8,0,tall);ctx.bezierCurveTo(-3,8,-5,5,-wide,0);ctx.bezierCurveTo(-5,-5,-3,-8,0,-tall);ctx.fillStyle='#eff5ff';ctx.shadowColor='#8db2ff';ctx.shadowBlur=24*glow+surge*12;ctx.fill();ctx.restore();
 }
 function findOrbit(x,y){if(Math.hypot(x-w*.5,y-h*.5)<42)return -1;let best=20,index=-1;bands.forEach((b,i)=>{for(let n=2;n<310;n+=2){const p=b.points[n],d=Math.hypot(x-p.x,y-p.y);if(d<best){best=d;index=i;}}});return index;}
 function move(e){const box=canvas.getBoundingClientRect(),x=e.clientX-box.left,y=e.clientY-box.top;hovered=findOrbit(x,y);const core=Math.hypot(x-w*.5,y-h*.5)<42;canvas.style.cursor=core||hovered>=0?'pointer':'default';window.stayOrbitInfo(hovered,x,y);window.stayHover(hovered);}
 canvas.addEventListener('pointermove',move);canvas.addEventListener('pointerleave',()=>{hovered=-1;window.stayOrbitInfo(-1);window.stayHover(-1);});
 canvas.addEventListener('click',e=>{const box=canvas.getBoundingClientRect(),x=e.clientX-box.left,y=e.clientY-box.top;if(Math.hypot(x-w*.5,y-h*.5)<42){pulseStart=time;window.stayEnableAudio();}else if(e.pointerType==='touch'){const i=findOrbit(x,y);if(i>=0){window.stayEnableAudio();window.staySelect(i);window.stayOrbitInfo(i,x,y);}}});
 canvas.addEventListener('keydown',e=>{if(e.key===' '||e.key==='Enter'){e.preventDefault();pulseStart=time;window.stayEnableAudio();}else if(/^[1-8]$/.test(e.key)){window.stayEnableAudio();window.staySelect(Number(e.key)-1);window.stayOrbitInfo(Number(e.key)-1);}});
 const motion=document.querySelector('#motion');function label(){motion.innerHTML=paused?'<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M6 3.5L16 10 6 16.5Z" fill="currentColor"/></svg><span class="pause-caption">Reanudar</span>':'<svg viewBox="0 0 20 20" aria-hidden="true"><rect x="5" y="4" width="3.5" height="12" rx="1" fill="currentColor"/><rect x="11.5" y="4" width="3.5" height="12" rx="1" fill="currentColor"/></svg><span class="pause-caption">Pausar</span>';motion.title=paused?'Reanudar animación':'Pausar animación';motion.setAttribute('aria-label',paused?'Activar animación':'Pausar animación');motion.setAttribute('aria-pressed',String(paused));}motion.onclick=()=>{paused=!paused;label();};label();
 document.querySelector('#fullscreen').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.querySelector('.universe-wrap').requestFullscreen();}catch{}};
 requestAnimationFrame(draw);
})();
