const squareset = [];
const squares = document.querySelectorAll('.square');
const start = document.querySelector('.start-btn');
let squareToMatch = document.querySelector('.target-square');

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
}

function startGame(){
    console.log('game started')
    squareToMatch.innerText = randomSquare;
}

let score = 0;

function countScore(e) {
    if(e.target.id == randomSquare) {
        score++
        // stats.innerHTML = score;
        randomSquare = rndSq(squareset);
        squareToMatch.innerHTML = randomSquare;
    } else {
        // stats.innerHTML = score;
        randomSquare = rndSq(squareset);
        squareToMatch.innerHTML = randomSquare;
    };
}
