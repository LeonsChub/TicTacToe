const GameBoard =  (() => {
    let board = [" "," "," "
                ," "," "," "
                ," "," "," "];

    const getValAt = (index) => { 
        if (index > 8) {
            return undefined;
        }
        return board[index];
    };

    const setValAt = (index, val) => {
        if (index > 8 || (val !== 'X' & val !== 'O')) {
            return false;
        }
        else{
            if( getValAt(index) === " " ) {
                board[index] = val;
                return true;
            }
        }
        return false;
    }

    const getBoard = () =>{
        return board;
    }

    const toString = ()=>{
        let str = "";
        for (let index = 0; index < board.length; index++) {
            str += board[index];
            if ((index + 1) % 3 == 0) {
                str += "\n";
            }
        }
        return str;
    };

    const isFull = ()=>{
        full = true;

        board.forEach(cell => {
            if(cell === " "){
                full = false;
            }
        });

        return full;
    }

    const renderBoard = (doc) =>{
        let pageCells = doc.querySelectorAll(".cell");

        for (let index = 0; index < board.length; index++) {
            pageCells[index].textContent = board[index];
       }
    };

    const resetBoard = () =>{
        board = [" "," "," "
                ," "," "," "
                ," "," "," "];
    };

    const checkWin = () =>{
        const winningPos = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
        let status = "";

        winningPos.forEach(pos => {
                if((board[pos[0]] === board[pos[1]] & board[pos[0]] === board[pos[2]]) & board[pos[0]] !== " "){
                    status = "win";
                }
            });

            full = isFull();
            if(full & status === ""){
                status = "draw"
            }

            return status;
    };

    return {getValAt , setValAt , toString, renderBoard, checkWin, resetBoard};
    })();

const flowControl = (() => {
    let turn = "X";

    const sideChange = ()=>{
        switch (turn) {
            case "X":
                turn = "O"
                break;
            
            case "O":
                turn = "X"
                break;

            default:
                break;
        }
        
    };

    const getTurn = ()=> {
        return turn;
    }

    const reset = ()=> {
        turn = "X";
    }

    return {sideChange, getTurn, reset};
})();

const PlayerFactory = (name, side) =>{

    if (side !== "X" && side !== "O") {
        return undefined;
    }

    const getName = () => name;
    const getSide = () => side;

    return {getName, getSide};
};

let pageCells = document.querySelectorAll(".cell");

pageCells.forEach( cell => {
    cell.addEventListener('click', ()=>{
        let index = cell.getAttribute("index");
        GameBoard.setValAt(index, flowControl.getTurn());  
        GameBoard.renderBoard(document);
        
        let status = GameBoard.checkWin();
        
        if(status === "win" || status === "draw"){
            
            GameBoard.resetBoard(document);
        }
        flowControl.sideChange();
        
    });
});

document.querySelector(".first-player span").addEventListener("click",()=>{
    let picks = document.querySelectorAll("span i");
    let player2pick =document.querySelector(".second-player span");

    if(picks[0].classList.contains("pick")){
        picks[0].classList.remove("pick");
        picks[1].classList.add("pick");
        player2pick.textContent = "O";
        
    }
    else{
        picks[1].classList.remove("pick");
        picks[0].classList.add("pick");
        player2pick.textContent = "X";
    }
});

document.querySelector(".reset").addEventListener('click', ()=>{
    flowControl.reset();
    
    GameBoard.resetBoard();
    GameBoard.renderBoard(document);
    
});

