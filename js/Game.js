class Game {
    // set Game properties
    constructor() {
        this.missed = null;
        this.phrases = [];
        this.activePhrase = null;
        this.inGame = false;
    }

    // Sets the basic configuration for the game each time it's called
    startGame(mode) {
        Array.from(document.getElementsByClassName("key")).forEach(key => {
            key.removeAttribute("disabled");
            key.className = "key";
        });
            
        Array.from(document.querySelectorAll("img[src*='Heart.png']")).forEach(heart => {
            heart.src = "images/liveHeart.png";
        });
        
        this.missed = 0;
        this.inGame = true;
        this.phrases = this.createPhrase(mode);
        this.activePhrase = new Phrase(this.getRandomPhrase());
        document.getElementById("overlay").style.display = "none";
        document.getElementById("mode").style.display = "none";
        document.getElementById("kbox").checked = '';
        this.activePhrase.addPhraseToDisplay();
    }

    // checks if user input matches a letter in the phrase
    handInteraction(input) {
        input.disabled = true;
        if(this.activePhrase.checkLetter(input.textContent)) {
            input.classList.add("chosen");
            this.activePhrase.showMatchedLetter(input.textContent);
            if(this.checkForWin()) this.gameOver();

        } else {
            input.classList.add("wrong");
            this.removeLife();
        }
    }

    // changes heart img && incriment missed property
    removeLife() {
        Array.from(document.querySelectorAll("img[src$='liveHeart.png']")).pop().src = "images/lostHeart.png";
        this.missed++;
        if(this.missed === 5) this.gameOver();
    }

    // checks if all letters in phrase has been matched. returns the output of check
    checkForWin() {
        return Array.from(document.getElementsByClassName("letter")).every(letter => letter.classList.contains("show"));
    }

    // stops game if player matched all letters in phrase or loses 5 hearts
    gameOver() {
        const msg = document.getElementById("game-over-message")
        document.getElementById("overlay").style.display = "flex";
        document.getElementById("game-set").style.display = "";
        if(this.missed === 5) {
            msg.textContent = "Game Over! you lose...";
        } else {
            msg.textContent = "Congratulations! you win <3";
        }

        this.inGame = false;
    }

    /* send ajax request to get list of phrases in json format.
     * filter list depending on the game mode selected
     * returns the phrase list
    */
    createPhrase(mode) {
        const xhr = new XMLHttpRequest();
        let pList;
        xhr.onreadystatechange = () => {  
            if(xhr.readyState !== 4) return;       
            const phrases = JSON.parse(xhr.responseText).words;
            pList = phrases.filter(phrase => /^[a-z0-9\s\.]+$/i.test(phrase));
        }

        xhr.open("GET", "api/", false);
        xhr.send();

        if(mode == "Hard") {
            pList = pList.filter(phrase => phrase.split(" ").length > 5);
        } else if(mode == "Normal") {
            pList = pList.filter(phrase => phrase.split(" ").length > 3 && phrase.split(" ").length <= 5);
        } else {
            pList = pList.filter(phrase => phrase.split(" ").length <= 3);
        }

        return pList;
    }

    // selects a random phrase on the list of phrase. return a phrase as output 
    getRandomPhrase() {
         const rand = Math.floor(Math.random() * this.phrases.length)
         return this.phrases[rand];
    }
}
