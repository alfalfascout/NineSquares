var bod = document.getElementsByTagName("body")[0];
var par = document.getElementById("wincolor");

function makeMidnight() {
bod.setAttribute("class", "midnight");
par.textContent = "teal";
}
function makeDaylight() {
bod.setAttribute("class", "daylight");
par.textContent = "orange";
}
function makePastel() {
bod.setAttribute("class", "pastel");
par.textContent = "pink";
}
function makeMonochrome() {
bod.setAttribute("class", "monochrome");
par.textContent = "black";
}
function makeRedPurple() {
bod.setAttribute("class", "redpurple");
par.textContent = "purple";
}
function makePurplePink() {
bod.setAttribute("class", "purplepink");
par.textContent = "pink";
}
function makePurpleYellow() {
bod.setAttribute("class", "purpleyellow");
par.textContent = "yellow";
}
function makeYellowBlue() {
bod.setAttribute("class", "yellowblue");
par.textContent = "blue";
}
function makeLightgreenGreen() {
bod.setAttribute("class", "lightgreengreen");
par.textContent = "darkgreen";
}
function makeWhiteLightyellow() {
bod.setAttribute("class", "whitelightyellow");
par.textContent = "yellow";
}
