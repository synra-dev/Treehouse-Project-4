class Game {
    // set Game properties
    constructor(level, lastPhrase) {
        this.missed = 0;
        this.level = level;
        this.phrases = this.createPhrase();
        this.activePhrase = null;
        this.lastPhrase = lastPhrase;
        this.inGame = false;
    }

    // Sets the basic configuration for the game each time it's called
    startGame() {
        Array.from(document.getElementsByClassName("key")).forEach(key => {
            key.removeAttribute("disabled");
            key.className = "key";
        });

        Array.from(document.querySelectorAll("img[src$='Heart.png']")).forEach(heart => {
            heart.src = "images/liveHeart.png";
        });

        this.inGame = true;
        this.activePhrase = new Phrase(this.getRandomPhrase());
        document.getElementById("overlay").style.display = "none";
        document.getElementById("game-mode").style.display = "none";
        document.getElementById("kbox").checked = '';
        document.removeEventListener("keyup", keyboard)
        this.activePhrase.addPhraseToDisplay();
    }

    // checks if user input matches a letter in the phrase
    handleInteraction(input) {
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
    gameOver(timeout = false) {
        const msg = document.getElementById("game-over-message")
        document.getElementById("overlay").style.display = "flex";
        document.getElementById("game-set").style.display = "";
        if(this.missed === 5 || timeout) {
            msg.textContent = "Game Over! you lose...";
        } else {
            msg.textContent = "Congratulations! you win <3";
        }
        clearInterval(intvl);
        lastPhrase = this.activePhrase;
        this.inGame = false;
    }

    /* send ajax request to get list of phrases in json format.
     * filter list depending on the game mode selected
     * returns the phrase list
    */
    createPhrase() {
        /*

         ******************************************************************
         *  Uses Ajax to send request to the API for the list of phrases  *
         *  uncomment this line if yuo want to use thi feature            *
         *                                                                *
         *  WARNING: Enabling this feature would require the user         *
         *           to run the program on a web server                   *
         ******************************************************************
            const xhr = new XMLHttpRequest();
            let pList;
            xhr.onreadystatechange = () => {  
                if(xhr.readyState !== 4) return;       
                const phrases = JSON.parse(xhr.responseText).words;
                pList = phrases.filter(phrase => {
                    if(!/^[a-z\s]+$/i.test(phrase)) return;

                    const letters = phrase.replace(/\s/, "").split("");
                    if(this.level === "Hard") {
                        return letters.length > 22;
                    } else if(this.level === "Normal") {
                        return letters.length > 12 && letters.length <= 22;
                    } else {
                        return letters.length <= 12;
                    }

                });
            }

            xhr.open("GET", "api/", false);
            xhr.send();

            return pList; */

        /*
         * returns phrase list depending on the choosen game level
         * comment the code below if you're planning to use the program abov
        */
        return list.filter(phrase => {
            const letters = phrase.split("");
            
            if(this.level === "Hard") {
                return letters.length > 22;
            } else if(this.level === "Normal") {
                return letters.length > 12 && letters.length <= 22;
            } else {
                return letters.length <= 12;
            }
        });
    }

    // selects a random phrase on the list of phrase. return a phrase as output 
    getRandomPhrase() {
        let rand;
        while(this.phrases[rand] === this.lastPhrase || rand == undefined) rand = Math.floor(Math.random() * this.phrases.length);

        return this.phrases[rand];
    }
}