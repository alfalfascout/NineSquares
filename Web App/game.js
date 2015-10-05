var buttons = [];
var i = 0;
affectsSelf = false;

function turnButton(n) {
    /* Turns the button on if it's off, and vice versa. */
    var btx = "b" + n;
    var btn = document.getElementById(btx);
    if (btn.getAttribute("class") === "button off") {
        btn.setAttribute("class", "button on");
    }
    else {
        btn.setAttribute("class", "button off");
    }
}

function turnAffects(bvar) {
    /* Should turn all the buttons that a given button affects. */
    for (j in bvar) {
        turnButton(bvar[j]);
    }
}

function pressButton(bvar) {
    /* Turn all the buttons a given button affects.
        If that turn won the game, tell the player. */
    turnAffects(bvar);
    if (checkWin()) {
        var msg = document.getElementById("message");
        msg.textContent = "You won!";
    }
}

function randomAffects() {
    /* This should add a random selection of 0-8 to an array
        and return the array to be held in one of the buttons */
    var affectsArray = [];
    for (var j = 0; j < 9; j++) {
        var randomizer = (Math.random() * (3 - 0) + 0);
        if (randomizer >= 2) {
            affectsArray.push(j);
            if (j === i) {
                affectsSelf = true;
            }
        }
    }
    return affectsArray;
}

function adjacentAffects() {
    /* This should make each button only affect the ones
        next to it on the board. */
    buttons[0] = [0,1,3];
    buttons[1] = [0,1,2,4];
    buttons[2] = [1,2,5];
    buttons[3] = [0,3,4,6];
    buttons[4] = [1,3,4,5,7];
    buttons[5] = [2,4,5,8];
    buttons[6] = [3,6,7];
    buttons[7] = [4,6,7,8];
    buttons[8] = [5,7,8];
}

function checkWin() {
    /* If all the buttons are 'on', then the player wins. */
    var won = true;
    for (var j = 0; j < 9; j++) {
        var btx = "b" + j;
        var btn = document.getElementById(btx);
        if (btn.getAttribute("class") === "button off") {
            won = false;
        }
    }
    return won;
}

function newGame(mode) {
    /* Erase any win message.
        Reset button affects based on game mode.
        Randomly decide whether buttons are off or on,
        By mashing buttons starting from a win state. */
    var msg = document.getElementById("message");
    msg.textContent = " ";

    if (mode === "random") {
        for (i = 0; i < 9; i++) {
            affectsSelf = false;
            buttons[i] = randomAffects();
            if (affectsSelf === false) {
                buttons[i].push(i);
            }
        }
    }
    else if (mode === "adjacent") {
        adjacentAffects()
    }

    for (var j = 0; j < 9; j++) {
        var btx = "b" + j;
        var btn = document.getElementById(btx);
        btn.setAttribute("class", "button on");
    }

    var randomizer = (Math.random() * (20 - 10) + 10);
    for (var j = 0; j < randomizer; j++) {
        var randomButton = parseInt(Math.random() * (8 - 0) + 0);
        turnAffects(buttons[randomButton]);
    }
    if (checkWin()) {
        var randomButton = parseInt(Math.random() * (8 - 0) + 0);
        turnAffects(buttons[randomButton]);
    }

}

newGame("random");
