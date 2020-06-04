var bod = document.getElementsByTagName("body")[0];
var par = document.getElementById("wincolor");

function updateColor() {
	var colorScheme = localStorage.getItem("colorscheme");
	var winColor = localStorage.getItem("wincolor");
	bod.setAttribute("class", colorScheme);
	par.textContent = winColor;
}

function makeColor(colorScheme, winColor) {
	localStorage.setItem("colorscheme", colorScheme);
	localStorage.setItem("wincolor", winColor);
	updateColor();
}

function startColors() {
	makeColor("monochrome", "black");
}

if(!localStorage.getItem("colorscheme")) {
	startColors();
} else {
	updateColor();
}
