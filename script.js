const GameBoard =  (() => {
    //let board = () => console.log(`hello my name is ${name}`);

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

    console.log(GameBoard.setValAt(8,'X'));

    console.log(GameBoard.toString())