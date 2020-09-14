const squareset = [];
const squares = document.querySelectorAll('.square');
const start = document.querySelector('.start-btn');
const squareToMatch = document.querySelector('.target-square');

squares.forEach(square => squareset.push(square.id));
console.log(squareset);

squares.forEach(square => {
    square.addEventListener('click', showCoords);
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
}
