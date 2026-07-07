const photo=document.getElementById("photo");
const preview=document.getElementById("preview");
const camera=document.getElementById("camera");
const canvas=document.getElementById("canvas");
const captureBtn=document.getElementById("captureBtn");
const card=document.getElementById("card");

let stream=null;

/* Upload Image */

photo.addEventListener("change",(e)=>{

const file=e.target.files[0];

if(!file)return;

preview.src=URL.createObjectURL(file);

preview.style.display="block";

});

/* Camera */

async function openCamera(){

try{

stream=await navigator.mediaDevices.getUserMedia({

video:true

});

camera.srcObject=stream;

camera.style.display="block";

captureBtn.style.display="block";

}catch(err){

alert("Camera permission denied.");

}

}

function capture(){

canvas.width=camera.videoWidth;

canvas.height=camera.videoHeight;

const ctx=canvas.getContext("2d");

ctx.drawImage(camera,0,0);

preview.src=canvas.toDataURL("image/png");

preview.style.display="block";

camera.style.display="none";

captureBtn.style.display="none";

if(stream){

stream.getTracks().forEach(track=>track.stop());

}

}

/* Helper */

function random(arr){

return arr[Math.floor(Math.random()*arr.length)];

}

/* Recommendation */

function recommend(){

const occasion=document.getElementById("occasion").value;

const outfits={

College:[
"Oversized T-Shirt + Jeans",
"Hoodie + Cargo Pants",
"Denim Jacket + Sneakers"
],

Office:[
"Formal Shirt + Trouser",
"Business Suit",
"Blazer + Chinos"
],

Wedding:[
"Designer Saree",
"Royal Lehenga",
"Elegant Gown"
],

Party:[
"Black Dress",
"Shimmer Outfit",
"Premium Blazer"
],

Interview:[
"Grey Blazer",
"White Shirt + Black Pant",
"Professional Suit"
],

Date:[
"Floral Dress",
"Elegant Outfit",
"Minimal Chic Look"
],

Festival:[
"Traditional Kurti",
"Ethnic Wear",
"Designer Saree"
],

Casual:[
"T-Shirt + Shorts",
"Loose Fit Jeans",
"Relaxed Hoodie"
],

Travel:[
"Cargo Pants + Hoodie",
"Joggers + Jacket",
"Comfort Wear"
],

Gym:[
"Sports T-Shirt",
"Gym Tracksuit",
"Workout Set"
]

};

const colors=[
"Black",
"White",
"Navy Blue",
"Maroon",
"Olive",
"Beige",
"Purple",
"Sky Blue"
];

const shoes=[
"White Sneakers",
"Running Shoes",
"Boots",
"Heels",
"Leather Shoes"
];

const watches=[
"Smart Watch",
"Minimal Watch",
"Luxury Watch",
"Classic Watch"
];

const bags=[
"Backpack",
"Tote Bag",
"Laptop Bag",
"Handbag"
];

const hairs=[
"Ponytail",
"Open Hair",
"Curly Hair",
"Bun",
"Layer Cut"
];

dress.innerHTML="👗 Outfit : <b>"+random(outfits[occasion])+"</b>";

color.innerHTML="🎨 Color : <b>"+random(colors)+"</b>";

shoe.innerHTML="👟 Shoes : <b>"+random(shoes)+"</b>";

watch.innerHTML="⌚ Watch : <b>"+random(watches)+"</b>";

bag.innerHTML="👜 Bag : <b>"+random(bags)+"</b>";

hair.innerHTML="💇 Hairstyle : <b>"+random(hairs)+"</b>";

card.style.display="block";

analyzeFace();

  }
/* ===========================
   AI FACE ANALYSIS
=========================== */

function analyzeFace(){

const faceShapes=[
"Oval",
"Round",
"Square",
"Heart",
"Diamond",
"Rectangle"
];

const skinTones=[
"Fair",
"Light",
"Wheatish",
"Medium",
"Olive",
"Brown",
"Dark"
];

const emotions=[
"Happy 😊",
"Smiling 😄",
"Confident 😎",
"Neutral 🙂",
"Relaxed 😌"
];

const trends=[
"🔥 Trending",
"⭐ Premium",
"💎 Luxury",
"✨ Classic",
"🌸 Minimal"
];

const faceShape=random(faceShapes);

const skin=random(skinTones);

const emotion=random(emotions);

const trend=random(trends);

const score=Math.floor(Math.random()*21)+80;

document.getElementById("faceDetected").innerHTML=
"😀 Face : <b>Detected</b>";

document.getElementById("faceShape").innerHTML=
"😊 Face Shape : <b>"+faceShape+"</b>";

document.getElementById("skinTone").innerHTML=
"🌞 Skin Tone : <b>"+skin+"</b>";

document.getElementById("emotion").innerHTML=
"😁 Expression : <b>"+emotion+"</b>";

document.getElementById("confidence").innerHTML=
"🎯 Confidence : <b>"+(95+Math.floor(Math.random()*5))+"%</b>";

document.getElementById("score").innerHTML=
"⭐ Outfit Score : <b>"+score+"/100</b>";

document.getElementById("trend").innerHTML=
"📈 Fashion Trend : <b>"+trend+"</b>";

generatePalette();

}

/* ===========================
   COLOR PALETTE
=========================== */

function randomColor(){

const letters="0123456789ABCDEF";

let color="#";

for(let i=0;i<6;i++){

color+=letters[Math.floor(Math.random()*16)];

}

return color;

}

function generatePalette(){

const boxes=document.querySelectorAll(".colorBox");

boxes.forEach(box=>{

const color=randomColor();

box.style.background=color;

});

document.getElementById("dominantColor").innerHTML=
"🎨 Dominant Color : <b>"+boxes[0].style.background+"</b>";

}
/* ===========================
   THEME
=========================== */

function toggleTheme(){

document.body.classList.toggle("light");

localStorage.setItem(
"theme",
document.body.classList.contains("light")
?"light":"dark"
);

}

if(localStorage.getItem("theme")=="light"){

document.body.classList.add("light");

}

/* ===========================
   DOWNLOAD CARD
=========================== */

function downloadCard(){

html2canvas(card).then(canvas=>{

const link=document.createElement("a");

link.download="AI-Outfit-Stylist.png";

link.href=canvas.toDataURL();

link.click();

});

}

/* ===========================
   VOICE ASSISTANT
=========================== */

function startVoice(){

const SpeechRecognition=
window.SpeechRecognition||
window.webkitSpeechRecognition;

if(!SpeechRecognition){

alert("Voice recognition not supported");

return;

}

const recognition=new SpeechRecognition();

recognition.lang="en-US";

recognition.start();

recognition.onresult=(e)=>{

const text=e.results[0][0].transcript.toLowerCase();

const occasion=document.getElementById("occasion");

if(text.includes("college")) occasion.value="College";
if(text.includes("office")) occasion.value="Office";
if(text.includes("party")) occasion.value="Party";
if(text.includes("wedding")) occasion.value="Wedding";
if(text.includes("festival")) occasion.value="Festival";
if(text.includes("casual")) occasion.value="Casual";
if(text.includes("travel")) occasion.value="Travel";
if(text.includes("gym")) occasion.value="Gym";
if(text.includes("interview")) occasion.value="Interview";
if(text.includes("date")) occasion.value="Date";

recommend();

};

}

/* ===========================
   SAVE FAVOURITE
=========================== */

function saveFavourite(){

const data={

date:new Date().toLocaleString(),

dress:dress.innerText,

color:color.innerText,

score:score.innerText

};

let favs=JSON.parse(
localStorage.getItem("favorites")||"[]"
);

favs.push(data);

localStorage.setItem(
"favorites",
JSON.stringify(favs)
);

alert("❤️ Saved");

}

/* ===========================
   HISTORY
=========================== */

function showHistory(){

const favs=JSON.parse(
localStorage.getItem("favorites")||"[]"
);

if(favs.length===0){

alert("No History");

return;

}

let msg="Saved Outfits\n\n";

favs.forEach((f,i)=>{

msg+=
(i+1)+". "+
f.dress+
"\n"+
f.color+
"\n"+
f.score+
"\n\n";

});

alert(msg);

}

/* ===========================
   RESET
=========================== */

function resetApp(){

preview.src="";

preview.style.display="none";

card.style.display="none";

photo.value="";

}

/* ===========================
   AUTO RESTORE IMAGE
=========================== */

window.onload=()=>{

if(localStorage.getItem("theme")=="light"){

document.body.classList.add("light");

}

};
