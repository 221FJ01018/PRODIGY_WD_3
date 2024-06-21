document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const restartButton = document.getElementById("restart-btn");
    const statusMessage = document.getElementById("status-message");

    let currentPlayer = "X";
    let gameActive = true;
    let gameState = ["", "", "", "", "", "", "", "", ""];

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleCellClick(cell, index) {
        if (gameState[index] !== "" || !gameActive) return;

        gameState[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer);

        if (checkWin()) {
            statusMessage.textContent = `${currentPlayer} wins!`;
            gameActive = false;
            return;
        }

        if (checkDraw()) {
            statusMessage.textContent = "It's a draw!";
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusMessage.textContent = `${currentPlayer}'s turn`;
    }

    function checkWin() {
        return winningConditions.some(condition => {
            return condition.every(index => {
                return gameState[index] === currentPlayer;
            });
        });
    }

    function checkDraw() {
        return gameState.every(cell => {
            return cell !== "";
        });
    }

    function restartGame() {
        currentPlayer = "X";
        gameActive = true;
        gameState = ["", "", "", "", "", "", "", "", ""];
        statusMessage.textContent = `${currentPlayer}'s turn`;

        cells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove("X", "O");
        });
    }

    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => handleCellClick(cell, index));
    });

    restartButton.addEventListener("click", restartGame);
});
