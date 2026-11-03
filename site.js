// To add a page: create the .html file, then add one line here.
const PAGES=[
 {url:"index.html",title:"Main page",kw:"snigdh karki introduction about home overview"},
 {url:"education.html",title:"Education",kw:"tribhuvan university institute of engineering ioe student coursework degree"},
 {url:"projects.html",title:"Projects",kw:"risc-v cpu fpga verilog networking distributed systems hardware"},
 {url:"notes.html",title:"Notes",kw:"notes math cp"},
 {url:"hobbies.html",title:"Hobbies",kw:"trekking hiking langtang chitlang kulekhani nagarkot chandragiri champadevi anime manga"},
 {url:"cv.html",title:"Curriculum vitae",kw:"cv resume download pdf experience"},
 {url:"contact.html",title:"Contact",kw:"email github linkedin reach me"}
];
const here=location.pathname.split("/").pop()||"index.html";
document.getElementById("side").innerHTML=
 '<a class="logo" href="index.html"><img src="images/logo.png" alt="Snigdh Karki wiki logo"><span>Snigdh Karki</span><small>Personal wiki</small></a>'+
 '<div class="search"><input id="q" type="search" placeholder="Search this wiki" aria-label="Search this wiki" autocomplete="off"><div id="results" hidden></div></div>'+
 '<h3>Navigation</h3><ul>'+
 PAGES.map(p=>`<li><a href="${p.url}"${p.url===here?' class="on"':''}>${p.title}</a></li>`).join("")+'</ul><h3 class="ap">Appearance</h3><button id="theme" class="themebtn" type="button"></button><button id="font" class="themebtn" type="button"></button>';
document.body.insertAdjacentHTML("beforeend",'<footer>&copy; '+new Date().getFullYear()+' Snigdh Karki. This site is a personal wiki and is edited by its author.</footer>');
// Table of contents built from the page's h2 headings
const toc=document.getElementById("toc"),hs=[...document.querySelectorAll(".article h2")];
if(toc&&hs.length>2){toc.className="toc";toc.innerHTML="<b>Contents</b><ol>"+hs.map((h,i)=>{h.id=h.id||"s"+i;return `<li><a href="#${h.id}">${h.textContent}</a></li>`}).join("")+"</ol>"}
// Search
const q=document.getElementById("q"),box=document.getElementById("results");
function find(){const t=q.value.toLowerCase().trim();if(!t){box.hidden=true;return[]}
 const r=PAGES.filter(p=>(p.title+" "+p.kw).toLowerCase().includes(t));
 box.innerHTML=r.length?r.map(p=>`<a href="${p.url}">${p.title}</a>`).join(""):"<span>No matching pages</span>";box.hidden=false;return r}
q.addEventListener("input",find);
q.addEventListener("keydown",e=>{if(e.key==="Enter"){const r=find();if(r[0])location.href=r[0].url}if(e.key==="Escape")box.hidden=true});
document.addEventListener("click",e=>{if(!e.target.closest(".search"))box.hidden=true});
// Light/dark mode. Light is the default; the choice is remembered in this browser.
const tb=document.getElementById("theme");
function setTheme(t){document.documentElement.dataset.theme=t;
 try{localStorage.setItem("theme",t)}catch(e){}
 tb.textContent=t==="dark"?"Switch to light mode":"Switch to dark mode";tb.setAttribute("aria-pressed",t==="dark")}
let saved=null;try{saved=localStorage.getItem("theme")}catch(e){}
setTheme(saved==="dark"?"dark":"light");
tb.addEventListener("click",()=>setTheme(document.documentElement.dataset.theme==="dark"?"light":"dark"));
// Font size. Small is the default; the choice is remembered in this browser.
const fb=document.getElementById("font");
function setFont(f){document.documentElement.dataset.font=f;
 try{localStorage.setItem("font",f)}catch(e){}
 fb.textContent=f==="large"?"Switch to smaller font":"Switch to larger font";fb.setAttribute("aria-pressed",f==="large")}
let savedF=null;try{savedF=localStorage.getItem("font")}catch(e){}
setFont(savedF==="large"?"large":"small");
fb.addEventListener("click",()=>setFont(document.documentElement.dataset.font==="large"?"small":"large"));