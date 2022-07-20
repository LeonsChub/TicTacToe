const GameBoard =  (() => {
    let board = ["X","O","X"
                ," "," ","X"
                ," ","X"," "];

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

    const renderBoard = (doc) =>{
        pageCell = document.querySelectorAll(".cell");

       for (let index = 0; index < board.length; index++) {
            pageCell[index].textContent = board[index];
       }
    }

    return {getValAt , setValAt , toString, getBoard, renderBoard};
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

GameBoard.renderBoard();