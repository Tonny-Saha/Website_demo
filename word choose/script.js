const inputs = document.querySelector(".input"),
 resetBtn  = document.querySelector(".button"),
 hint  = document.querySelector(".hint span"),
 guess  = document.querySelector(".guess span"),
 wrongLetter  = document.querySelector(".wrong-letters span"),

 typingInput  = document.querySelector(".typing-input");

 let word,maxGuesses, corrects = [], incorrects = [];


function randomWord() {
    let ranObj = wordList[Math.floor(Math.random() * wordList.length)];
     word = ranObj.word;
     maxGuesses = 8; corrects = []; incorrects = [];
    console.log(ranObj);
    hint.innerText = ranObj.hint;
    guess.innerText = maxGuesses;
    wrongLetter.innerText = incorrects;



    let html = "";
    for (let i = 0; i < word.length; i++) {
        html += `<input type="text" disabled>`;
 }
//  input.innerHTML +=  html;
 inputs.innerHTML = html;
}
randomWord();

function initGame(e){
    let key = e.target.value;
    if(key.match(/^[A-Za-z]+$/) && !incorrects.includes
    (` ${key}`) && !corrects.includes(key)){
        console.log(key);
        if(word.includes(key)){
            for (let i = 0; i < word.length; i++) {
                if (word[i] === key) {
                    corrects.push(key);
                    inputs.querySelectorAll("input")[i].value = key;
                }                
            }
        }else {
            maxGuesses--;
            incorrects.push(` ${key}`);
        }
        guess.innerText = maxGuesses;
        wrongLetter.innerText = incorrects;

    }
    typingInput.value = "";
    setTimeout(() =>{
        if (corrects.length=== word.length) {
            alert(`Congrats! You found the word ${word.toUpperCase()}`);
            randomWord();
        } else if(maxGuesses < 1) {
            alert("Game over! You don't have remaining guesse");
            for (let i = 0; i < word.length; i++) {
                inputs.querySelectorAll("input")[i].value = word[i];                
            }
        }
    })
}

resetBtn.addEventListener("click" , randomWord);
typingInput.addEventListener("input" , initGame);
document.addEventListener("keydown" , () => typingInput.focus());