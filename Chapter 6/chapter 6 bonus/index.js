// Initialize game variables
var score = 0;
var lives = 3;

// Function to generate a random RGB color
function getRandomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

// Function to start the game
function startGame() {
    score = 0;
    lives = 3;
    document.getElementById("restart").classList.add("hidden");
    updateDisplay();
    nextRound();
}

// Function to update the display
function updateDisplay() {
    document.getElementById("score").innerText = "Score: " + score;
    document.getElementById("lives").innerText = "Lives: " + lives;
    document.getElementById("message").innerText = "";
}

// Function to handle the next round
function nextRound() {
    if (lives > 0) {
        var correctColor = getRandomColor();
        document.getElementById("rgb-value").innerText = "Guess the color: " + correctColor;
        displayColorOptions(correctColor);
    } else {
        endGame();
    }
}

// Function to display color options
function displayColorOptions(correctColor) {
    var colorOptionsDiv = document.getElementById("color-options");
    colorOptionsDiv.innerHTML = ""; // Clear previous options

    // Create an array of colors including the correct one
    var options = [correctColor];
    while (options.length < 3) {
        var randomColor = getRandomColor();
        if (options.indexOf(randomColor) === -1) {
            options.push(randomColor);
        }
    }

    // Shuffle the options
    options.sort(function() { return 0.5 - Math.random(); });

    // Create color option elements
    for (var i = 0; i < options.length; i++) {
        var colorDiv = document.createElement("div");
        colorDiv.className = "color-option";
        colorDiv.style.backgroundColor = options[i];
        colorDiv.setAttribute("data-color", options[i]); // Store color in data attribute
        colorDiv.onclick = function() {
            checkGuess(this.getAttribute("data-color"), correctColor);
        };
        colorOptionsDiv.appendChild(colorDiv);
    }
}

// Function to check the user's guess
function checkGuess(selectedColor, correctColor) {
    if (selectedColor === correctColor) {
        score++;
        document.getElementById("message").innerText = "Correct!";
    } else {
        lives--;
        document.getElementById("message").innerText = "Wrong! Try again.";
    }
    updateDisplay();
    nextRound();
}

// Function to end the game
function endGame() {
    document.getElementById("message").innerText = "Game Over! Your score: " + score;
    document.getElementById("restart").classList.remove("hidden");
}

// Start the game when the page loads
window.onload = startGame;