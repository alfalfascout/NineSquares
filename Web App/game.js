var msg = document.getElementById("message");
var tut = document.getElementById("tut");
var tutskip = document.getElementById("tutskip");
var resets = document.getElementsByClassName("reset");
var buttons = [];
var i = 0;
affectsSelf = false;
var turns = 1;
tutorial = 0;

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
        msg.textContent = "Turn " + turns + ": You won!";
        turns += 1;
    }
    else {
        turns += 1;
        var msg = document.getElementById("message");
        msg.textContent = "Turn " + turns;
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

function tutorialAffects() {
    /* Similar to adjacentAffects(), but only the center button works. */
    for (var j = 0; j < 9; j++) {
        if (j === 4) {
            buttons[j] = [1,3,4,5,7];
        }
        else {
            buttons[j] = [];
        }
    }
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
    if (won && tutorial === 1) {
        tut.textContent = "You can press the Adjacent button below" +
            " to start a new puzzle!";
    }
    return won;
}

function newGame(mode) {
    /* Erase any win message.
        Reset button affects based on game mode.
        Randomly decide whether buttons are off or on,
        By mashing buttons starting from a win state. */

    if (checkWin() && tutorial === 3) {
        tutorial += 1;
        tut.textContent = "Try random mode, when you're ready." +
            " You can change the color scheme at any time.";
        tutskip.textContent = "Reset tutorial?";
        resets[0].setAttribute("class", "reset");
        resets[1].setAttribute("class", "reset");
        localStorage.setItem("tutorial", "complete");
    }
    else if (checkWin() && tutorial > 0 && tutorial < 3) {
        tutorial += 1;
    }
    else if (checkWin() && tutorial > 3) {
        tutorial = 0;
        tut.textContent = "A nine button puzzle game.";
    }

    turns = 1;
    msg.textContent = "Turn " + turns;
    localStorage.setItem("modepref", mode);

    if (mode === "random") {
        for (i = 0; i < 9; i++) {
            affectsSelf = false;
            buttons[i] = randomAffects();
            if (affectsSelf === false) {
                buttons[i].push(i);
            }
        }
    }
    else if (mode === "adjacent" && tutorial !== 1) {
        adjacentAffects();
    }
    else if (mode === "tutorial") {
        tutorialAffects();
    }

    for (var j = 0; j < 9; j++) {
        var btx = "b" + j;
        var btn = document.getElementById(btx);
        btn.setAttribute("class", "button on");
    }

    if (tutorial === 1) {
        turnAffects(buttons[4]);
        tut.textContent = "Try pressing the middle button!";
    }
    else if (tutorial === 2) {
        turnAffects(buttons[0]);
        turnAffects(buttons[8]);
        tut.textContent = " Each button changes the ones next to it." +
            " Try solving this one!";
    }
    else if (tutorial === 3) {
        turnAffects(buttons[3]);
        turnAffects(buttons[5]);
        tut.textContent = "This one is a little more difficult." +
            " Good luck!";
    }
    else {
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
}

function setTutorial() {
    if (!localStorage.getItem("tutorial")) {
        localStorage.setItem("tutorial", "complete");
    }
    else {
        localStorage.removeItem("tutorial");
    }
    location.reload(true);
}

/* If the user has never played before, start the tutorial.
    If the user has played before, try to get their preferred game mode.
    If that fails, default to adjacent mode. */
if (!localStorage.getItem("tutorial")) {
    resets[0].setAttribute("class", "reset roundy");
    resets[1].setAttribute("class", "reset inviso");
    tutskip.textContent = "Skip tutorial?";
    tutorial = 1;
    newGame("tutorial");
}
else if (!localStorage.getItem("modepref")) {
    newGame("adjacent");
}
else {
    newGame(localStorage.getItem("modepref"));
}
