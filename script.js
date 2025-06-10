let score = 0;
let tiles = [];
let gameLoop = null;

const startBtn = document.getElementById("startBtn");
const board = document.querySelector("#game-board");
const scoreDisplay = document.getElementById("scoreDisplay");

function addRow() {
    const blacktileIndex = Math.floor(Math.random() * 4); // used ChatGPT to help figure out how to pick a random index from 0 to 3

    for (let i = 0; i < 4; i++) {
        const tile = document.createElement("div");
        tile.classList.add("tile");

        if (i === blacktileIndex) {
            tile.classList.add("black");
            tile.dataset.hit = "false";
        } else {
            tile.classList.add("white");
        }

        board.prepend(tile);
        tiles.unshift(tile);
    }
}

function moveTiles() {
    addRow();

    if (tiles.length > 24) {
        const removedTiles = tiles.splice(-4, 4);

        // Asked ChatGPT how to chekc if the tile was clikced before it leaves the screen
        for (let tile of removedTiles) {
            if (tile.classList.contains("black") && tile.dataset.hit === "false") {
                endGame();
                return;
            }
        }

        for (let tile of removedTiles) {
            board.removeChild(tile);
        }
    }
}

function handleClick(event) {
    const tile = event.target;

    if (tile.classList.contains("black") && tile.dataset.hit === "false") {
        tile.style.opacity = "0.5"; // Fades black into grey to indicate player has hit button
        tile.dataset.hit = "true";
        score++;
        scoreDisplay.textContent = "Score: " + score;
    } else if (tile.classList.contains("white")) {
        endGame();
    }
}

function startGame() {
    board.innerHTML = "";
    tiles = [];
    score = 0;
    scoreDisplay.textContent = "Score: 0";

    for (let i = 0; i < 6; i++) addRow();

    if (gameLoop) clearInterval(gameLoop);
    setTimeout(() => { // Googled setTimeout
        gameLoop = setInterval(moveTiles, 1000);
    }, 1000); // Asked ChatGPT how to apply it

    startBtn.disabled = true; // Stops spam clicking
}

function endGame() {
    clearInterval(gameLoop);

    alert("Game Over! Your score: " + score);

    startBtn.disabled = false; // Allows to start again (had to ask ChatGPT for help because the button started bugging out my game)
}

board.addEventListener("click", handleClick);
startBtn.addEventListener("click", startGame);
