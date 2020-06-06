var msg = document.getElementById("message");
var resets = document.getElementsByClassName("reset");
var board = document.getElementById("svg-board");
var svgns = "http://www.w3.org/2000/svg";
var i = 0;
var turns = 1;
var buttons = 9;

function changeHue(toggle) {
	if (toggle !== 'on-hue' && toggle !== 'off-hue') {
		return; //avoid some but not all shenanigans
	}
	var hue = document.getElementById(toggle).value;
	document.documentElement.style.setProperty('--' + toggle, parseInt(hue));
	
	localStorage.setItem(toggle, hue);
}

function expandUtils() {
	/* Moves utilities into view on a mobile device. */
	var utils = document.getElementById('utils');
	if (utils.getAttribute("class") === "expand") {
		utils.setAttribute("class", "");
	}
	else {
		utils.setAttribute("class", "expand");
	}
}

function generateGameBoard() {
	/* Generates a new game board. Called when size changes. */
	var w = document.querySelector('input[name="game-width"]:checked').value;
	var h = document.querySelector('input[name="game-height"]:checked').value;
	localStorage.setItem("width", w);
	localStorage.setItem("height", h);
	var viewWidth = 1000/9 * w;
	var viewHeight = 1100/9 * h;
	document.getElementById('svg-grid').setAttribute('viewBox', '0 0 ' + viewWidth + ' ' + viewHeight);
	
	while (board.firstChild) { //clear the board
		board.removeChild(board.lastChild); 
	}
	var n = 0;
	
	for (var j = 0; j < h; j++) { //make the svg grid
		for (var k = 0; k < w; k++) {
			var btn = document.createElementNS(svgns, "use");
			btn.setAttribute('xlink:href', '#game-button');
			btn.setAttribute('href', '#game-button');
			btn.setAttribute('class', 'button on');
			btn.setAttribute('x', 1000/9 * k + 5);
			btn.setAttribute('y', 1100/9 * j);
			btn.setAttribute('onclick', 'pressButton(' + n + ')');
			btn.setAttribute('id', 'b' + n);
			
			board.appendChild(btn);
			n++;
		}
	}
	
	buttons = n;
	newGame(); //now make the buttons actually do something
}

function turnButton(n) {
	/* Turns the button on if it's off, and vice versa. */
	var btn = document.getElementById('b' + n);
	if (btn.getAttribute("class") === "button off") {
		btn.setAttribute("class", "button on");
	}
	else {
		btn.setAttribute("class", "button off");
	}
}

function turnAffects(n) {
	/* Should turn all the buttons that a given button affects. */
	var affects = JSON.parse(document.getElementById('b' + n).dataset.affects);
	for (j in affects) {
		turnButton(affects[j]);
	}
}

function pressButton(n) {
	/* Turn all the buttons a given button affects.
		If that turn won the game, tell the player. */
	turnAffects(n);
	var msg = document.getElementById("message");
	turns += 1;
	if (checkWin()) {
		msg.textContent = "Moves: " + turns + ". You won!";
	}
	else {
		msg.textContent = "Moves: " + turns;
	}
}

function randomAffects() {
	/* This should add a random selection of buttons to an array
		and return the array to be held in one of the buttons */
		
	for (var j = 0; j < buttons; j++) {
		var affects = [];
		//each button will have about a 1/3 chance of affecting every other button
		for (var k = 0; k < buttons; k++) { 
			var randomThreshold = (Math.random() * (3 - 0) + 0);
			if (randomThreshold >= 2) {
				affects.push(k);
			}
		}
		
		document.getElementById("b" + j).dataset.affects = JSON.stringify(affects);
	}
}

function adjacentAffects() {
	/* This should make each button only affect the ones
		next to it on the board. */
	var w = parseInt(document.querySelector('input[name="game-width"]:checked').value);
	var h = parseInt(document.querySelector('input[name="game-height"]:checked').value);
	var affects = [];
	
	for (var j = 0; j < buttons; j++) {
		affects = [j];
		
		if (j % w > 0) { //is there a button to the left?
			affects.push(j - 1);
		}
		if (j % w < w - 1) { //is there a button to the right?
			affects.push(j + 1);
		}
		if (j >= w) { //is there a button above?
			affects.push(j - w);
		}
		if (j < (w * h) - w) { //is there a button below?
			affects.push(j + w);
		}
		
		document.getElementById('b' + j).dataset.affects = JSON.stringify(affects);
	}
}

function checkWin() {
	/* If all the buttons are 'on', then the player wins. */
	var won = true;
	for (var j = 0; j < buttons; j++) {
		var btx = "b" + j;
		var btn = document.getElementById(btx);
		if (btn.getAttribute("class") === "button off") {
			won = false;
		}
	}
	return won;
}

function changeMode() {
	var mode = document.querySelector('input[name="game-mode"]:checked').value;
	localStorage.setItem('modepref', mode);
	
	newGame();
}

function scramblePuzzle() {
	/* Starts from a win state,
		then presses random buttons to create a puzzle. */
	for (var j = 0; j < 9; j++) { 
		document.getElementById('b' + j).setAttribute("class", "button on");
	} // win state
	
	var randomizer = (Math.random() * (buttons * 2 - buttons) + buttons); // random number of buttons
	for (var j = 0; j < randomizer; j++) {
		var randomButton = parseInt(Math.random() * (buttons - 1) + 0);
		turnAffects(randomButton);
	}
	if (checkWin()) {
		var randomButton = parseInt(Math.random() * (buttons - 1) + 0);
		turnAffects(randomButton);
	}
}

function newGame() {
	/* Erase any win message.
		Reset button affects based on game mode.
		Scramble the board to create a puzzle. */
		
	var mode = document.querySelector('input[name="game-mode"]:checked').value;
	
	turns = 0;
	msg.textContent = "Moves: " + turns;

	if (mode === "2") {
		randomAffects();
	}
	else {
		adjacentAffects();
	}
	
	scramblePuzzle();
}

/* If the user has settings, try to load them. */
if (localStorage.getItem("modepref") !== null) {
	document.getElementById("random-mode").checked = (localStorage.getItem("modepref") === "2");
}
if (localStorage.getItem("width") !== null) {
	document.getElementById("width" + localStorage.getItem("width")).checked = true;
}
if (localStorage.getItem("height") !== null) {
	document.getElementById("height" + localStorage.getItem("height")).checked = true;
}
if (localStorage.getItem("on-hue") !== null) {
	var hue = parseInt(localStorage.getItem("on-hue"));
	document.getElementById("on-hue").value = hue;
	document.documentElement.style.setProperty('--on-hue', hue);
}
if (localStorage.getItem("off-hue") !== null) {
	var hue = parseInt(localStorage.getItem("off-hue"));
	document.getElementById("off-hue").value = hue;
	document.documentElement.style.setProperty('--off-hue', hue);
}

generateGameBoard();
