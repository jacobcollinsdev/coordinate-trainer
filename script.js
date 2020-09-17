const board = document.querySelector('.board');
const squares = document.querySelectorAll('.square');
const squareset = [];
const start = document.querySelector('.start-btn');
let squareToMatch = document.querySelector('.target-square');
const total = document.querySelector('.score');
const accuracy = document.querySelector('.percentage');
const accuracyBox = document.querySelector('.accuracy-box');
const scoreBox = document.querySelector('.score-box');
const timeLeft = document.querySelector('.time-progress');
const message = document.querySelector('.message');
const audio = document.querySelector('audio');
const settings = document.querySelector('.cog');
const modal = document.querySelector('.modal');
const soundToggle = document.querySelector('.sound-toggle');
const hintsToggle = document.querySelector('.hints-toggle');
const files = document.querySelectorAll('.file');
const ranks = document.querySelectorAll('.rank');
const close = document.querySelector('.close');
const results = document.querySelector('.results');
const resultsTable = document.querySelector('.results-table');

squares.forEach(square => squareset.push(square.id));

//Generate random coordinate
function rndSq(set) {
    return set[Math.floor(Math.random()* set.length)];
}

let randomSquare = rndSq(squareset);

squares.forEach(square => {
    square.addEventListener('click', countScore);
})

start.addEventListener('click', ()=>{
    startCountdown(3)}
);

//Start 321 Countdown
let count = 3;

function startCountdown(count){
    if(count === 0){
        startGame();
    }else{
        squareToMatch.innerText = count;
        setTimeout(function(){
            startCountdown(--count)}
            , 1000);
    }
    if(soundToggle.checked){
        audio.play();
    }
    start.disabled = true;
    message.style.display = 'none';
    scoreBox.classList.remove('incorrect');
    scoreBox.classList.remove('correct');
    total.innerHTML = 0;
    accuracy.innerHTML = '%';
}

//Game Duration
let duration = 20;

//Start Game
function startGame(){
    board.style.pointerEvents = 'all';
    squareToMatch.innerText = randomSquare;
    timeLeft.style.display = 'block';
    timerCount(duration);
}

//Count Score and Accuracy
let score = 0;
let tries = 0;
let accuracyPercentage;

function countScore(e) {
    if(e.target.id == randomSquare) {
        score++;
        scoreBox.classList.remove('incorrect');
        scoreBox.classList.add('correct');
    } else {       
        scoreBox.classList.add('incorrect');
        scoreBox.classList.remove('correct');
    };
    randomSquare = rndSq(squareset);
    squareToMatch.innerHTML = randomSquare;
    tries++;
    accuracyPercentage = Math.round((score/tries)*100); 
    total.innerHTML = score;
    accuracy.innerHTML = `${accuracyPercentage}%`;
}

//Countdown bar
function timerCount(time){
    if(time === 0){
        endGame();
    }
    let width = 100;
    setTimeout(()=>{
        timerCount(--time);
    }, 1000)

    timeLeft.style.width = (time/duration)*100 + '%';
}

//Reset Scores and Styles
function endGame(){
    updateTable();
    timeLeft.style.display = 'none';
    squareToMatch.innerHTML = '';
    tries = 0;
    score = 0;
    board.style.pointerEvents = 'none';
    start.disabled = false;
    results.style.display = 'block';
}

//Update Results Table
let attempts = 0;

function updateTable(){
    attempts++;
    let newRow = resultsTable.insertRow(-1);
    let cell1 = newRow.insertCell(0);
    let cell2 = newRow.insertCell(1);
    let cell3 = newRow.insertCell(2);

    cell1.innerHTML = attempts;
    cell2.innerHTML = score;
    cell3.innerHTML = `${accuracyPercentage}%`;
}

//Game Settings & Modal Toggle
hintsToggle.addEventListener('click', ()=>{
    if(hintsToggle.checked){
        files.forEach(file => file.style.display = 'block');
        ranks.forEach(rank => rank.style.display = 'block');       
    }else{
        files.forEach(file => file.style.display = 'none');
        ranks.forEach(rank => rank.style.display = 'none');   
    }
})

settings.addEventListener('click', ()=>{
    modal.style.display = 'flex';
})

modal.addEventListener('click', (e)=>{
    if(e.target.className == 'modal'){
        modal.style.display = 'none';
    }
})

close.addEventListener('click', ()=>{
    modal.style.display = 'none';
})

