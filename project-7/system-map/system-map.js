const data = {
  project:{code:"SYSTEM CORE",index:"P07",eyebrow:"PROJECT 07 / ONGOING RESEARCH",title:"PHYSIOLOGICAL SIGNAL INTELLIGENCE",text:"An ongoing research project founded by BL4CK FYR3 MAGYR0N. The system explores how physiological signals can be acquired, processed, measured and computationally analyzed.",status:"ONGOING RESEARCH",next:"01 ACQUIRE"},
  acquire:{code:"NODE 01",index:"01",eyebrow:"SIGNAL ACQUISITION",title:"ACQUIRE",text:"Capture physiological signals using appropriate instrumentation and controlled experimental procedures. Lab 07 established the EKG acquisition foundation for this research lineage.",status:"FOUNDATION",next:"02 CLEAN"},
  clean:{code:"NODE 02",index:"02",eyebrow:"SIGNAL PROCESSING",title:"CLEAN",text:"Identify noise, artifacts and signal-quality problems before extracting features. Reliable computational analysis depends on knowing whether a recorded signal is usable.",status:"RESEARCH DIRECTION",next:"03 DETECT"},
  detect:{code:"NODE 03",index:"03",eyebrow:"EVENT DETECTION",title:"DETECT",text:"Identify meaningful signal events within a physiological time series, including the waveform features needed to establish reliable beat-to-beat measurements.",status:"RESEARCH DIRECTION",next:"04 MEASURE"},
  measure:{code:"NODE 04",index:"04",eyebrow:"PHYSIOLOGICAL MEASUREMENT",title:"MEASURE",text:"Extract measurable features such as R-R intervals and heart-rate response. Lab 07 calculated heart rate from R-R intervals before and after exercise.",status:"LAB 07 FOUNDATION",next:"05 MODEL"},
  model:{code:"NODE 05",index:"05",eyebrow:"COMPUTATIONAL MODELING",title:"MODEL",text:"Transform signal measurements into computational representations that can be analyzed over time. This is where experimental measurement begins connecting to software and algorithmic research.",status:"FUTURE RESEARCH",next:"06 CLASSIFY"},
  classify:{code:"NODE 06",index:"06",eyebrow:"PATTERN ANALYSIS",title:"CLASSIFY",text:"Investigate whether computational methods can distinguish meaningful patterns within physiological signals. Any future classification system must be evaluated against appropriate data and validation procedures.",status:"FUTURE RESEARCH",next:"07 VALIDATE"},
  validate:{code:"NODE 07",index:"07",eyebrow:"RESEARCH VALIDATION",title:"VALIDATE",text:"Test reliability, repeatability, signal quality and model performance before advancing a research concept. Future applications require substantially more evidence than the original four-person laboratory experiment.",status:"RESEARCH GATE",next:"FUTURE SYSTEMS"}
};

const panel=document.getElementById("detailPanel");
const close=document.getElementById("closeDetail");
const nodes=document.querySelectorAll(".node");
const els={code:document.getElementById("detailCode"),index:document.getElementById("detailIndex"),eyebrow:document.getElementById("detailEyebrow"),title:document.getElementById("detailTitle"),text:document.getElementById("detailText"),status:document.getElementById("detailStatus"),next:document.getElementById("detailNext"),signal:document.getElementById("signalDemo")};

function openNode(key){
  const d=data[key]; if(!d)return;
  nodes.forEach(n=>n.classList.toggle("active",n.dataset.node===key));
  Object.entries(d).forEach(([k,v])=>{if(els[k])els[k].textContent=v});
  els.signal.style.display=key==="project"?"none":"block";
  panel.classList.add("open");
  setTimeout(()=>panel.scrollIntoView({behavior:"smooth",block:"nearest"}),80);
}
nodes.forEach(n=>n.addEventListener("click",()=>openNode(n.dataset.node)));
close.addEventListener("click",()=>{panel.classList.remove("open");nodes.forEach(n=>n.classList.remove("active"))});
