const gameBoard = (() => {
    

    const getBoard = () => _board;

    return {
        getBoard,
    };
})();

const displayController = (() => {

    
})();

const player = (name) => {
    

    return {name};
}

let board = ["","","","","","","","",""]; 
let tttBoard = document.getElementById('ttt-grid-container');

const initializeBoard = () => {

    board.forEach(function(square) {
        const div = document.createElement('div');
        div.classList.add('square');
        div.textContent = square;
        div.addEventListener('click', test);
        tttBoard.appendChild(div);
    });
}

function test() {
    console.log("success");
}

