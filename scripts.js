
const player = (name, piece) => {

    const getName = () => name;
    const getPiece = () => piece;

    return {getName, getPiece};
}

const gameBoard = ( () => {

    let _board = ["","","","","","","","",""]; 
    
    const p1 = player('player1', "X");
    const p2 = player('player2', "O");
    
    let _currentTurn = p1.getName();
    let _currentPiece = p1.getPiece();
    let _isWinner = undefined;
    let _isTie = undefined;
    

    const getTurn = () => _currentTurn;
    const getPiece = () => _currentPiece;
    const getWinner = () => _isWinner;
    const getTie = () => _isTie;
    const getBoard = () => _board; 
    
    
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
        (_board[0] === gameBoard.getPiece() 
        && _board[1] === gameBoard.getPiece()
        && _board[2] === gameBoard.getPiece()
        ||
        //down the left column
        _board[0] === gameBoard.getPiece()
        && _board[3] === gameBoard.getPiece()
        && _board[6] === gameBoard.getPiece()
        ||
        // downwards right slash '\'
        _board[0] === gameBoard.getPiece()
        && _board[4] === gameBoard.getPiece()
        && _board[8] === gameBoard.getPiece()
        ||
        // across the middle column
        _board[1] === gameBoard.getPiece() 
        && _board[4] === gameBoard.getPiece()
        && _board[7] === gameBoard.getPiece()
        ||
        // down the right column
        _board[2] === gameBoard.getPiece() 
        && _board[5] === gameBoard.getPiece()
        && _board[8] === gameBoard.getPiece()
        ||
        // downwards left slash '/'
        _board[2] === gameBoard.getPiece() 
        && _board[4] === gameBoard.getPiece()
        && _board[6] === gameBoard.getPiece()
        ||
        // across the middle row
        _board[3] === gameBoard.getPiece()
        && _board[4] === gameBoard.getPiece()
        && _board[5] === gameBoard.getPiece()
        ||
        //across the bottom row
        _board[6] === gameBoard.getPiece()
        && _board[7] === gameBoard.getPiece()
        && _board[8] === gameBoard.getPiece() )? _isWinner = true: _isWinner = false;
    }
    
    let checkTie = () => (_board.includes(''))? _isTie = false : _isTie = true;

    return {
        getTurn, getPiece, setTurn, setPiece, checkWin, getWinner, checkTie, getTie, getBoard
    };
})();

const displayController = (() => {

    let board = gameBoard.getBoard();
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
            
            gameBoard.checkTie();

            if (gameBoard.getTie()) {
                alert("It's a tie!");
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

