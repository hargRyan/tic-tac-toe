let board = ["","","","","","","","",""]; 



const player = (name, piece) => {

    const getName = () => name;
    const getPiece = () => piece;

    return {getName, getPiece};
}

const gameBoard = ( () => {
    
    const p1 = player('player1', "X");
    const p2 = player('player2', "O");
    
    let _currentTurn = p1.getName();
    let _currentPiece = p1.getPiece();
    let _isWinner = undefined;
    

    const getTurn = () => _currentTurn;
    const getPiece = () => _currentPiece;
    const getWinner = () => _isWinner;
    
    
    const setTurn = function () {
        if (_currentTurn === "player1") {
            _currentTurn = p2.getName();
        } else {
            _currentTurn = p1.getName();
        }
    }

    const setPiece = function () {
        if (_currentPiece === "X") {
            _currentPiece = p2.getPiece();
        } else {
            _currentPiece = p1.getPiece();
        }
    }

    let checkWin = () => {  //big ass ternary operator checking if a player wins after their move.

        //across the top row
        (board[0] === gameBoard.getPiece() 
        && board[1] === gameBoard.getPiece()
        && board[2] === gameBoard.getPiece()
        ||
        //down the left column
        board[0] === gameBoard.getPiece()
        && board[3] === gameBoard.getPiece()
        && board[6] === gameBoard.getPiece()
        ||
        // downwards right slash '\'
        board[0] === gameBoard.getPiece()
        && board[4] === gameBoard.getPiece()
        && board[8] === gameBoard.getPiece()
        ||
        // across the middle column
        board[1] === gameBoard.getPiece() 
        && board[4] === gameBoard.getPiece()
        && board[7] === gameBoard.getPiece()
        ||
        // down the right column
        board[2] === gameBoard.getPiece() 
        && board[5] === gameBoard.getPiece()
        && board[8] === gameBoard.getPiece()
        ||
        // downwards left slash '/'
        board[2] === gameBoard.getPiece() 
        && board[4] === gameBoard.getPiece()
        && board[6] === gameBoard.getPiece()
        ||
        // across the middle row
        board[3] === gameBoard.getPiece()
        && board[4] === gameBoard.getPiece()
        && board[5] === gameBoard.getPiece()
        ||
        //across the bottom row
        board[6] === gameBoard.getPiece()
        && board[7] === gameBoard.getPiece()
        && board[8] === gameBoard.getPiece() )? _isWinner = true: _isWinner = false;
    }
    
    return {
        getTurn, getPiece, setTurn, setPiece, checkWin, getWinner
    };
})();

const displayController = (() => {

    let _boardTile = 0;
    let _tttBoard = document.getElementById('ttt-grid-container');
    const initializeBoard = () => {

        board.forEach(function(square) {
            const div = document.createElement('div');
            div.classList.add('square');
            div.setAttribute('data-id', _boardTile);
            div.textContent = square;
            div.addEventListener('click', _test);
            _tttBoard.appendChild(div);
    
            _boardTile++;
        });
    }

    function _test(e) {
        let myEvent = e;
        let squareID = myEvent.target.getAttribute('data-id');
        
        if(board[squareID] === "") {
            board[squareID] = gameBoard.getPiece();
            myEvent.target.textContent = board[squareID];
            gameBoard.checkWin();
            
            if (gameBoard.getWinner()) {
                alert(`${gameBoard.getTurn()} wins!`);
                return;
            }
            
            gameBoard.setTurn();
            gameBoard.setPiece();
    
        }
            else return;
        
    }

    return {
        initializeBoard
    };
    
})();

//check win conditions for the current piece, if yes return true
//get the current piece, then check if the current piece is in those array positions



displayController.initializeBoard();

