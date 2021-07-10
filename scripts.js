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

    const getTurn = () => _currentTurn;
    const getPiece = () => _currentPiece;
    
    
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

    return {
        getTurn, getPiece, setTurn, setPiece
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



