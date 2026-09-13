const loader=document.getElementById('loader');
window.addEventListener('load',()=>setTimeout(()=>loader.classList.add('done'),1900));
document.getElementById('year').textContent=new Date().getFullYear();

const header=document.querySelector('.site-header');
const glow=document.querySelector('.cursor-glow');
window.addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>40),{passive:true});
window.addEventListener('pointermove',e=>{
  glow.style.left=e.clientX+'px'; glow.style.top=e.clientY+'px';
});

const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')});
},{threshold:.12});
document.querySelectorAll('.reveal').forEach((el,i)=>{
  el.style.transitionDelay=(Math.min(i%4,3)*70)+'ms';
  observer.observe(el);
});

// Original BL4CK FYR3 MAGYR0N particle field: a slowly evolving 3D research core.
const canvas=document.getElementById('labCanvas');
let renderer,scene,camera,points,outerPoints,ringGroup;
const mouse={x:0,y:0,tx:0,ty:0};
let targetScroll=0, smoothScroll=0;
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function fibonacciSphere(n,r){
  const arr=new Float32Array(n*3), phi=Math.PI*(3-Math.sqrt(5));
  for(let i=0;i<n;i++){
    const y=1-(i/(n-1))*2;
    const rr=Math.sqrt(Math.max(0,1-y*y));
    const t=phi*i;
    arr[i*3]=Math.cos(t)*rr*r;
    arr[i*3+1]=y*r;
    arr[i*3+2]=Math.sin(t)*rr*r;
  }
  return arr;
}
function initLab(){
  if(!window.THREE)return;
  renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true});
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));
  renderer.setSize(innerWidth,innerHeight);
  scene=new THREE.Scene();
  camera=new THREE.PerspectiveCamera(42,innerWidth/innerHeight,.1,100);
  camera.position.set(0,0,8);

  const count=innerWidth<700?4200:9000;
  const base=fibonacciSphere(count,2.55);
  const positions=new Float32Array(base.length);
  const colors=new Float32Array(count*3);
  const sizes=new Float32Array(count);
  const c1=new THREE.Color('#35e7ff'), c2=new THREE.Color('#8c6cff');
  for(let i=0;i<count;i++){
    positions[i*3]=base[i*3]; positions[i*3+1]=base[i*3+1]; positions[i*3+2]=base[i*3+2];
    const mix=(base[i*1+1]/5)+.5; // deterministic field variation
    const c=c1.clone().lerp(c2,Math.max(0,Math.min(1,mix)));
    colors[i*3]=c.r;colors[i*3+1]=c.g;colors[i*3+2]=c.b;sizes[i]=.65+Math.random()*1.7;
  }
  const geo=new THREE.BufferGeometry();
  geo.setAttribute('position',new THREE.BufferAttribute(positions,3));
  geo.setAttribute('color',new THREE.BufferAttribute(colors,3));
  geo.setAttribute('size',new THREE.BufferAttribute(sizes,1));
  const mat=new THREE.PointsMaterial({size:.025,vertexColors:true,transparent:true,opacity:.7,blending:THREE.AdditiveBlending,depthWrite:false});
  points=new THREE.Points(geo,mat);scene.add(points);

  const outerGeo=new THREE.BufferGeometry();
  outerGeo.setAttribute('position',new THREE.BufferAttribute(fibonacciSphere(Math.floor(count*.35),3.15),3));
  const outerMat=new THREE.PointsMaterial({color:c1,size:.018,transparent:true,opacity:.25,blending:THREE.AdditiveBlending,depthWrite:false});
  outerPoints=new THREE.Points(outerGeo,outerMat);scene.add(outerPoints);

  ringGroup=new THREE.Group();
  [[3.1,.22,.08],[3.45,.16,.12],[2.85,.12,-.14]].forEach((d,i)=>{
    const g=new THREE.TorusGeometry(d[0],d[1],8,160);
    const m=new THREE.MeshBasicMaterial({color:i===1?0x8c6cff:0x35e7ff,transparent:true,opacity:.14,blending:THREE.AdditiveBlending});
    const mesh=new THREE.Mesh(g,m);mesh.rotation.x=d[2];mesh.rotation.z=i*.8;ringGroup.add(mesh);
  });
  scene.add(ringGroup);
  addEventListener('resize',resize);
  addEventListener('pointermove',e=>{mouse.tx=(e.clientX/innerWidth-.5);mouse.ty=(e.clientY/innerHeight-.5)});
  addEventListener('scroll',()=>targetScroll=scrollY/(document.body.scrollHeight-innerHeight),{passive:true});
  animate();
}
function resize(){if(!renderer)return;renderer.setSize(innerWidth,innerHeight);camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix()}
function animate(){
  requestAnimationFrame(animate);
  if(reduced){renderer.render(scene,camera);return}
  mouse.x+=(mouse.tx-mouse.x)*.035;mouse.y+=(mouse.ty-mouse.y)*.035;
  smoothScroll+=(targetScroll-smoothScroll)*.045;
  const t=performance.now()*.00025;
  points.rotation.y=t*.55+mouse.x*.3;
  points.rotation.x=Math.sin(t*.7)*.12+mouse.y*.18;
  outerPoints.rotation.y=-t*.25-mouse.x*.2;
  outerPoints.rotation.x=-mouse.y*.1;
  ringGroup.rotation.y=t*.35+mouse.x*.15;
  ringGroup.rotation.x=.3+mouse.y*.1;
  const heroFade=Math.max(0,1-smoothScroll*3.1);
  points.material.opacity=.18+.52*heroFade;
  outerPoints.material.opacity=.06+.2*heroFade;
  ringGroup.visible=heroFade>.015;
  const targetZ=8-smoothScroll*1.2;
  camera.position.z+=(targetZ-camera.position.z)*.03;
  camera.position.x+=((-mouse.x*.45)-camera.position.x)*.025;
  camera.position.y+=((mouse.y*.3)-camera.position.y)*.025;
  renderer.render(scene,camera);
}
initLab();

// Cinematic meteor field: sparse shooting stars crossing the research environment.
const meteorCanvas=document.getElementById('meteorCanvas');
const meteorCtx=meteorCanvas.getContext('2d');
let meteors=[], meteorLast=0, meteorNext=1800;

function resizeMeteors(){
  const d=Math.min(devicePixelRatio,1.7);
  meteorCanvas.width=Math.floor(innerWidth*d);
  meteorCanvas.height=Math.floor(innerHeight*d);
  meteorCanvas.style.width=innerWidth+'px';
  meteorCanvas.style.height=innerHeight+'px';
  meteorCtx.setTransform(d,0,0,d,0,0);
}
function spawnMeteor(){
  const x=innerWidth*(.42+Math.random()*.65);
  const y=innerHeight*(-.08+Math.random()*.38);
  const speed=9+Math.random()*11;
  const angle=Math.PI*(.66+Math.random()*.12);
  meteors.push({
    x,y,vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed,
    life:0,max:42+Math.random()*38,length:80+Math.random()*130,
    width:.7+Math.random()*1.1,hue:Math.random()<.65?'cyan':'violet'
  });
}
function drawMeteors(now){
  requestAnimationFrame(drawMeteors);
  if(reduced)return;
  if(now-meteorLast>meteorNext){
    spawnMeteor(); meteorLast=now; meteorNext=1800+Math.random()*4800;
  }
  meteorCtx.clearRect(0,0,innerWidth,innerHeight);
  for(let i=meteors.length-1;i>=0;i--){
    const m=meteors[i]; m.x+=m.vx; m.y+=m.vy; m.life++;
    const progress=m.life/m.max, alpha=Math.sin(Math.PI*progress)*.9;
    const mag=Math.hypot(m.vx,m.vy), ux=m.vx/mag, uy=m.vy/mag;
    const tailX=m.x-ux*m.length, tailY=m.y-uy*m.length;
    const grad=meteorCtx.createLinearGradient(m.x,m.y,tailX,tailY);
    const c=m.hue==='cyan'?'53,231,255':'140,108,255';
    grad.addColorStop(0,`rgba(255,255,255,${alpha})`);
    grad.addColorStop(.12,`rgba(${c},${alpha*.9})`);
    grad.addColorStop(1,`rgba(${c},0)`);
    meteorCtx.strokeStyle=grad; meteorCtx.lineWidth=m.width;
    meteorCtx.beginPath(); meteorCtx.moveTo(m.x,m.y); meteorCtx.lineTo(tailX,tailY); meteorCtx.stroke();
    meteorCtx.fillStyle=`rgba(255,255,255,${alpha})`;
    meteorCtx.shadowBlur=12; meteorCtx.shadowColor=m.hue==='cyan'?'#35e7ff':'#8c6cff';
    meteorCtx.beginPath(); meteorCtx.arc(m.x,m.y,1.35,0,Math.PI*2); meteorCtx.fill(); meteorCtx.shadowBlur=0;
    if(m.life>m.max||m.x<-250||m.y>innerHeight+250)meteors.splice(i,1);
  }
}
addEventListener('resize',resizeMeteors);
resizeMeteors();
if(!reduced)requestAnimationFrame(drawMeteors);
