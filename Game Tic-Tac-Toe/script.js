// Get the squares and status display
const squares = document.querySelectorAll('.square');
const statusDisplay = document.getElementById('status');
const restartButton = document.getElementById('restartButton');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Function to handle the click event on squares
function handleSquareClick(index) {
    if (gameBoard[index] !== '' || !gameActive) return; // Ignore if already filled or game is over

    gameBoard[index] = currentPlayer;
    squares[index].textContent = currentPlayer;

    // Check for a win or a draw
    if (checkWinner()) {
        statusDisplay.textContent = `${currentPlayer} Wins!`;
        gameActive = false;
    } else if (gameBoard.every(square => square !== '')) {
        statusDisplay.textContent = 'It\'s a Draw!';
        gameActive = false;
    } else {
        // Switch player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.textContent = `${currentPlayer}'s Turn`;
    }
}

// Check for a winner by checking all possible win conditions
function checkWinner() {
    const winConditions = [
        [0, 1, 2], // row 1
        [3, 4, 5], // row 2
        [6, 7, 8], // row 3
        [0, 3, 6], // column 1
        [1, 4, 7], // column 2
        [2, 5, 8], // column 3
        [0, 4, 8], // diagonal
        [2, 4, 6]  // diagonal
    ];

    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return true;
        }
    }

    return false;
}

// Add event listeners to each square
squares.forEach((square, index) => {
    square.addEventListener('click', () => handleSquareClick(index));
});

// Restart the game
restartButton.addEventListener('click', restartGame);

function restartGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    statusDisplay.textContent = `${currentPlayer}'s Turn`;
    squares.forEach(square => {
        square.textContent = '';
    });
}

