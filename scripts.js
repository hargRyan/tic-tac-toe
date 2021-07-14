
const player = (name, piece) => {

    const getName = () => name;
    const getPiece = () => piece;
    function setName(newName) {
        name = newName;
    }

    return {getName, getPiece, setName};
}

const gameBoard = ( () => {

    let _board = ["","","","","","","","",""]; 
    
    const p1 = player('player1', "X");
    const p2 = player('player2', "O");
    
    let _currentTurn = p1;
    let _isWinner = undefined;
    let _isTie = undefined;
    

    const getTurn = () => _currentTurn;
    const getPiece = () => _currentTurn.getPiece();
    const getWinner = () => _isWinner;
    const getTie = () => _isTie;
    const getBoard = () => _board; 
    const getp1 = () => p1;
    const getp2 = () => p2;
    
    
    const setTurn = function () {
        if (_currentTurn === p1) {
            _currentTurn = p2;
        } else {
            _currentTurn = p1;
        }
    }

    let checkWin = () => {  //ternary operator checking if current player has 3 in a row in legal spaces.

        //across the top row
        (_board[0] === getPiece() 
        && _board[1] === getPiece()
        && _board[2] === getPiece()
        ||
        //down the left column
        _board[0] === getPiece()
        && _board[3] === getPiece()
        && _board[6] === getPiece()
        ||
        // downwards right slash '\'
        _board[0] === getPiece()
        && _board[4] === getPiece()
        && _board[8] === getPiece()
        ||
        // across the middle column
        _board[1] === getPiece() 
        && _board[4] === getPiece()
        && _board[7] === getPiece()
        ||
        // down the right column
        _board[2] === getPiece() 
        && _board[5] === getPiece()
        && _board[8] === getPiece()
        ||
        // downwards left slash '/'
        _board[2] === getPiece() 
        && _board[4] === getPiece()
        && _board[6] === getPiece()
        ||
        // across the middle row
        _board[3] === getPiece()
        && _board[4] === getPiece()
        && _board[5] === getPiece()
        ||
        //across the bottom row
        _board[6] === getPiece()
        && _board[7] === getPiece()
        && _board[8] === getPiece() )? _isWinner = true: _isWinner = false;
    }
    
    let checkTie = () => (_board.includes(''))? _isTie = false : _isTie = true;

    const resetBoard = function () {
        
        _isTie = undefined;
        _isWinner = undefined;
        let squares = Array.from(document.getElementsByClassName('square'));

        for (let i = 0; i < _board.length; i++) { //resets _board array to blank
            _board[i] = "";
            squares[i].textContent = "";
          }
        
    }

    return {
        getTurn, 
        getPiece, 
        setTurn,  
        checkWin, 
        getWinner, 
        checkTie, 
        getTie, 
        getBoard, 
        resetBoard,
        getp1,
        getp2
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
                alert(`${gameBoard.getTurn().getName()} wins!`);
                return;
            }
            
            gameBoard.checkTie();

            if (gameBoard.getTie()) {
                alert("It's a tie!");
                return;
            }

            gameBoard.setTurn();
    
        }
            else return;
        
    }

    function newGame() { // binds to button, resets the board, binds player names

        const ngButton = document.getElementById('new-game');
        ngButton.addEventListener('click',() => {
            gameBoard.resetBoard();
            gameBoard.getp1().setName(prompt('Set the first players name.', "Player 1"));
            gameBoard.getp2().setName(prompt('Set the second players name.', "Player 2")); 
        } );

    }

    function reset() { //adds board.resetBoard to the reset button

        const resetButton = document.getElementById('reset');
        resetButton.addEventListener('click', gameBoard.resetBoard);        
    }

    return {
        newGame,
        reset,
        initializeBoard
    };
    
})();

window.addEventListener('load', displayController.initializeBoard);
displayController.newGame();
//newgame button currently has no listener, figure out what to do with that later.
