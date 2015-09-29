var b0 = [];
var b1 = [];
var b2 = [];
var b3 = [];
var b4 = [];
var b5 = [];
var b6 = [];
var b7 = [];
var b8 = [];


function randomAffects() {
    /* This should add a random selection of 0-8 to an array
        and return the array to be held in one of the buttons */
    var bvar = [];
    for (var i = 0; i < 9; i++) {
        var randomizer = (Math.random() * (3 - 0) + 0)
        if (randomizer >= 2) {
            bvar.push(i);
        }
    }
    return bvar;
}


function randomizeButtons() {
    /* Here's where I repeat myself a lot
     because Javascript is not my strong suit. */
    
    var msg = document.getElementById("message");
    msg.textContent = " ";
    
    b0 = randomAffects();
    b1 = randomAffects();
    b2 = randomAffects();
    b3 = randomAffects();
    b4 = randomAffects();
    b5 = randomAffects();
    b6 = randomAffects();
    b7 = randomAffects();
    b8 = randomAffects();
    
    b0Affects0 = 0;
    b1Affects1 = 0;
    b2Affects2 = 0;
    b3Affects3 = 0;
    b4Affects4 = 0;
    b5Affects5 = 0;
    b6Affects6 = 0;
    b7Affects7 = 0;
    b8Affects8 = 0;
    
    for (var i = 0; i < 9; i++) {
        /* Randomly decide whether each of the buttons is off or on.
            Also, check to see if each button affects itself. */
        var btx = "b" + i;
        var btn = document.getElementById(btx);
                
        var randomizer = (Math.random() * (3 - 1) + 1)
        if (randomizer > 2) {
            btn.setAttribute("class", "button on");
        }
        else {
            btn.setAttribute("class", "button off");
        }
        
        if (b0[i] == 0) {
            b0Affects0 = 1;
        }
        if (b1[i] == 1) {
            b1Affects1 = 1;
        }
        if (b2[i] == 2) {
            b2Affects2 = 1;
        }
        if (b3[i] == 3) {
            b3Affects3 = 1;
        }
        if (b4[i] == 4) {
            b4Affects4 = 1;
        }
        if (b5[i] == 5) {
            b5Affects5 = 1;
        }
        if (b6[i] == 6) {
            b6Affects6 = 1;
        }
        if (b7[i] == 7) {
            b7Affects7 = 1;
        }
        if (b8[i] == 8) {
            b8Affects8 = 1;
        }
    }
    
    
    /* If the buttons don't affect themselves already,
        make them affect themselves. */
    if (b0Affects0 == 0) {
        b0.push(0);
    }
    if (b1Affects1 == 0) {
        b1.push(1);
    }
    if (b2Affects2 == 0) {
        b2.push(2);
    }
    if (b3Affects3 == 0) {
        b3.push(3);
    }
    if (b4Affects4 == 0) {
        b4.push(4);
    }
    if (b5Affects5 == 0) {
        b5.push(5);
    }
    if (b6Affects6 == 0) {
        b6.push(6);
    }
    if (b7Affects7 == 0) {
        b7.push(7);
    }
    if (b8Affects8 == 0) {
        b8.push(8);
    }
    
    /* This really shouldn't be as long as it is. */
}


function turnButton(n) {
    /* Turns the button on if it's off, and vice versa. */
    var btx = "b" + n;
    var btn = document.getElementById(btx);
    if (btn.getAttribute("class") == "button off") {
        btn.setAttribute("class", "button on");
    }
    else {
        btn.setAttribute("class", "button off");
    }
}

function checkWin() {
    var won = true; 
    for (var i = 0; i < 9; i++) {
        var btx = "b" + i;
        var btn = document.getElementById(btx);
        if (btn.getAttribute("class") == "button off") {
            won = false;
        }
    }
    if (won) {
        var msg = document.getElementById("message");
        msg.textContent = "You won!";
    }
}
function turnAffects(bvar) {
    /* Should turn all the buttons that a given button affects. */
    for (i in bvar) {
        turnButton(bvar[i]);
    }
    checkWin()
}


randomizeButtons();
