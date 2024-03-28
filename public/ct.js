var randomNum;
var tries; 
var username;

function playGame() {
    username = document.getElementById("username").value;

    if (username.trim() === "") {
        alert("Please enter a username.");
        return;
    }

    document.getElementById("guessInput").style.display = "inline";
    document.getElementById("submitBtn").style.display = "inline";
    document.getElementById("username").style.display = "inline";
    document.getElementById("countBox").style.display = "inline";

    document.getElementById("guessInput").value = "";
    document.getElementById("result").innerHTML = "";

    randomNum = Math.floor(Math.random() * 10) + 1;
    tries = 0;
    updateCountBox();
}

function submitGuess() {
    var guess = parseInt(document.getElementById("guessInput").value);
    tries++;

    if (isNaN(guess)) {
        alert("Please enter a valid number.");
        return;
    }

    if (guess > randomNum) {
        document.getElementById("result").innerHTML = guess + " is too high! Try again, " + username;
    } else if (guess < randomNum) {
        document.getElementById("result").innerHTML = guess + " is too low! Try again, " + username;
    } else {
        document.getElementById("result").innerHTML = "Congratulations! The number is: " + randomNum + "<br>" + username + " You guessed it in " + tries + " tries.";
        document.getElementById("guessInput").style.display = "none";
        document.getElementById("submitBtn").style.display = "none";
        document.getElementById("countBox").style.display = "none";
        document.getElementById("username").value = "";

        addScore(username, tries);
    }

    updateCountBox();
}

function updateCountBox() {
    document.getElementById("countBox").innerHTML = tries;
}

function displayScoreboard() {
    fetch('/scores')
        .then(response => response.json())
        .then(scores => {
            var scoreboardElement = document.getElementById("scoreList");
            scoreboardElement.innerHTML = ""; // Clear existing scores
            scores.forEach(score => {
                var scoreEntry = document.createElement("li");
                scoreEntry.textContent = score.name + ": " + score.tries + " tries";
                scoreboardElement.appendChild(scoreEntry);
            });
        });
}

function addScore(name, tries) {
    fetch('/scores', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name, tries: tries }),
    })
    .then(response => response.json())
    .then(() => {
        displayScoreboard(); // Refresh the scoreboard
    });
}


function resetGame() {
    document.getElementById("username").value = "";
    document.getElementById("guessInput").style.display = "none";
    document.getElementById("submitBtn").style.display = "none";
    document.getElementById("countBox").style.display = "none";
    document.getElementById("result").innerHTML = "";

    randomNum = null;
    tries = 0;
    updateCountBox();

    // Send request to clear the scores on the server
    fetch('/clearScores', { method: 'POST' })
        .then(() => {
            displayScoreboard(); // Display updated (empty) scoreboard
        });
}


// Initially display the scoreboard when the page loads
displayScoreboard();
