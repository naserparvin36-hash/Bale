const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const examples = {
 A:["Apple","سیب","🍎"],B:["Ball","توپ","⚽"],C:["Cat","گربه","🐱"],D:["Dog","سگ","🐶"],E:["Elephant","فیل","🐘"],F:["Fish","ماهی","🐟"],G:["Giraffe","زرافه","🦒"],H:["House","خانه","🏠"],I:["Ice cream","بستنی","🍦"],J:["Juice","آبمیوه","🧃"],K:["Kite","بادبادک","🪁"],L:["Lion","شیر","🦁"],M:["Moon","ماه","🌙"],N:["Nest","لانه","🪺"],O:["Orange","پرتقال","🍊"],P:["Pen","خودکار","🖊️"],Q:["Queen","ملکه","👑"],R:["Rabbit","خرگوش","🐰"],S:["Sun","خورشید","☀️"],T:["Tiger","ببر","🐯"],U:["Umbrella","چتر","☂️"],V:["Van","ون","🚐"],W:["Water","آب","💧"],X:["Xylophone","زیلوفون","🎵"],Y:["Yellow","زرد","🟡"],Z:["Zebra","گورخر","🦓"]
};
const words = [
 ["Apple","سیب","🍎","food"],["Banana","موز","🍌","food"],["Bread","نان","🍞","food"],["Milk","شیر","🥛","food"],
 ["Cat","گربه","🐱","animals"],["Dog","سگ","🐶","animals"],["Bird","پرنده","🐦","animals"],["Fish","ماهی","🐟","animals"],
 ["Book","کتاب","📘","things"],["Pen","خودکار","🖊️","things"],["Bag","کیف","🎒","things"],["Chair","صندلی","🪑","things"],
 ["Sun","خورشید","☀️","things"],["Car","ماشین","🚗","things"],["Ball","توپ","⚽","things"],["House","خانه","🏠","things"]
];
const talks = [
 ["👋","Hello!","سلام!"],["🙂","How are you?","حالت چطور است؟"],["😊","I am fine, thank you.","من خوبم، ممنون."],["🙋","What is your name?","اسم شما چیست؟"],["💬","My name is Sara.","اسم من سارا است."],["🌍","Where are you from?","اهل کجا هستید؟"],["🇮🇷","I am from Iran.","من اهل ایران هستم."],["🙏","Thank you.","متشکرم."],["🤝","Nice to meet you.","از آشنایی با شما خوشوقتم."],["👋","Goodbye!","خداحافظ!"],["🛍️","How much is this?","این چند است؟"],["❓","What is this?","این چیست؟"]
];
function speak(text){if(!("speechSynthesis" in window)){alert("پخش صدا در این مرورگر پشتیبانی نمی‌شود.");return;}speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang="en-US";u.rate=.82;const vs=speechSynthesis.getVoices();const v=vs.find(x=>x.lang==="en-US")||vs.find(x=>x.lang.startsWith("en"));if(v)u.voice=v;speechSynthesis.speak(u);}
document.getElementById("soundTest").onclick=()=>speak("Hello! Welcome to Bale English.");
document.querySelectorAll(".tab").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".tab").forEach(x=>x.classList.toggle("active",x===b));document.querySelectorAll(".panel").forEach(x=>x.classList.toggle("active",x.id===b.dataset.panel));}));
const alphabetGrid=document.getElementById("alphabetGrid");
letters.forEach((l,i)=>{const b=document.createElement("button");b.className="letter-tile"+(i===0?" selected":"");b.innerHTML=`<b>${l} ${l.toLowerCase()}</b><small>${i+1}</small>`;b.onclick=()=>selectLetter(l,b);alphabetGrid.append(b);});
function selectLetter(l,btn){document.querySelectorAll(".letter-tile").forEach(x=>x.classList.toggle("selected",x===btn));const e=examples[l];document.querySelector(".big-letter").textContent=l+" "+l.toLowerCase();document.querySelector(".detail-text").innerHTML=`<h3>حرف ${l}</h3><p>نام حرف: ${({A:"اِی",B:"بی",C:"سی",D:"دی",E:"ای",F:"اِف",G:"جی",H:"اِیچ",I:"آی",J:"جِی",K:"کِی",L:"اِل",M:"اِم",N:"اِن",O:"اُو",P:"پی",Q:"کیو",R:"آر",S:"اِس",T:"تی",U:"یو",V:"وی",W:"دابل‌یو",X:"اِکس",Y:"وای",Z:"زِد"})[l]}</p><p>نمونه: ${e[0]} — ${e[1]} ${e[2]}</p>`;speak(l); }
document.getElementById("letterSpeak").onclick=()=>{const l=document.querySelector(".big-letter").textContent[0];speak(l+" . "+examples[l][0]);};
function renderWords(cat="all"){const grid=document.getElementById("wordGrid");grid.innerHTML="";words.filter(w=>cat==="all"||w[3]===cat).forEach(w=>{const el=document.createElement("article");el.className="word-card";el.innerHTML=`<div class="word-emoji">${w[2]}</div><h3>${w[0]}</h3><p>${w[1]}</p><button type="button">🔊 تلفظ و املا</button>`;el.querySelector("button").onclick=()=>speak(w[0]);grid.append(el);});}
renderWords();document.querySelectorAll(".filter").forEach(b=>b.onclick=()=>{document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x===b));renderWords(b.dataset.category);});
const list=document.getElementById("conversationList");talks.forEach(t=>{const el=document.createElement("div");el.className="conversation-item";el.innerHTML=`<span class="talk-icon">${t[0]}</span><div class="talk-text"><b>${t[1]}</b><small>${t[2]}</small></div><button type="button" aria-label="پخش تلفظ">🔊</button>`;el.querySelector("button").onclick=()=>speak(t[1]);list.append(el);});
let qi=0,score=0,answered=false;const quizItems=[["Dog","سگ","🐶",["سگ","گربه","ماهی","پرنده"]],["Apple","سیب","🍎",["موز","سیب","نان","شیر"]],["Book","کتاب","📘",["کیف","خودکار","کتاب","صندلی"]],["Bird","پرنده","🐦",["ماهی","پرنده","سگ","گربه"]],["Milk","شیر","🥛",["آب","نان","شیر","سیب"]]];
function showQuestion(){answered=false;const q=quizItems[qi%quizItems.length];document.getElementById("questionCount").textContent=`پرسش ${qi+1}`;document.getElementById("score").textContent=`امتیاز: ${score}`;document.getElementById("quizEmoji").textContent=q[2];document.getElementById("quizWord").textContent=q[0];document.getElementById("feedback").textContent="یک پاسخ انتخاب کن.";const box=document.getElementById("answers");box.innerHTML="";q[3].forEach(a=>{const b=document.createElement("button");b.className="answer";b.textContent=a;b.onclick=()=>{if(answered)return;answered=true;if(a===q[1]){b.classList.add("correct");score++;document.getElementById("feedback").textContent="آفرین! پاسخ درست است. 🌟";}else{b.classList.add("wrong");document.getElementById("feedback").textContent=`پاسخ درست: ${q[1]}`;[...box.children].find(x=>x.textContent===q[1]).classList.add("correct");}document.getElementById("score").textContent=`امتیاز: ${score}`;};box.append(b);});}
document.getElementById("nextQuestion").onclick=()=>{qi++;showQuestion();};showQuestion();
if("serviceWorker" in navigator && location.protocol.startsWith("http")) window.addEventListener("load",()=>navigator.serviceWorker.register("./service-worker.js").catch(()=>{}));

// Home-screen navigation: cards and start buttons open the matching learning section.
function openLearning(panelId){
  document.querySelectorAll(".tab").forEach(x=>x.classList.toggle("active",x.dataset.panel===panelId));
  document.querySelectorAll(".panel").forEach(x=>x.classList.toggle("active",x.id===panelId));
  document.getElementById("learning").scrollIntoView({behavior:"smooth",block:"start"});
}
document.querySelectorAll("[data-go]").forEach(b=>b.addEventListener("click",()=>openLearning(b.dataset.go)));
document.getElementById("homeButton").addEventListener("click",()=>{
  document.querySelectorAll(".tab").forEach((x,i)=>x.classList.toggle("active",i===0));
  document.querySelectorAll(".panel").forEach((x,i)=>x.classList.toggle("active",i===0));
  document.getElementById("homeSection").scrollIntoView({behavior:"smooth",block:"start"});
});
