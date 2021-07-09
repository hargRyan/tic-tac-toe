const gameBoard = (() => {
    let _board = []; //private variable?

    const getBoard = () => _board;

    return {
        getBoard,
    };
})();

const displayController = (() => {
    let _tttBoard = document.getElementById('ttt-grid-container');

    const initializeBoard = boardArray => {
        //get the boardArray
        //for each element in boardArray
            //create a div
            //add a class to it (square for example)
            //attach an event listener to the div to listen for a click
            //_tttboard.addchild(div)
        
        // function returns nothing
    }
})();

const player = (name) => {
    

    return {name};
}