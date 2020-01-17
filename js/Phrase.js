/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }

    // create li elements for phrase then append it to the page
    addPhraseToDisplay() {
        const phrase = this.phrase.split("");
        document.querySelector("#phrase ul").innerHTML = phrase
            .map(letter => {
                const cname = /[^a-z\d]$/i.test(letter) ? "space" : `hide letter ${letter}`;
                return `<li class="${cname}">${letter}</li>`;
            })
            .join("\n");
    }

    // checks if user input matches a letter in the phrase
    checkLetter(input) {
        return this.phrase
            .split("")
            .some(letter => letter == input);
    }

    /* get all letter nodes then convert the list into an array
     * filter array to only those that matches the player input
     * replace the hide class to show class
    */
    showMatchedLetter(input) {
        const letters = Array.from(document.getElementsByClassName("letter"));
        letters
            .filter(letter => letter.classList.contains(input))
            .forEach(li => li.classList.replace('hide', 'show'));
    }
}