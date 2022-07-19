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

    return {getValAt , setValAt , toString};
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

console.log(`Name : ${player1.getName()} , plays as : ${player1.getSide()}`);