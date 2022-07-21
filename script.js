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

    const isEmpty = ()=>{
        let empty = true;
        board.forEach(cell => {
            if(cell === "X" || cell === "O"){
                empty = false;
            }
        });

        return empty;
    }

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

    return {getValAt , setValAt , toString, renderBoard, checkWin, resetBoard, isEmpty};
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

    const setSide = (c) =>{side = c};

    const toString =()=>{
        return {name,side};
    }

    return {getName, getSide,setSide,toString};
};

renderDisplay = ()=>{
    switch (flowControl.getTurn()) {
        case "X":
            if(player1.getSide() == "X"){
                displayPlayer.textContent = `${player1.getName()}'s turn`;
            }
            if(player2.getSide() == "X"){
                displayPlayer.textContent = `${player2.getName()}'s turn`;
            }
            break;
    
        case "O":
            if(player1.getSide() == "O"){
                displayPlayer.textContent = `${player1.getName()}'s turn`;
            }
            if(player2.getSide() == "O"){
                displayPlayer.textContent = `${player2.getName()}'s turn`;
            }
            break;
    
        default:
            break;
    }
}

let pageCells = document.querySelectorAll(".cell");
let displayPlayer = document.querySelector(".show-turn h2");

let player1 = PlayerFactory("Player 1","X");
let player2 = PlayerFactory("Player 2","O");

renderDisplay();

pageCells.forEach( cell => {
    cell.addEventListener('click', ()=>{
        let index = cell.getAttribute("index");
        GameBoard.setValAt(index, flowControl.getTurn());  
        GameBoard.renderBoard(document);
        flowControl.sideChange();
        renderDisplay();

        let status = GameBoard.checkWin();

        
        if(status === "win" || status === "draw"){
            flowControl.sideChange();
            switch (status) {
                case "win":
                    if(player1.getSide() === flowControl.getTurn()){
                        displayPlayer.textContent = `${player1.getName()} WINSSSSSSS `;
                    }
                    if(player2.getSide() === flowControl.getTurn()){
                        displayPlayer.textContent = `${player2.getName()} WINSSSSSSS`;
                    }
                    break;

                case "draw":
                    displayPlayer.textContent = "Draw";
                    break;

                default:
                    break;
            }

            GameBoard.resetBoard();
            flowControl.reset();
        }
        
    });
});

console.log(player1.toString() + " " + player2.toString());

document.querySelector(".first-player span").addEventListener("click",()=>{
    if(GameBoard.isEmpty()){
        let picks = document.querySelectorAll("span i");
        let player2pick =document.querySelector(".second-player span");
    
        if(picks[0].classList.contains("pick")){
            picks[0].classList.remove("pick");
            picks[1].classList.add("pick");
            player2pick.textContent = "X";  
            
            player1.setSide("O");
            player2.setSide("X");
        }
    
        else if(picks[1].classList.contains("pick")){
            picks[1].classList.remove("pick");
            picks[0].classList.add("pick");
            player2pick.textContent = "O";
    
            player1.setSide("X");
            player2.setSide("O");
        }
    
        renderDisplay();
    }
    else{
        console.log(GameBoard.isEmpty());
        alert("game in progress");
    }
    
});

document.querySelector(".reset").addEventListener('click', ()=>{
    flowControl.reset();    
    GameBoard.resetBoard();
    GameBoard.renderBoard(document);
    
});

