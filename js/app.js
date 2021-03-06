/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

// declare variable to store the game
let game;

// declare the variable that will store the phrase in the last game session
let lastPhrase;

// declare variables needed for game timer
let endTimer = 0,
    counter = 0,
    intvl;

// Handler for set interval. this will be the game timer
function timer() {
    if(endTimer === counter) {
        clearInterval(intvl);
        game.gameOver(true);
    }

    const time = endTimer - counter;
    const min = Math.floor(time / 60).toString().padStart(2, "0");
    const sec = (time % 60).toString().padStart(2, "0");

    document.getElementById("timer").textContent = `${min}:${sec}`;
    counter++
}

// setup callback funuction for physical keyboard
function keyboard(e) {
    if(!/(^[a-z]$)/i.test(e.key) || !game.inGame) return;
    const key = e.key.toLowerCase();

    const button = Array.from(document.getElementsByClassName("key")).find(button => button.textContent == key);
    if(button && !button.disabled) game.handleInteraction(button);
}

/* add event listener for all buttons.
 * checks if button clicked is start button || keyboard
*/
document.querySelectorAll("button").forEach(button => {
    button.addEventListener('click', function() {
        if(this.id === "btn__reset") {
            document.getElementById("game-set").style.display = "none";
            document.getElementById("game-mode").style.display = "block";
            return;
        }

        if(this.parentNode.id == "game-mode") {
            game = new Game(this.textContent, lastPhrase);
            game.startGame();
            endTimer = game.level == "Hard" ? (5 * 60) : (10 * 60);
            counter = 0;
            timer();
            intvl = setInterval(timer, 1000);
            return;
        }

        if(this.className == "key") game.handleInteraction(this);
    });
});

/* add event listener for checkbox
 * enables physical keyboard on checked.
 * removes keyboard on not check
*/
document.querySelector("input[type=checkbox").addEventListener("change", function() {
    this.checked ? document.addEventListener("keyup", keyboard) : document.removeEventListener("keyup", keyboard);
});