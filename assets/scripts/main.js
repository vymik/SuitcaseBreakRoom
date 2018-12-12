"use strict";

let startGame = confirm("Press OK to start a game!");
let startTime;

if(startGame){
    let date = new Date();
    startTime = date.getTime();
}
console.log(startTime);
// 1. Paspaudus 8 kartus ant didelio raudono mygtuko įsijungia lemputė

let bigRedButton = document.querySelector("#bigRedButton");
let bigButtonCounter = 0;
let bigBulb = document.querySelector("#bigBulbImg");



let countClicks = () => {
    bigButtonCounter++;
    console.log(bigButtonCounter);
    if(bigButtonCounter>= 8){
        bigBulb.src = "assets/images/bulbon.png";
    }
    console.log(startTime);
}

bigRedButton.addEventListener("click", countClicks);
  
// 2. Paspaudus antrą ir trečią mygtukus dešinėje pusėje esančioje eilutėje 
//    atsidaro pirma kortelė ir užsidega lemputės

let topSmallButtons = document.querySelectorAll(".smallBulbButtons");
let topSmallBulbs = document.querySelectorAll(".topSmallBulbs");
let card1 = document.querySelector("#card1");
let butString = "";
let topButton1 = false;
let topButton2 = false;
let topButton3 = false;
let topButton4 = false;
let isBulbOn = false;


topSmallButtons.forEach(elem => {
    elem.addEventListener("click", () => {
        if (elem.id === "t2"){
            if(topButton2 === false) {
                topButton2 = true;
            } else {
                topButton2 = false;
            }
        } else if (elem.id === "t3") {
            if(topButton3 === false) {
                topButton3 = true;
            } else {
                topButton3 = false;
            }
        } else if (elem.id === "t1") {
            if(topButton1 === false) {
                topButton1 = true;
            } else {
                topButton1 = false;
            }
        } else if (elem.id === "t4") {
            if(topButton4 === false) {
                topButton4 = true;
            } else {
                topButton4 = false;
            }
        }
        elem.classList.toggle("activeButton");
        isClicked();
        console.log(topButton2, topButton3);
    })
})

let isClicked = () => {
    
    if(isBulbOn){
        topSmallBulbs.forEach((elem) => {
            elem.src = "assets/images/bulboff.png";
        });
        isBulbOn = false;
        card1.style.transform = "rotateY(-360deg)";
        card1.innerHTML = `<img src="assets/images/1.jpg" alt="1">`;
    }    
    if (topButton2 === true && topButton3 === true && topButton1 === false && topButton4 === false){
        topSmallBulbs.forEach((elem) => {
            elem.src = "assets/images/bulbon.png";
            console.log(elem);
        });
        isBulbOn = true;
        card1.style.transform = "rotateY(360deg)";
        card1.innerHTML = `<p>Prisimink skaičius</p>`;
    }         
}

// 3. Suspaudus 1,3,7,8,9 mygtukus, atsidaro antra kortelė

let bottomSmallButtons = document.querySelectorAll(".botSmallBulbButtons");
let clickedButtonArr = [];
let neededButtonsArr = ["b1", "b3", "b7", "b8", "b9"]; 
let test = false;
let card2 =  document.querySelector("#card2");
let isCardOpen = false;

bottomSmallButtons.forEach(elem => {
    elem.addEventListener("click", () => {
        elem.classList.toggle("activeButton");
        for(let i = 0; i < clickedButtonArr.length; i++){
            if(elem.id == clickedButtonArr[i]){
                clickedButtonArr.splice(i, 1);
                test = true;
            }
        }
        if(test === false){
            clickedButtonArr.push(elem.id);    
        }
        test = false;
        isAllButtonsClicked(); 
        console.log(clickedButtonArr);
    })
})

let isAllButtonsClicked = () => {
    let count = 0;

    if(isCardOpen){
        card2.style.transform = "rotateY(-360deg)";
        card2.innerHTML = `<img src="assets/images/2.jpg" alt="2">`;
        isCardOpen = false;
    }

    if(clickedButtonArr.length != neededButtonsArr.length){
        return;
    }
    for(let i = 0; i < neededButtonsArr.length; i++){
        for(let j = 0; j < clickedButtonArr.length; j++){
            if(neededButtonsArr[i] === clickedButtonArr[j]){
                count++;
            }
        }
    }
    if(count == neededButtonsArr.length){
        card2.style.transform = "rotateY(360deg)";
        card2.innerHTML = `<img src="assets/images/key.jpg" alt="key">`;
        isCardOpen = true;
    }
    console.log(count);
}

// 4.Kairėje esančioje skaičių lentelėje suspaudus 8, 2, 3, 1, 3, 7, 8, 9 ir 
//   paspaudus rodyklės mygtuką atsidaro klaustuko kortelė

let digits = document.querySelectorAll(".digits");
let neededDigitArr = ["8","2","3","1","3","7","8","9","➤"];
let clickedDigitArr= [];
let qCard = document.querySelector("#question");
let isQCardOpen = false;

digits.forEach((elem) => {
    elem.addEventListener("click", () => {
        elem.classList.toggle("activeDigit");
        console.log(elem.className);

        if(elem.className == "digits activeDigit"){
            clickedDigitArr.push(elem.textContent);
        } else {
            let index = clickedDigitArr.indexOf(elem.textContent);
            clickedDigitArr.splice(index, 1);
        }
  
        console.log(clickedDigitArr);
        console.log(neededDigitArr);
        isAllDigitsClicked();
    })
})

let isAllDigitsClicked = () => {
    let count = 0;

    if(isQCardOpen){
        qCard.style.transform = "rotateY(-360deg)";
        qCard.innerHTML = `<img src="assets/images/q.jpg" alt="q">`;
        isQCardOpen = false;
    }

    if(clickedDigitArr.length != neededDigitArr.length){
        return;
    }
    for(let i = 0; i < neededDigitArr.length; i++){
        for(let j = 0; j < clickedDigitArr.length; j++){
            if(neededDigitArr[i] === clickedDigitArr[j]){
                count++;
                neededDigitArr.splice(i, 1);
                // clickedDigitArr.splice(i, 1);
            }
        }
    }
    if(count == clickedDigitArr.length){
        qCard.style.transform = "rotateY(360deg)";
        qCard.innerHTML = `<img src="assets/images/lock.png" alt="lock">`;
        isQCardOpen = true;
    }
    console.log(count);
}

card2.addEventListener("click", () => {
    if(isQCardOpen){
        let date = new Date();
        let endTime = date.getTime();
        let gameTime = endTime - startTime;
        let minutes = Math.floor(gameTime /1000 / 60)
        let seconds = Math.floor(gameTime / 1000);

        alert("Sveikinu laimejus zaidima! \nJus uztrukote " + minutes + " min " + seconds + "sec");
    }
})