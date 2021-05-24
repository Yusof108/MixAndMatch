
//Global Declaration
let move = document.getElementById("move");
let display = document.querySelector(".cards");
let score = document.getElementById("score");
//let name = document.getElementById("name");
let playerName = document.getElementById("player");
let currentPlayer = [];
let pickedCard =[];
let cardPickId = [];
cardMatch = [];
cardMove =[];
const timer = document.getElementById('stopwatch');

let hideDiv = document.getElementById("rest");
hideDiv.addEventListener("click",hide);

//Array For cards
let cardsArr = [
    {
        name : "img1",
        img : "/images/img1.png"
    },
    {
        name : "img2",
        img : "/images/img2.png"
    },
    {
        name : "img3",
        img : "/images/img3.png"
    },
    {
        name : "img4",
        img : "/images/img4.png"
    },
    {
        name : "img5",
        img : "/images/img5.png"
    },
    {
        name : "img6",
        img : "/images/img6.png"
    },
    {
        name : "img1",
        img : "/images/img1.png"
    },
    {
        name : "img2",
        img : "/images/img2.png"
    },
    {
        name : "img3",
        img : "/images/img3.png"
    },
    {
        name : "img4",
        img : "/images/img4.png"
    },
    {
        name : "img5",
        img : "/images/img5.png"
    },
    {
        name : "img6",
        img : "/images/img6.png"
    },
];

//random function to randomly generate image
cardsArr.sort(() => 0.5 - Math.random());
console.log(cardsArr);

//function nextRound()
//creating new set of deck
function createDeck()
{
    cardsArr.sort(() => 0.5 - Math.random());
    for(let i =0; i < cardsArr.length; i++)
    {
        let cards = document.createElement("img");
        cards.setAttribute("src", "/images/default.png");
        cards.classList.add("back");
        cards.setAttribute("data-id",i);
        cards.addEventListener("click",flipped);
        display.appendChild(cards);
   
        
    }
    currentPlayer.push(playerName.value);
    
 
}

//Validation function for match,missmatch
function checkCard()
{
    startTimer();
    let allCard = document.querySelectorAll("img");
    let card1 = cardPickId[0];
  
    let card2 = cardPickId[1];
   

    if(pickedCard[0]===pickedCard[1] && card1 != card2)
    {
        
        allCard[card1].setAttribute("src","/images/check.png");
        allCard[card2].setAttribute("src","/images/check.png");
        allCard[card1].removeEventListener("click", flipped);
        allCard[card2].removeEventListener("click", flipped);
        cardMatch.push(pickedCard);
        cardMove.push(pickedCard);
    }
    else if(card1 == card2)
    {
        allCard[card1].setAttribute("src","/images/default.png");
        allCard[card2].setAttribute("src","/images/default.png");
        
    }
    else
    {
        allCard[card1].setAttribute("src","/images/default.png");
        allCard[card1].classList.replace("front","back");
        allCard[card2].setAttribute("src","/images/default.png");
        allCard[card2].classList.replace("front","back");
        cardMove.push(pickedCard);
    
       
    }
    pickedCard = [];
    cardPickId = [];
    
    
    //update the move and match on html
    score.textContent = cardMatch.length;
    move.textContent = cardMove.length

    //if all pair is found, call other function,stop timer, reset div,
    //replace the current div with new game div
    //save rank and update scorboard
    if(cardMatch.length === cardsArr.length/2)
    {
        stopTimer();
        reset();
        let getTime = timer.innerText;
        newGame();
        saveRank();
        updateTable();
        
       
        
    }
}

function newGame(){
    prompt("Thanks for playing");
    location.reload();
}



//clear new game div
function resetDiv()
{
    let news = document.getElementById("new");
    news.remove();
}

function resetDeck()
{
    let resetCard = document.getElementById("cards");
    resetCard.remove();
}


function reset(){
    cardMatch = [];
    while (display.hasChildNodes()) {
        display.removeChild(display.firstChild);
       
      }
}


// function for flipping the card
function flipped()
{
    
    let flip = this.getAttribute("data-id");
    pickedCard.push(cardsArr[flip].name);

    cardPickId.push(flip);
    //this.classList.replace("back","front");
    this.classList.add("flip");
    this.setAttribute("src",cardsArr[flip].img);
   
    
    if(pickedCard.length ===2){
        
        setTimeout(checkCard,500)
    }
}

function hide() {
    var x = document.getElementById("welcome");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

    

//Timer function


var hr = 0;
var min = 0;
var sec = 0;
var stoptime = true;

function startTimer() {
  if (stoptime == true) {
        stoptime = false;
        timerCycle();
    }
}
function stopTimer() {
  if (stoptime == false) {
    stoptime = true;
  }
}

function timerCycle() {
    if (stoptime == false) {
    sec = parseInt(sec);
    min = parseInt(min);
    hr = parseInt(hr);

    sec = sec + 1;

    if (sec == 60) {
      min = min + 1;
      sec = 0;
    }
    if (min == 60) {
      hr = hr + 1;
      min = 0;
      sec = 0;
    }

    if (sec < 10 || sec == 0) {
      sec = '0' + sec;
    }
    if (min < 10 || min == 0) {
      min = '0' + min;
    }
    if (hr < 10 || hr == 0) {
      hr = '0' + hr;
    }

    timer.innerHTML =`
        
        ${hr} : ${min} : ${sec} 
    ` 
    setTimeout("timerCycle()", 1000);
  }
}

function resetTimer() {
    timer.innerHTML = "00:00:00";
    score.innerHTML = "0";
    move.innerHTML = "0";   
    stoptime = true;
    hr = 0;
    sec = 0;
    min = 0;
}

let showRank = document.getElementById("ranking");

//setting array variable to save in local storage
function saveToLocal(name,time,move){
    this.name = name;
    this.time = time;
    this.move = move
}

//retrieving Data from local storage
function getData(){
    return localStorage.getItem("ranks") ? JSON.parse(localStorage.getItem("ranks")) : [];
}

//save to local Storage
function saveRank(){
    let name = currentPlayer[0];
    let getTime = timer.innerText;
    let getMove = move.innerText;

    if(name !== "" && getTime !=="")
        {
            let ranks = getData();
            let rankList = new saveToLocal(name,getTime,getMove);
            ranks.push(rankList);
            localStorage.setItem("ranks", JSON.stringify(ranks));
            
        }
}

//updating ScoreBoard funtion
function updateTable(rankList){
    
    let table = document.getElementById("rankContent");
    
    let ranks = getData();
    //console.log(ranks);
    let rankArr = [];
    //rankArr.push(ranks);
    //console.log(rankArr);
    function compare(a, b) {
        const timeA = a.time.toUpperCase();
        const timeB = b.time.toUpperCase();
      
        let comparison = 0;
        if (timeA > timeB) {
          comparison = 1;
        } else if (timeA < timeB) {
          comparison = -1;
        }
        return comparison;
      }
    
    
    
    let blank = "";
    //console.log(ranks);
    //ranks.sort(compare);
    ranks.length = 10;
    
        for( let rank of ranks){
            blank += `<tr><td>${rank.name}</td><td>${rank.time}</td><td>${rank.move}</td></tr>`;
        table.innerHTML = blank;
        }
       
    
  

}
updateTable();





