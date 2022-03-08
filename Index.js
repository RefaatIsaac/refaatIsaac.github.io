
var
foundArea = document.getElementById('found_area'),
searchWord = document.getElementById('search_input'),
searchCont = document.getElementById('search'),
userAns = document.getElementById('answered'),
favoritesList = document.getElementById("favorites_list"),
dictionarySec = document.getElementById("dictionary_sec"),
exercisesSec = document.getElementById("exercises_sec"),
allSections = document.getElementById("container").querySelectorAll("section"),
allMenuBars = document.querySelectorAll(".menu_item"),
favSec = document.getElementById("favorites_sec"),
favoriteWords = [],
searchedWords = [],
writeTransDiv = document.getElementById("write_trans"),
writeTransInput,
transLang = document.getElementById("trans_lang"),
writeTransQuestion = document.getElementById("write_trans_question"),
writeTranResult = document.getElementById("trans_result"),
chooseTransQuest = document.getElementById("choose_quest"),
chooseOptions = document.getElementById("select_trans").querySelectorAll(".choose_opt"),
chooseTransLang = document.getElementById("chooseTrans_lang"),
chooseTransLearned = document.getElementById("choose_learned"),
chooseResult = document.getElementById("choose_result"),
optIndex = 0,
correctOpt = 0,
favNouns = [],
nounsIndex = 0,
artQuest = exercisesSec.querySelector("#art_quest"),
allArticles = document.getElementById("choose_art").querySelectorAll(".choose_opt"),
artLearned = document.getElementById("art_learned");


// window.addEventListener("load",()=>{
//   document.getElementById("loading_cont").remove();
//   document.getElementById("super").style.display="block";
//    });

function displaySec(event){
  allSections.forEach(sec=>{
    sec.style.display = "none";
    sec.classList.remove("active_sec");
  });
for (let index = 0; index < allMenuBars.length; index++) {
  if(allMenuBars[index].querySelector(".navIcon").classList.contains("activeIcon")) allMenuBars[index].querySelector(".navIcon").classList.remove("activeIcon");
}
event.target.nextElementSibling.classList.add("activeIcon");
document.getElementById(event.target.classList[0]+"_sec").style.display = "block";
document.getElementById(event.target.classList[0]+"_sec").classList.add("active_sec")
}
var menuBar = document.getElementById('floating_menu');
// window.addEventListener('scroll', () =>{
// if(window.scrollY > 70){
//   menuBar.style.display= "block";
//   menuBar.style.position = "fixed";
//   menuBar.style.bottom="1px";
// }
// else{
//   menuBar.style.display= "none";
// }
// });
/**
* Dictionary funcions
*/
function searchable(){
let searched = searchWord.value;
if(searched[searched.length-1] === ""){
toSearch =  searched.slice(0,-1).toUpperCase();
}
return searched.toUpperCase();
}
function read(element){
let reader = new SpeechSynthesisUtterance(element.nextElementSibling.innerText);
if(element.nextElementSibling.classList[1] === "de") reader.lang = "de-DE";
else reader.lang = "en-Us";
reader.rate = 0.6;
speechSynthesis.speak(reader);
}
var enteredWord = "";
function finder(event) {
if(event.key === "Enter"){
  enteredWord = searchable().toLowerCase();
let foundWord = ``;
for (const word in NounsFromEngToDe) {
if(word === searchable()){
  let article = (NounsFromEngToDe[word][0] != "null")? NounsFromEngToDe[word][0] : "";
  foundWord += `<div class="vocabulary">`;
  foundWord += `<div class="top_area">
      <i class="word_type noun">Noun:</i>
      <i class="flag germany">&#127465;&#127466;</i>
  </div>`;
  foundWord += `<strong class="fa fa-volume-up" onclick="read(this)">&#128266;</strong><span class="found_word de found"><b class="article">${article}</b> <b class="de_noun">${NounsFromEngToDe[word][1]}</b></span><br>`;
  if(NounsFromEngToDe[word][2] != 'null'){foundWord += `Plural:  <strong class="fa fa-volume-up" onclick="read(this)">&#128266;</strong><span class="word_notes de found"><b class="plural">${NounsFromEngToDe[word][2]}</b></span>`;}
  foundWord += `</div>`;
}
}
for (const word in NounsFromDeToEng) {
if(word === searchable()){
foundWord += `<div class="vocabulary">`;
foundWord += `<div class="top_area">
  <i class="word_type noun">Noun:</i>
  <i class="flag usa">&#127482;&#127480;</i>
  </div>`;
foundWord += `<strong class="fa fa-volume-up" onclick="read(this)">&#128266;</strong><span class="found_word en found"><b class="en_noun">${NounsFromDeToEng[word][0]}</b></span><br>
<strong class="fa fa-volume-up" onclick="read(this)">&#128266;</strong><span class="word_notes de found"><b class="article">${NounsFromDeToEng[word][1]}</b> <b class="de_noun">${searchable()}</b>, <b class="plural">${NounsFromDeToEng[word][2]}</b></span>`;
foundWord += `</div>`;  
}
}
for (const word in VerbsFromDeToEng) {
if(word.split('@')[0] === searchable()){
foundWord += `<div class="vocabulary">`;
foundWord += `<div class="top_area">
  <i class="word_type verb">Verb:</i>
  <i class="flag usa">&#127482;&#127480;</i>
</div>`;
foundWord += `<strong class="fa fa-volume-up" onclick="read(this)">&#128266;</strong><span class="found_word en found">${VerbsFromDeToEng[word].split("@")[0]}</span>`;
if(VerbsFromEngToDe[VerbsFromDeToEng[word]].split("@")[0].split(",").length ===4){
  foundWord += `<div class="conjugation"> Irregular verb:`
  foundWord += `<p>Präsens: <strong class="fa fa-volume-up" onclick="read(this)">&#128266;</strong><span class="word_notes de found present">${VerbsFromEngToDe[VerbsFromDeToEng[word]].split("@")[0].split(",")[1]}</span></p>`;
  foundWord += `<p>Präteritum: <strong class="fa fa-volume-up" onclick="read(this)">&#128266;</strong><span class="word_notes de found imperfect">${VerbsFromEngToDe[VerbsFromDeToEng[word]].split("@")[0].split(",")[2]}</span></p>`;
  foundWord += `<p>P. Perfekt: <strong class="fa fa-volume-up" onclick="read(this)">&#128266;</strong><span class="word_notes de found p_p">${VerbsFromEngToDe[VerbsFromDeToEng[word]].split("@")[0].split(",")[3]}</span></p>`;
  foundWord += `</div>`
}
if(VerbsFromEngToDe[VerbsFromDeToEng[word]].split("@")[0].split("##").length > 1){
  foundWord += `<i class="cases_eng"> ${searchable().toLowerCase()} ${VerbsFromEngToDe[VerbsFromDeToEng[word]].split("@")[0].split("##")[0].split(",")[1]}</i>`;
  foundWord += `<p>Beispielsatz: <strong class="fa fa-volume-up" onclick="read(this)">&#128266;</strong><span class="word_notes de found example">${VerbsFromEngToDe[VerbsFromDeToEng[word]].split("@")[0].split("##")[1]}</p>`;
}
if(VerbsFromEngToDe[VerbsFromDeToEng[word]].split("@")[0].split("**").length > 1){
  foundWord += `<br><i class="with_prep_eng"> ${searchable().toLowerCase()} + ${VerbsFromEngToDe[VerbsFromDeToEng[word]].split("@")[0].split(",")[1].split("**")[0]}</i>`;
  foundWord += `<i class="cases"> + ${VerbsFromEngToDe[VerbsFromDeToEng[word]].split("@")[0].split("**")[1]}<i>`;
  foundWord += `<p>Beispielsatz: <strong class="fa fa-volume-up" onclick="read(this)">&#128266;</strong><span class="word_notes de found example">${VerbsFromEngToDe[VerbsFromDeToEng[word]].split("@")[0].split("**")[2]}</span>`;
}
foundWord += `</div>`;
}
}
for (const word in VerbsFromEngToDe) {
if(word.split("@")[0] === searchable()){
foundWord += `<div class="vocabulary">`;
foundWord += `<div class="top_area">
  <i class="word_type verb">Verb:</i>
  <i class="flag germany">&#127465;&#127466;</i>
</div>`;
foundWord += `<strong class="fa fa-volume-up" onclick="read(this)">&#128266;</strong><span class="found_word de found">${VerbsFromEngToDe[word].split("@")[0].split(",")[0]}</span>`;
if(VerbsFromEngToDe[word].split("@")[0].split(",").length ===4){
  foundWord += `<div class="conjugation"> Irregular verb:`
  foundWord += `<p>Präsens: <strong class="fa fa-volume-up" onclick="read(this)">&#128266;</strong><span class="word_notes de found present">${VerbsFromEngToDe[word].split("@")[0].split(",")[1]}</span></p>`;
  foundWord += `<p>Präteritum: <strong class="fa fa-volume-up" onclick="read(this)">&#128266;</strong><span class="word_notes de found imperfect">${VerbsFromEngToDe[word].split("@")[0].split(",")[2]}</span></p>`;
  foundWord += `<p>P. Perfekt: <strong class="fa fa-volume-up" onclick="read(this)">&#128266;</strong><span class="word_notes de found p_p">${VerbsFromEngToDe[word].split("@")[0].split(",")[3]}</span></p>`;
  foundWord += `</div>`
}
if(VerbsFromEngToDe[word].split("@")[0].split("##").length > 1){
  foundWord += `<i class="cases"> ${VerbsFromEngToDe[word].split("@")[0].split(",")[1].split("##")[0]}</i>`;
  foundWord += `<p>Beispielsatz: <strong class="fa fa-volume-up" onclick="read(this)">&#128266;</strong><span class="word_notes de found example">${VerbsFromEngToDe[word].split("@")[0].split("##")[1]}</p>`;
}
if(VerbsFromEngToDe[word].split("@")[0].split("**").length > 1){
  foundWord += `<i class="with_prep"> + ${VerbsFromEngToDe[word].split("@")[0].split(",")[1].split("**")[0]}</i>`;
  foundWord += `<i class="cases"> + ${VerbsFromEngToDe[word].split("@")[0].split("**")[1]}<i>`;
  foundWord += `<p>Beispielsatz: <strong class="fa fa-volume-up" onclick="read(this)">&#128266;</strong><span class="word_notes de found example">${VerbsFromEngToDe[word].split("@")[0].split("**")[2]}</span>`;
}
foundWord += `</div>`;
}
}
for (const word in AdjectivesFromEngToDe) { 
if(word.split("@")[0] === searchable()){
foundWord += `<div class="vocabulary">`;
foundWord += `<div class="top_area">
  <i class="word_type adjective">Adjective:</i>
  <i class="flag germany">&#127465;&#127466;</i>
</div>`;
foundWord += `<strong class="fa fa-volume-up" onclick="read(this)">&#128266;</strong><span class="found_word de found">${AdjectivesFromEngToDe[word].split("@")[0]}</span>`;
foundWord += `</div>`;
}
}
for (const word in AdjectivesFromDeToEng) {
if(word.split("@")[0] === searchable()){
foundWord += `<div class="vocabulary">`;
foundWord += `<div class="top_area">
<i class="word_type adjective">Adjective:</i>
<i class="flag usa">&#127482;&#127480;</i>
</div>`;
foundWord += `<strong class="fa fa-volume-up" onclick="read(this)">&#128266;</strong><span class="found_word en found">${AdjectivesFromDeToEng[word].split("@")[0]}</span>`;
foundWord += `</div>`;
}}
for (const word in AdverbsFromEngToDe) {
if(word === searchable()){
foundWord += `<div class="vocabulary">`;
foundWord += `<div class="top_area">
  <i class="word_type adverb">Adverb:</i>
  <i class="flag germany">&#127465;&#127466;</i>
  </div>`;
foundWord += `<strong class="fa fa-volume-up" onclick="read(this)">&#128266;</strong><span class="found_word de found">${AdverbsFromEngToDe[word]}</span>`;
foundWord += `</div>`;
}}
for (const word in PronounsFromEngToDe) {
if(word.split("@")[0] === searchable()){
foundWord += `<div class="vocabulary">`;
foundWord += `<div class="top_area">
<i class="word_type pronoun">Pronoun:</i>
<i class="flag germany">&#127465;&#127466;</i>
</div>`;
foundWord += `<strong class="fa fa-volume-up" onclick="read(this)">&#128266;</strong><span class="found_word de found">${PronounsFromEngToDe[word].split("@")[0]}</span>`;
foundWord += `</div>`;
}}
for (const word in PronounsFromDeToEng) {
if(word.split("@")[0] === searchable()){
foundWord += `<div class="vocabulary">`;
foundWord += `<div class="top_area">
<i class="word_type pronoun">Pronoun:</i>
<i class="flag usa">&#127482;&#127480;</i>
</div>`;
foundWord += `<strong class="fa fa-volume-up" onclick="read(this)">&#128266;</strong><span class="found_word en found">${PronounsFromDeToEng[word].split("@")[0]}</span>`;
foundWord += `</div>`;
}}
for (const word in QuestionWordsFromEngToDe) {
if(word === searchable()){
foundWord += `<div class="vocabulary">`;
foundWord += `<div class="top_area">
<i class="word_type question">Question:</i>
<i class="flag germany">&#127465;&#127466;</i>
</div>`;
foundWord += `<strong class="fa fa-volume-up" onclick="read(this)">&#128266;</strong><span class="found_word de found">${QuestionWordsFromEngToDe[word]}</span>`;
foundWord += `</div>`;
}}
for (const word in QuestionWordsFromDeToEng) {
if(word === searchable()){
foundWord += `<div class="vocabulary">`;
foundWord += `<div class="top_area">
  <i class="word_type question">Question:</i>
  <i class="flag usa">&#127482;&#127480;</i>
  </div>`;
foundWord += `<strong class="fa fa-volume-up" onclick="read(this)">&#128266;</strong><span class="found_word en found">${QuestionWordsFromDeToEng[word]}</span>`;
foundWord += `</div>`;
}}
for (const word in ConjuncFromEngToDe) {
if(word === searchable()){
foundWord += `<div class="vocabulary">`;
foundWord += `<div class="top_area">
  <i class="word_type conjunction">Conjuncion:</i>
  <i class="flag germany">&#127465;&#127466;</i>
  </div>`;
foundWord += `<strong class="fa fa-volume-up" onclick="read(this)">&#128266;</strong><span class="found_word de found">${ConjuncFromEngToDe[word]}</span>`;
foundWord += `</div>`;
}
}
for (const word in ConjuncFromDeToEng) {
if(word === searchable()){
foundWord += `<div class="vocabulary">`;
foundWord += `<div class="top_area">
  <i class="word_type conjunction">Conjuncions:</i>
  <i class="flag usa">&#127482;&#127480;</i>
  </div>`;
foundWord += `<strong class="fa fa-volume-up" onclick="read(this)">&#128266;</strong><span class="found_word en found">${ConjuncFromDeToEng[word]}</span>`;
foundWord += `</div>`;
}  
}  
for (const word in PrepositionsFromEngToDe) {
  if(word.split("@")[0] === searchable()){
    foundWord += `<div class="vocabulary">`;
  foundWord += `
  <div class="top_area">
      <i class="word_type preposition">Preposition:</i>
      <i class="flag germany">&#127465;&#127466;</i>
  </div>`;
  foundWord += `<strong class="fa fa-volume-up" onclick="read(this)">&#128266;</strong><span class="found_word de found">${PrepositionsFromEngToDe[word].split("@")[0]}</span>`;
  foundWord += `</div>`;
  }
}
for (const word in PrepositionsFromDeToEng) {
if(word.split("@")[0] === searchable()){
  foundWord += `<div class="vocabulary">`;
  foundWord += `
  <div class="top_area">
  <i class="word_type preposition">Preposition:</i>
  <i class="flag usa">&#127482;&#127480;</i>
  </div>`;
  foundWord += `<strong class="fa fa-volume-up" onclick="read(this)">&#128266;</strong><span class="found_word en found">${PrepositionsFromDeToEng[word].split("@")[0]}</span>`;
  foundWord += `</div>`;
}  
}
for (const word in commonFromEngToDE) {
  if(word.toUpperCase() === searchable()){
    foundWord += `<div class="vocabulary">`;
    foundWord += `
    <div class="top_area">
    <i class="word_type common">Common 2000 words:</i>
    <i class="flag usa">&#127482;&#127480;</i>
    </div>`;
    foundWord += `<strong class="fa fa-volume-up" onclick="read(this)">&#128266;</strong><span class="found_word en found">${commonFromEngToDE[word]}</span>`;
    foundWord += `</div>`;
  }  
}
for (const word in commonFromDeToEng) {
  if(word.toUpperCase() === searchable()){
    foundWord += `<div class="vocabulary">`;
    foundWord += `
    <div class="top_area">
    <i class="word_type common">Common 2000 words:</i>
    <i class="flag usa">&#127482;&#127480;</i>
    </div>`;
    foundWord += `<strong class="fa fa-volume-up" onclick="read(this)">&#128266;</strong><span class="found_word de found">${commonFromDeToEng[word]}</span>`;
    foundWord += `</div>`;
  }  
}
  foundArea.innerHTML = foundWord.toLowerCase();
  if(foundWord == "") foundArea.innerHTML = `<span class="not_found">Not found, check spelling </span>`;
  let vocabularies = dictionarySec.querySelectorAll(".top_area");
  let founds = dictionarySec.querySelectorAll(".found");
  for (let i = 0; i < vocabularies.length; i++) {
    let addStar = document.createElement("i");
    addStar.innerHTML = `&#x2730;`;
    addStar.setAttribute("class","add_star");
    addStar.setAttribute("onclick","addToFav(event)");
   let removeStar = document.createElement("i");
    removeStar.innerHTML = `&#9733;`;
    removeStar.setAttribute("class","starred");
    removeStar.setAttribute("onclick","removeFav(event)");
    let vocab = (founds[i].children.length > 1)? founds[i].children[1].innerText: founds[i].innerText;
    let singGer = (dictionarySec.querySelectorAll(".sing_ger")[i])? dictionarySec.querySelectorAll(".sing_ger")[i].innerText.split(" ")[1]:null;
    if(searchedWords.includes(vocab)){
        vocabularies[i].appendChild(removeStar);
    }else if(searchedWords.includes(singGer)){
    vocabularies[i].appendChild(removeStar)
  }
  else vocabularies[i].appendChild(addStar);
  }
  }
}
/**
* Favorite list functions
*/
function prepareReport(){
//let tb = document.createElement("table");
document.getElementById("print").style.display="block"
let favItems = favoritesList.querySelectorAll("li");
for(let i=0; i < favoriteWords.length;i++){
let tr = document.createElement("tr");
let ser = document.createElement("td");
ser.innerHTML = i+1;
ser.style.width="10%";
tr.appendChild(ser);
let type = document.createElement("td");
type.style.width="30%";
type.innerHTML = favoriteWords[i].type;
tr.appendChild(type);
let eng = document.createElement("td");
eng.innerHTML = favoriteWords[i].en;
tr.appendChild(eng);
let de = document.createElement("td");
let pl = document.createElement("td");
if(favoriteWords[i].art){
pl.innerHTML = favoriteWords[i].pl;
de.innerHTML = favoriteWords[i].art +" "+favoriteWords[i].de;
tr.appendChild(de)
tr.appendChild(pl)
}else{
de.innerHTML = favoriteWords[i].de;
tr.appendChild(de);
} 
document.getElementById("fav_table").appendChild(tr);
}
doPrint();
}
function doPrint(){
let cln = document.getElementById("fav_table").cloneNode('true'),
a = window.open('', '', 'width = 1000px', 'height = 1000px');
a.document.write('<html><head><style>tabel{margin-left:40%}td{border-bottom:2px solid #000; border-top:1px solid #000}body{margin:5%}td,th{margin:1%;padding:1%;}</style></head><body>');
a.document.write('<div id="contianer">'); 	
a.document.write('<h1 id="heading"> Favorite words list generated by Memorizer App</h1>');
a.document.write('<div>');
let main = a.document.querySelector('div');
main.appendChild(cln);
a.document.write('</div>')
a.document.write("<h5>Made with love by Refaat Isaac</h5>")
a.document.write('</div></body></html>');
document.getElementById("print").style.display="none"
a.print();
}
// function clearAttampt(){
//   document.getElementById("caution_clear").style.display = "block";
// }
// function clearFavorites(){
//   favoritesList.querySelectorAll("li").forEach(li => li.remove());
//   window.refresh();
// }

function addToFav(event){
  document.getElementById("fav_container").style.display = "block";
  if(favSec.querySelector(".not_found")) favSec.querySelector(".not_found").remove();
  let favItem = document.createElement("li");
  favItem.setAttribute("class","fav_item not_learned");
  let item = event.target.parentElement.parentElement.cloneNode(true);
  favItem.appendChild(item);
  let mic = document.createElement("strong");
  mic.setAttribute("onclick","read(this)");
  mic.innerHTML = `&#128266;`
  favItem.appendChild(mic);
  let trans = document.createElement("span");

  if(event.target.parentElement.parentElement.querySelector(".found_word").classList[1] === "en") trans.setAttribute("class","target_word de");
  else trans.setAttribute("class","target_word en");
  trans.innerHTML = enteredWord;
  favItem.appendChild(trans);
  let removBt = document.createElement("span");
  removBt.setAttribute("class","removeItem");
  removBt.innerHTML=`&#128465;`
  removBt.setAttribute("onclick","removeFavItem(this)");
  favItem.appendChild(removBt);
  let score = document.createElement("span");
  score.setAttribute("class","score");
  score.innerHTML = "0";
  favItem.appendChild(score);
  favoritesList.appendChild(favItem);
  let favItems = favoritesList.querySelectorAll("li");
  for (let i = 0; i < favItems.length; i++) {
    if(favItems[i].querySelector(".add_star")) favItems[i].querySelector(".add_star").remove();
     if(favItems[i].querySelector(".flag")) favItems[i].querySelector(".flag").remove();   
  }

  event.target.outerHTML = `<i class="starred" onclick="removeFav(event)">&#9733; </i>`;
  event.target.style.color = "yellow";
  document.querySelector("#counter").innerText =  parseInt(document.querySelector("#counter").innerText) + 1;

  if(!localStorage.FavWords){localStorage.setItem("FavWords",favoritesList.innerHTML)}
  else localStorage.FavWords = favoritesList.innerHTML;
  document.getElementById("exer_cont").style.display="block";
  preparingFavorites();
  }
  function removeFavItem(ele){
    ele.parentElement.remove();
    document.getElementById("counter").innerText = parseInt(document.getElementById("counter").innerText)-1
    preparingFavorites();
    if(!localStorage.FavWords){localStorage.setItem("FavWords",favoritesList.innerHTML)}
    else localStorage.FavWords = favoritesList.innerHTML;
    
};
function removeFav(event){
  let favItems = favoritesList.querySelectorAll(".fav_item");
  for (let i = 0; i < favItems.length; i++) {
    if(favItems[i].querySelector(".found_word").innerText.includes(event.target.parentElement.parentElement.querySelector(".found_word").innerText)){
        favItems[i].remove();
        document.getElementById("counter").innerText = parseInt(document.getElementById("counter").innerText)-1
    }
}
if(!localStorage.FavWords){localStorage.setItem("FavWords",favoritesList.innerHTML)}
else localStorage.FavWords = favoritesList.innerHTML;
event.target.outerHTML = `<i class="add_star" onclick="addToFav(event)">&#x2730;</i>`;
preparingFavorites();
}
function filter(event){
  let filter = event.target,
  favItems = favoritesList.querySelectorAll("li"),
  filterCounter = document.getElementById("counter"),
  counter =0;
  favItems.forEach(item=>{
    item.style.display = "none";
    if(item.querySelector(".word_type").classList.contains(filter.value) || item.classList.contains(filter.value)){
        item.style.display = "flex";
        counter++;
    }
  });
  filterCounter.innerText = counter;
  if(filter.value === "all"){
    for (let x = 0; x < favItems.length; x++) {
        favItems[x].style.display = "flex";
    }
    filterCounter.innerText = favItems.length;
}
}
function changeDateArrange(e){
  if(favoritesList.style.flexDirection == "column"){
    favoritesList.style.flexDirection = "column-reverse";
    e.innerHTML = "&#x2191;";
  }else if(favoritesList.style.flexDirection == "column-reverse"){
    favoritesList.style.flexDirection = "column";
    e.innerHTML = "&#x2193";
  }

}
function preparingFavorites(){
favoriteWords = [];
searchedWords = [];
let favItems = favoritesList.querySelectorAll("li");
for (let i = 0; i < favItems.length; i++) {
  let word = favItems[i].querySelector(".found_word");
  let wordObj = {};
  wordObj.lang = word.classList[1];
  wordObj.type = favItems[i].querySelector(".word_type").classList[1];
  if(favItems[i].querySelector(".de_noun")) wordObj.de = favItems[i].querySelector(".de_noun").innerText;
  else{
    if(wordObj.lang ==="en") wordObj.de = favItems[i].querySelector(".target_word").innerText;
    else wordObj.de = word.innerText;
  }
  if(favItems[i].querySelector(".article")) wordObj.art = favItems[i].querySelector(".article").innerText;
  if(favItems[i].querySelector(".plural")) wordObj.pl = favItems[i].querySelector(".plural").innerText;
  if(favItems[i].querySelector(".present")){
    wordObj.irrg = true;
    wordObj.present = favItems[i].querySelector(".present").innerText;
  }
  if(favItems[i].querySelector(".imperfect")) wordObj.imperfect = favItems[i].querySelector(".imperfect").innerText;
  if(favItems[i].querySelector(".p_p")) wordObj.pp = favItems[i].querySelector(".p_p").innerText;
  if(wordObj.lang === "en") wordObj.en = word.innerText;
  if(wordObj.lang === "de") wordObj.en = favItems[i].querySelector(".target_word").innerText;
  wordObj.index = i;
  if(favItems[i].classList[1] === "learned") wordObj.learned = true;
  else wordObj.learned = false;
  favoriteWords.push(wordObj);
}
for (let i = 0; i < favoriteWords.length; i++) {
  searchedWords.push(favoriteWords[i].en);
  searchedWords.push(favoriteWords[i].de);
  }
}

/**
* Exercises functions
*/
const details = exercisesSec.querySelectorAll("details");
details.forEach((targetDetail) => {
  targetDetail.addEventListener("click", () => {
    details.forEach((detail) => {
        if(detail === targetDetail){
            detail.classList.add("currentExer");
        }
      if (detail !== targetDetail) {
        detail.removeAttribute("open");
        detail.classList.remove("currentExer")
      }
    });
  });
});

let soundsOff = false;
function soundControl(event){
  soundsOff = (soundsOff === true)? false:true;
  let mics = exercisesSec.querySelectorAll(".mic");
  mics.forEach(mic =>{
    if(soundsOff === false){
      mic.innerHTML = `&#128266; <i class="fa fa-volume-up"></i>`
    }else{
      mic.innerHTML = `&#128263; <i class="fa fa-volume-off"></i>`
    }
  });
}

let answerArea = document.getElementById("answer_area");
let index = 0;
function writeTrans(event){
  answerArea.innerHTML = `<input id="trans_input" type="text" onkeydown="checkTrans(event)" placeholder="write here">`;
  writeTransInput = document.getElementById("trans_input");
  if(document.getElementById("learned_select").checked === false && favoritesList.querySelector(".learned")){
      while (favoriteWords[index].learned === true) index++
      }
    if(transLang.value === "en") writeTransQuestion.innerText = favoriteWords[index].de;
  else writeTransQuestion.innerText = favoriteWords[index].en;
  let artSelect = document.createElement("span");
  artSelect.innerHTML = `<select id="art_selector">
  <option value="der">der</option>
  <option value="das">das</option>
  <option value="die">die</option>
  </select>`;
  let pl = document.createElement("input");
  pl.setAttribute("id","pl_answer");
  pl.setAttribute("placeholder","plural form?");
  pl.setAttribute("onkeyup","checkTrans(event)");
  let irrg = document.createElement("div");
  irrg.setAttribute("id","input_irrg");
  irrg.innerHTML = `<input type="text" class="tense_input" id="present_answer" placeholder="Präsens?"/> <input type="text" class="tense_input" id="imperfect_answer" placeholder="Präteritum?"/> <input type="text" class="tense_input" placeholder="P. Perfekt?" id="pp_answer"/>`
  if(favoriteWords[index].type === "noun" && transLang.value === 'de'){
    answerArea.insertBefore(artSelect,writeTransInput);
    answerArea.appendChild(pl);
  }
  if(favoriteWords[index].present && transLang.value === 'de'){
    answerArea.appendChild(irrg);
  }
  writeTransInput.focus();
}
function checkTrans(e){
if(e.key === "Enter" || e.type ==="click"){
  let answer = writeTransInput.value.toLowerCase();
  writeTranResult.innerText = "";
  let favItems = favoritesList.querySelectorAll("li");
  let answered = "wrong", nounAns = false, artAns = false, plurAns = false, verbAns = false, presentAns = false, imperfectAns = false, ppAns = false;
      if(transLang.value === "de"){
          if(favoriteWords[index].type ==="noun"){
            if(answer === favoriteWords[index].de){
              nounAns = true;
              writeTransInput.classList.add("rightAns");
            }
            if(document.getElementById("art_selector").value ===  favoriteWords[index].art){
              artAns = true;
              document.getElementById("art_selector").classList.add("rightAns");
            }
            if(document.getElementById("pl_answer").value.toLowerCase() === favoriteWords[index].pl){
              plurAns = true;
              document.getElementById("pl_answer").classList.add("rightAns");
            }
            if(nounAns && artAns && plurAns) answered = "right";
          }
      }

      if(transLang.value === "de" && favoriteWords[index].irrg == true){
        if(answer === favoriteWords[index].de){
          verbAns = true
          writeTransInput.classList.add("rightAns");
        }
        if(document.getElementById("present_answer").value.toLowerCase() === favoriteWords[index].present){
          presentAns = true;
          document.getElementById("present_answer").classList.add("rightAns");
        }
        if(document.getElementById("imperfect_answer").value.toLowerCase() === favoriteWords[index].imperfect){
          imperfectAns = true;
          document.getElementById("imperfect_answer").classList.add("rightAns");
        }
        if(document.getElementById("pp_answer").value.toLowerCase() === favoriteWords[index].pp){
          ppAns = true;
          document.getElementById("pp_answer").classList.add("rightAns")
        }
        if(verbAns && presentAns && imperfectAns && ppAns) answered = "right";
      }
      if(transLang.value ==="de" && favoriteWords[index].type !== "noun" && answer === favoriteWords[index].de && favoriteWords[index].irrg !== true) answered = "right";
      if(transLang.value === "en" && answer === favoriteWords[index].en) answered = "right";
      if(answered === "wrong"){
          writeTranResult.innerHTML = `wrong!, correct Answer: ${favItems[favoriteWords[index].index].querySelector(".target_word").innerHTML} <br> ${favItems[favoriteWords[index].index].querySelector(".vocabulary").innerHTML} <br><button onclick="nextQuest()">Next</button>`;
          writeTranResult.style.display = "block";
          writeTranResult.setAttribute("class","wrong");
           if(parseInt(favItems[favoriteWords[index].index].querySelector(".score").innerText) > 0)favItems[favoriteWords[index].index].querySelector(".score").innerText = parseInt(favItems[favoriteWords[index].index].querySelector(".score").innerText) - 1;
          if(favItems[favoriteWords[index].index].classList.contains("learned")){
              if(parseInt(favItems[favoriteWords[index].index].querySelector(".score").innerText)< 5){
                  favItems[favoriteWords[index].index].classList.replace("learned","not_learned");
                  favItems[favoriteWords[index]].querySelector(".checkmark_cont").remove();
          } 
        }
     
      }
      if(answered === "right"){
          writeTranResult.innerText = "correct!";
          writeTranResult.style.display = "inline-block";
          writeTranResult.setAttribute("class","right");
          favItems[favoriteWords[index].index].querySelector(".score").innerText = parseInt(favItems[favoriteWords[index].index].querySelector(".score").innerText) + 1;
          if(favItems[favoriteWords[index].index].classList.contains("not_learned")){
              if(parseInt(favItems[favoriteWords[index].index].querySelector(".score").innerText) >= 5){
                  favItems[favoriteWords[index].index].classList.replace("not_learned","learned");
                  let checkMarkCont = document.createElement("div");
                  checkMarkCont.setAttribute('class',"checkmark_cont");
                  let checkMark = document.createElement("span");
                  checkMark.setAttribute("class","learnedMark");
                  checkMark.innerHTML = `&#10003;`;
                  checkMarkCont.appendChild(checkMark)
                  favItems[favoriteWords[index].index].insertBefore(checkMarkCont,favItems[favoriteWords[index].index].querySelector(".vocabulary"));
              }
              setTimeout(nextQuest,2000);
          }
          if(!soundsOff){
            let reader = new SpeechSynthesisUtterance(writeTransInput.value);
            reader.lang = (transLang.value === "de")? "de-DE":"en-US";
            reader.rate = 0.8;
            speechSynthesis.speak(reader);
          }

  };
  writeTransDiv.querySelector("#reveal").removeAttribute("disabled");
  localStorage.FavWords = favoritesList.innerHTML;
  preparingFavorites();
}
}
let revealIndex = 0;
let revealBtPressed = false;
function revealAns(bt){
if(revealIndex < 3){
  if(!revealBtPressed){
      if(transLang.value === "en") writeTransInput.value = (favoriteWords[index].en[revealIndex])? favoriteWords[index].en[revealIndex] :"";
      else writeTransInput.value = (favoriteWords[index].en[revealIndex])? favoriteWords[index].de[revealIndex]:"";
      revealBtPressed = true;
  }else{
      if(transLang.value === "en") writeTransInput.value +=(favoriteWords[index].en[revealIndex])? favoriteWords[index].en[revealIndex]:"";
      else writeTransInput.value +=(favoriteWords[index].en[revealIndex])? favoriteWords[index].de[revealIndex]:"";
  }
}else{
  bt.setAttribute("disabled","true");
}
revealIndex++;
writeTransInput.focus();
}
function nextQuest(){
  index++;

  revealBtPressed = false;
  answer = "";
  writeTransInput.value = "";
  writeTranResult.innerText = "";
  revealIndex = 0;
  writeTranResult.style.display="none"
  document.getElementById("question_type").innerText = "";
  writeTranResult.style.display="none"
  if(writeTransInput.classList.contains("rightAns")) writeTransInput.classList.remove("rightAns");
  writeTranResult.parentElement.parentElement.style.backgroundColor ="#491864";
  writeTransDiv.querySelector("#reveal").removeAttribute("disabled");
  if(document.getElementById("art_selector")) document.getElementById("art_selector").remove();
  if(document.getElementById("pl_answer")) document.getElementById("pl_answer").remove();
  if(document.querySelector("#input_irrg")) document.querySelector("#input_irrg").remove();
  if(index > favoriteWords.length-1){
    index = 0;
    preparingFavorites();
  }
  writeTrans();
}

function chooseTrans(){
  if(favoriteWords.length > 10){
    document.getElementById("not_enough_words").style.display="none";
    document.getElementById("chooseTrans_cont").style.display="block";
    optIndex++;
    chooseOptions.forEach(opt => opt.removeAttribute("style"));
    if(index > favoriteWords.length-1) index =0;
    if(!chooseTransLearned.checked && favoritesList.querySelector(".learned")){
        while (favoriteWords[index].learned === true) index++
        }
    chooseTransQuest.innerText = (chooseTransLang.value === "en")? favoriteWords[index].de : favoriteWords[index].en;
    if(optIndex > favoriteWords.length-10) optIndex = 0;
    for (let i = 0; i < chooseOptions.length; i++) {
      if(favoriteWords[optIndex][chooseTransLang.value] === favoriteWords[index][chooseTransLang.value]){
        optIndex++;
      }
        chooseOptions[i].innerText = favoriteWords[optIndex][chooseTransLang.value];
        optIndex++;
    }
    correctOpt = Math.floor((Math.random()*4));
    chooseOptions[correctOpt].innerText = favoriteWords[index][chooseTransLang.value];
    if(!soundsOff){
      let reader = new SpeechSynthesisUtterance(chooseTransQuest.innerText);
      reader.lang = (chooseTransLang.value === "en")? "de-DE": "en-US";
    reader.rate = 0.8;
    speechSynthesis.speak(reader);
    } 
  }
}
function checkChoose(event){
  let favItems = favoritesList.querySelectorAll("li");
  if(event.target.innerText === favoriteWords[index][chooseTransLang.value]){
    event.target.style.backgroundColor="green";
    favItems[favoriteWords[index].index].querySelector(".score").innerText = parseInt(favItems[favoriteWords[index].index].querySelector(".score").innerText) + 1;
    if(favItems[favoriteWords[index].index].classList.contains("not_learned")){
        if(parseInt(favItems[favoriteWords[index].index].querySelector(".score").innerText) >= 5){
            favItems[favoriteWords[index].index].classList.replace("not_learned","learned");
            let checkMarkCont = document.createElement("div");
            checkMarkCont.setAttribute('class',"checkmark_cont");
            let checkMark = document.createElement("span");
            checkMark.setAttribute("class","learnedMark");
            checkMark.innerHTML = `&#10003;`;
            checkMarkCont.appendChild(checkMark)
            favItems[favoriteWords[index].index].insertBefore(checkMarkCont, favItems[favoriteWords[index].index].querySelector(".vocabulary"));
            }
        }
        if(!soundsOff){
        let reader = new SpeechSynthesisUtterance(event.target.innerText);
        reader.lang = (chooseTransLang.value === "de")? "de-DE": "en-US";
        reader.rate = 0.8;
        speechSynthesis.speak(reader);
        }
        setTimeout(chooseTrans,3000);
  }else{
    event.target.style.backgroundColor="red";
    for (let i = 0; i < chooseOptions.length; i++) {
      if(chooseOptions[i].innerText === favoriteWords[index][chooseTransLang.value]){
        chooseOptions[i].style.backgroundColor="green";
      }
      setTimeout(chooseTrans,3000);
    }
    if(parseInt(favItems[favoriteWords[index].index].querySelector(".score").innerText) > 0)favItems[favoriteWords[index].index].querySelector(".score").innerText = parseInt(favItems[favoriteWords[index].index].querySelector(".score").innerText) - 1;
    if(favItems[favoriteWords[index].index].classList.contains("learned")){
      if(parseInt(favItems[favoriteWords[index].index].querySelector(".score").innerText)< 5){
          favItems[favoriteWords[index].index].classList.replace("learned","not_learned");
          favItems[favoriteWords[index].index].querySelector(".checkmark_cont").remove();
        }
  }
  }
  index++;
  localStorage.FavWords = favoritesList.innerHTML;
}

function chooseArt(){
  if(favNouns.length > 5){
    document.getElementById("no_nouns").style.display="none";
    document.getElementById("chooseArt_cont").style.display= "block";
    if(!artLearned.checked && favoritesList.querySelector(".learned")){
        while (favoriteWords[index].learned === true) index++
        }
  if(nounsIndex > favNouns.length-1) nounsIndex = 0;
  artQuest.innerText = favNouns[nounsIndex].de
  allArticles.forEach(art => art.removeAttribute("style"));
  if(!soundsOff){
    let reader = new SpeechSynthesisUtterance(artQuest.innerText);
    reader.lang = "de-De"
    reader.rate = 0.8;
    speechSynthesis.speak(reader);
    }
  }
}
function artChecker(event){
  if(event.target.innerText.toLowerCase() === favNouns[nounsIndex].art){
    event.target.style.backgroundColor = "green";
    setTimeout(chooseArt,3000);
  }else{
    event.target.style.backgroundColor = "red";
    allArticles.forEach(art =>{
      if(art.innerText.toLowerCase() === favNouns[nounsIndex].art) art.style.backgroundColor = "green";
    });
    setTimeout(chooseArt,3000);
  }
  nounsIndex++;
}
function startingFunctions(){
let dataList = document.createElement("datalist");
dataList.setAttribute("id","dictionary");
if(localStorage.FavWords && localStorage.FavWords !== ""){
  favoritesList.innerHTML = localStorage.FavWords;
  if(document.querySelectorAll(".not_found")) document.querySelectorAll(".not_found").forEach(i => i.style.display = "none");
  document.getElementById("exer_cont").style.display="block";
}
if(favoritesList.innerHTML === ""){
  writeTransDiv.style.display = "none";
  document.getElementById("fav_container").style.display = "none";
}
if(localStorage.FavWords && localStorage.FavWords !== ""){
  preparingFavorites();
  for (let i = 0; i < favoriteWords.length; i++) {
    if(favoriteWords[i].type ==="noun") favNouns.push(favoriteWords[i])
   }
}
let favItems = (favoritesList.querySelectorAll("li"))?favoritesList.querySelectorAll("li"): null;
for (let i = 0; i < favItems.length; i++) {
  favItems[i].style.display = "flex";     
}
document.querySelector("#counter").innerText = favoritesList.querySelectorAll("li").length; 
/**creating arrays from the Nouns object in order to use them in the vocabulary objects */
let nounsGer = [];
for (const key in duetschNouns) {
nounsGer.push(duetschNouns[key])
}
let nounsEng = [];
let engArr = [];
for (const key in duetschNouns) {
engArr = Object.keys(duetschNouns);
}
for (let i = 0; i < engArr.length; i++) {
  nounsEng.push(engArr[i].split(","))
}
let gerSing = [];
for (let index = 0; index < nounsGer.length; index++) {
const element = nounsGer[index];
gerSing.push(element[1])
}
vbsEng = [];
vbsGer =[];
vbsWithIrr = []
for(let i=0;i< germanVerbs.English.length;i++){
  if(germanVerbs.English[i].split(",").length >1){
      for(let x =0; x < germanVerbs.English[i].split(",").length;x++){
          if(vbsEng.includes(germanVerbs.English[i].split(",")[x])){
              vbsEng.push(germanVerbs.English[i].split(",")[x]+"@"+x);
          }else vbsEng.push(germanVerbs.English[i].split(",")[x])
          if(vbsGer.includes(germanVerbs.German[i])){vbsGer.push(germanVerbs.German[i]+"@"+i)}
          else vbsGer.push(germanVerbs.German[i]);
      }
  }
  if(vbsEng.indexOf(germanVerbs.English[i])){
    vbsEng.push(germanVerbs.English[i]+"@"+i);
    vbsGer.push(germanVerbs.German[i]);
  }
  else{
      vbsEng.push(germanVerbs.English[i]);
      vbsGer.push(germanVerbs.German[i])
  }
}
for (let i = 0; i < vbsGer.length; i++) {
    const element = vbsGer[i];
vbsWithIrr.push(element)
}
for (let i = 0; i < vbsWithIrr.length; i++) {
    for (let x = 0; x < irregularVerbs.verbs.length; x++) {
        if(vbsWithIrr[i] === irregularVerbs.verbs[x]){
            vbsWithIrr[i] = vbsGer[i]+","+irregularVerbs.present[x].toUpperCase()+","+irregularVerbs.imperfect[x].toUpperCase()+","+irregularVerbs.pp[x].toUpperCase();
        }
    }
    for (let y = 0; y < dat_Accus_Verbs.Verbs.length; y++) {
      if(vbsWithIrr[i] === dat_Accus_Verbs.Verbs[y].toUpperCase()){
        vbsWithIrr[i] +=   ","+dat_Accus_Verbs.Cases[y].toUpperCase()+"##"+dat_Accus_Verbs.Examples[y].toUpperCase();
      }
    }
    for (let m = 0; m < verbsWithPrep.Verbs.length; m++) {
      if(verbsWithPrep.Verbs[m].includes(vbsWithIrr[i].toLowerCase())){
        vbsWithIrr[i] +=   ","+verbsWithPrep.Prep[m].toUpperCase()+"**"+verbsWithPrep.Cases[m].toUpperCase()+"**"+verbsWithPrep.Examples[m].toUpperCase();
      }
    }
}
adjEng = [];
adjGer =[];
for(let i=0;i<Adjectives.German.length;i++){
  if(Adjectives.English[i].split(",").length >1){
      for(let x =0; x < Adjectives.English[i].split(",").length;x++){
          if(adjEng.includes(Adjectives.English[i].split(", ")[x])){
              adjEng.push(Adjectives.English[i].split(", ")[x]+"@"+x);
          }else adjEng.push(Adjectives.English[i].split(", ")[x])
          adjGer.push(Adjectives.German[i]);
      }
  }else{
      adjEng.push(Adjectives.English[i]);
      adjGer.push(Adjectives.German[i])
  }
}
eng = [];
ger =[];
for(let i=0;i<Pronouns.German.length;i++){
  if(Pronouns.German[i].split(",").length >1){
      for(let x =0; x < Pronouns.German[i].split(",").length;x++){
          if(ger.includes(Pronouns.German[i].split(", ")[x])){
              ger.push(Pronouns.German[i].split(", ")[x]+"@"+x);
          }else ger.push(Pronouns.German[i].split(", ")[x])
          eng.push(Pronouns.English[i]);
      }
  }else{
      eng.push(Pronouns.English[i]);
      ger.push(Pronouns.German[i])
  }
}

/**
* Creating vocabulary objects from English to German
*/
NounsFromEngToDe = Object.assign.apply({}, nounsEng.map( (v,i) => ({[v]: (nounsGer[i][0]+","+nounsGer[i][1]+","+nounsGer[i][2]).split(",")})));
VerbsFromEngToDe = Object.assign.apply({}, vbsEng.map( (v,i) => ({[v]: vbsWithIrr[i]})));
AdjectivesFromEngToDe = Object.assign.apply({}, adjEng.map( (v,i) => ({[v]: adjGer[i]})));
AdverbsFromEngToDe = Object.assign.apply({}, Adverbs.English.map( (v,i) => ({[v]: Adverbs.German[i]})));
PrepositionsFromEngToDe = Object.assign.apply({}, Prepositions.English.map( (v,i) => ({[v]: Prepositions.German[i]})));
PronounsFromEngToDe = Object.assign.apply({}, Pronouns.English.map( (v,i) => ({[v]: Pronouns.German[i]})));
ConjuncFromEngToDe = Object.assign.apply({}, Conjunctions.English.map( (v,i) => ({[v]: Conjunctions.German[i]})));
QuestionWordsFromEngToDe = Object.assign.apply({}, QuestionWords.English.map( (v,i) => ({[v]: QuestionWords.German[i]})));
commonFromEngToDE = Object.assign.apply({}, common2000.English.map( (v,i) => ({[v]: common2000.German[i]})));
/**
* Creating vocabulary objects from German to English
*/
NounsFromDeToEng = Object.assign.apply({}, gerSing.map( (v,i) => ({[v]: (nounsEng[i]+","+nounsGer[i][0]+","+nounsGer[i][2]).split(",")})));
VerbsFromDeToEng = Object.assign.apply({}, vbsGer.map( (v,i) => ({[v]: vbsEng[i]})));
AdjectivesFromDeToEng = Object.assign.apply({}, Adjectives.English.map( (v,i) => ({[v]: Adjectives.German[i]})));
AdverbsFromDeToEng = Object.assign.apply({}, Adverbs.German.map( (v,i) => ({[v]: Adverbs.English[i]})));
PrepositionsFromDeToEng = Object.assign.apply({}, Prepositions.German.map( (v,i) => ({[v]: Prepositions.English[i]})));
PronounsFromDeToEng = Object.assign.apply({}, Pronouns.German.map( (v,i) => ({[v]: Pronouns.English[i]})));
ConjuncFromDeToEng = Object.assign.apply({}, Conjunctions.German.map( (v,i) => ({[v]: Conjunctions.English[i]})));
QuestionWordsFromDeToEng = Object.assign.apply({}, QuestionWords.German.map( (v,i) => ({[v]: QuestionWords.English[i]})));
commonFromDeToEng = Object.assign.apply({}, common2000.German.map( (v,i) => ({[v]: common2000.English[i]})));

}

startingFunctions()
