

let userMove = '';
let computerMove = '';
let result = '';
let game=JSON.parse(localStorage.getItem('game')) || {
    wins:0,
    looses:0,
    ties:0


};
let gameHistory=JSON.parse(localStorage.getItem('gameHistory'))|| [];
renderGameSummary();
renderGameHistory();
function captureUserMove(move){
    userMove=move;
}
function generateComputerMove() {
    const randnum = Math.random();
    if (randnum < 1 / 3) {
        computerMove = 'Rock';

    } else if (randnum < 2 / 3) {
        computerMove = 'Paper';
    }
    else {
        computerMove = 'Scissors';

    }
}
function evaluateMoves() {


    if (userMove === computerMove) {
        result = 'Tie';
    } else if ((userMove === 'Rock' && computerMove === 'Scissors')||(userMove === 'Paper' && computerMove === 'Rock') || (userMove === 'Scissors' && computerMove === 'Paper')){
        result = 'Win';

    }
    else {
        result = 'Loose';
    }
}
function renderGameSummary(){
    const gamePlayed=game.wins+game.looses+game.ties;
    console.log(` gamePlayed:${gamePlayed}`);
    document.getElementById('wins').innerHTML=game.wins;
    document.querySelector('#looses').innerHTML=game.looses;
    document.querySelector('#ties').innerHTML=game.ties;
    document.querySelector('#gamePlayed').innerHTML=gamePlayed;
    console.log(game);
    

}
function updateGameScores(){
    if(result==='Win'){
        game.wins++;
    }else if(result==='Tie'){
        game.ties++;
    }else{
        game.looses++;
    }
   const gameHistoryItem={userMove:userMove,computerMove:computerMove,result:result};
   gameHistory.push(gameHistoryItem);
   localStorage.setItem('game',JSON.stringify(game));
   localStorage.setItem('gameHistory',JSON.stringify(gameHistory));
}
function renderGameHistory(){
    let finalHistoryHTML=`
    <tr>
    <th>#</th>
    <th>User Move</th>
    <th>Computer Move</th>
    <th>Result</th>
    </tr>`;

    console.log(`userMove:${userMove} computerMove ${computerMove} result:${result}`);
    console.log(gameHistory);
    for(let i=gameHistory.length-1;i>=0;i--){
        finalHistoryHTML+= `
    <tr>
            <td>${gameHistory.length-i}</td>
            <td>${gameHistory[i].userMove}</td>
            <td>${gameHistory[i].computerMove}</td>
            <td>${gameHistory[i].result}</td>
    
    </tr>
    `;
    }
    document.querySelector('#gameHistroy').innerHTML=finalHistoryHTML;
    
}
function resetScore(){
game= {wins:0,
looses:0,
ties:0


};
gameHistory=[];
}
