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

    let checkWin = () => {  //ternary operator checking if current player has 3 in a row in legal spaces.

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
    const initializeBoard = () => { /* adds 9 divs to container to make the game grid
        then adds a click listener to each div, increases _boardTile by 1 after each div created */ 

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

    function _test(e) { /* sets the current players piece in the clicked div if the array index
        is empty, checks for a winner after each move, then sets the turn and piece to the next
        player if the last player didn't win on that turn */
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


displayController.initializeBoard();

