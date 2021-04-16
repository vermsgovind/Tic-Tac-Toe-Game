const Xturn = "X"; // using this we can draw X(cross)
const Oturn = "O"; // using this we can draw O(circle)

var circleTurn; //Representing the turn (T means draw circle , F means draw cross)

const winning_combinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
const cellElements = document.querySelectorAll(".cell");// grasping all cells

startGame();

function startGame(){

 circleTurn = false;
 document.getElementById("turn").innerHTML = "X";
 cellElements.forEach(item =>{
    item.addEventListener("click", handleClick, {once:true} );
});

}



function handleClick(e){
    
    const cell = e.target;
    const currentTurn = circleTurn ? Oturn : Xturn;
    placeMark(cell, currentTurn);//place the mark

    //checking for win condition
    if(checkWin(currentTurn)){
        endGame();
    }
    else if(isDraw()){  //checking for draw condition
      let drawMatch = document.getElementById("winner");
      drawMatch.innerHTML = "Draw";
      document.getElementById("mybtn").style.visibility = "visible";
    }
    else{
     //if neither win nor draw then switch the turn
     swapTurns();
    console.log("clicked");
    }
    
}

function placeMark(cell, currentTurn){
     cell.innerHTML = currentTurn;
}
   
function swapTurns(){
    circleTurn = !circleTurn;
    if(circleTurn){
        document.getElementById("turn").innerHTML = "O";
    }
    else{
        document.getElementById("turn").innerHTML = "X";
    }

}

function checkWin(currentTurn){
    return winning_combinations.some(combination =>{
        return combination.every(index=>{
           return (cellElements[index].innerHTML == currentTurn);
        })
    })
}

function endGame(){
    // remove the click events 
    cellElements.forEach(item =>{
        item.removeEventListener("click", handleClick);
    });
    // show the winning message and restart button
        let win = document.getElementById("winner");
        win.innerHTML = `${circleTurn ? "O's":"X's"} Win's the game`; 
        document.getElementById("mybtn").style.visibility = "visible";               
}

function isDraw(){
 return [...cellElements].every(cell=>{
     return (cell.innerHTML == Oturn)||(cell.innerHTML ==Xturn);
 })
}