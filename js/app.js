/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
// create instance Game class
const game = new Game();

// setup callback funuction for physical keyboard
function keyboard(e) {
    if(!/(^[a-z]$)/i.test(e.key) || !game.inGame) return;
    const key = e.key.toLowerCase();

    const button = Array.from(document.getElementsByClassName("key")).find(button => button.textContent == key);
    if(button && !button.disabled) game.handInteraction(button);
}

/* add event listener for all buttons.
 * checks if button clicked is start button || keyboard
*/
document.querySelectorAll("button").forEach(button => {
    button.addEventListener('click', function() {
        if(this.id === "btn__reset") {
            document.getElementById("game-set").style.display = "none";
            document.getElementById("mode").style.display = "";
            return;
        }

        if(this.parentNode.id == "mode") {
            game.startGame(this.textContent);
            return;
        }

        game.handInteraction(this);
    });
});

/* add event listener for checkbox
 * enables physical keyboard on checked.
 * removes keyboard on not check
*/
document.querySelector("input[type=checkbox").addEventListener("change", function() {
    this.checked ? document.addEventListener("keyup", keyboard) : document.removeEventListener("keyup", keyboard);
});