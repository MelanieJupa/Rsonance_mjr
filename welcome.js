(() => {
 if(location.hash==='#experiencia'){location.replace('experiencia.html');return;}
 const canvas=document.querySelector('#welcome-light'),ctx=canvas.getContext('2d'),reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 let w=0,h=0,time=0,last=0;
 const random=n=>{const v=Math.sin(n*127.1+311.7)*43758.5453;return v-Math.floor(v);};
 const bands=[{a:-.45,rx:.39,ry:.15},{a:.6,rx:.32,ry:.18},{a:1.43,rx:.3,ry:.1},{a:-.15,rx:.48,ry:.085}];
 const dust=Array.from({length:160},(_,i)=>({x:random(i),y:random(i+700),a:.08+random(i+900)*.25}));
 const seeds=Array.from({length:1600},(_,i)=>({phase:random(i+2000),offset:(random(i+4000)-.5)*.016,size:.5+random(i+6000)*1.1,alpha:.15+random(i+7000)*.55}));
 const sprite=document.createElement('canvas');sprite.width=sprite.height=48;const s=sprite.getContext('2d'),gradient=s.createRadialGradient(24,24,0,24,24,24);gradient.addColorStop(0,'rgba(223,234,255,1)');gradient.addColorStop(.18,'rgba(102,145,255,.8)');gradient.addColorStop(1,'rgba(38,77,255,0)');s.fillStyle=gradient;s.fillRect(0,0,48,48);
 function resize(){const box=canvas.getBoundingClientRect();w=box.width;h=box.height;const d=Math.min(devicePixelRatio||1,2);canvas.width=w*d;canvas.height=h*d;ctx.setTransform(d,0,0,d,0,0);}new ResizeObserver(resize).observe(canvas);resize();
 function point(b,a,offset=0){const m=Math.min(w,h),x=Math.cos(a)*(m*b.rx+offset*m),y=Math.sin(a)*(m*b.ry+offset*m*.4);return{x:x*Math.cos(b.a)-y*Math.sin(b.a),y:x*Math.sin(b.a)+y*Math.cos(b.a)};}
 function frame(now){requestAnimationFrame(frame);const dt=Math.min((now-last)/1000,.04);last=now;if(!reduced&&!document.hidden)time+=dt;ctx.clearRect(0,0,w,h);for(const d of dust){ctx.fillStyle=`rgba(91,131,221,${d.a})`;ctx.fillRect(d.x*w,d.y*h,1,1);}const mobile=w<600,cx=w*(mobile?.67:.78),cy=h*(mobile?.78:.48),m=Math.min(w,h);ctx.save();ctx.translate(cx,cy);bands.forEach((b,i)=>{for(let n=0;n<400;n++){const seed=seeds[i*400+n],a=seed.phase*Math.PI*2+time*.017,p=point(b,a,seed.offset),r=seed.size*3;ctx.globalAlpha=seed.alpha;ctx.drawImage(sprite,p.x-r,p.y-r,r*2,r*2);}});ctx.globalAlpha=1;const halo=ctx.createRadialGradient(0,0,0,0,0,m*.23);halo.addColorStop(0,'rgba(109,153,255,.34)');halo.addColorStop(.3,'rgba(40,81,255,.15)');halo.addColorStop(1,'rgba(20,45,255,0)');ctx.fillStyle=halo;ctx.fillRect(-m*.23,-m*.23,m*.46,m*.46);const tall=m*(mobile?.105:.13),wide=tall*.53;ctx.beginPath();ctx.moveTo(0,-tall);ctx.bezierCurveTo(4,-8,8,-4,wide,0);ctx.bezierCurveTo(8,4,4,8,0,tall);ctx.bezierCurveTo(-4,8,-8,4,-wide,0);ctx.bezierCurveTo(-8,-4,-4,-8,0,-tall);ctx.fillStyle='#e5eeff';ctx.shadowColor='#537eff';ctx.shadowBlur=27;ctx.fill();ctx.restore();}
 requestAnimationFrame(frame);
 document.querySelector('.enter').addEventListener('click',event=>{if(reduced||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;event.preventDefault();document.body.classList.add('leaving');setTimeout(()=>location.assign(event.currentTarget?.href||'experiencia.html'),320);});
})();
