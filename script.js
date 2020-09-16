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

squares.forEach(square => squareset.push(square.id));

function rndSq(set) {
    return set[Math.floor(Math.random()* set.length)];
}

let randomSquare = rndSq(squareset);

squares.forEach(square => {
    square.addEventListener('click', countScore);
})

function showCoords(e){
    console.log(e.target.id);
}

start.addEventListener('click', ()=>{
    startCountdown(3)}
);

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
    start.disabled = true;
}

function startGame(){
    board.style.pointerEvents = 'all';
    squareToMatch.innerText = randomSquare;
    timeLeft.style.display = 'block';
    timerCount(20);
}

let score = 0;
let tries = 0;

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
    let accuracyPercentage = Math.round((score/tries)*100); 
    total.innerHTML = score;
    accuracy.innerHTML = `${accuracyPercentage}%`;

    // countAccuracy(accuracyPercentage);
    
}

function countAccuracy(value){
    if(value < 50){
        accuracyBox.classList.remove('medium');
        accuracyBox.classList.remove('correct');
        accuracyBox.classList.add('low');
    } else if (value < 75){
        accuracyBox.classList.remove('low');
        accuracyBox.classList.remove('correct');
        accuracyBox.classList.add('medium')
    } else{
        accuracyBox.classList.remove('medium');
        accuracyBox.classList.remove('low');
        accuracyBox.classList.add('correct');
    }
}

function timerCount(time){
    if(time === 0){
        endGame();
    }
    let width = 100;
    let duration = 20;
    setTimeout(()=>{
        timerCount(--time);
    }, 1000)

    timeLeft.style.width = (time/20)*100 + '%';

}

function endGame(){
    timeLeft.style.display = 'none';
    squareToMatch.innerHTML = '';
    tries = 0;
    score = 0;
    board.style.pointerEvents = 'none';
    start.disabled = false;
}
