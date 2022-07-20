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

const player1 = PlayerFactory("Jimmy", "O");
const player2 = PlayerFactory("Bimmy", "X");

let pageCells = document.querySelectorAll(".cell");

pageCells.forEach( cell => {
    cell.addEventListener('click', ()=>{
        let index = cell.getAttribute("index");

        GameBoard.setValAt(index, flowControl.getTurn());
        if(GameBoard.checkWin() === "win" || GameBoard.checkWin() === "draw"){
            GameBoard.renderBoard(document);
            alert(flowControl.getTurn() + " WINSSSSS");
            GameBoard.resetBoard();
        }
        flowControl.sideChange();
        GameBoard.renderBoard(document);
    });
});

GameBoard.checkWin();
