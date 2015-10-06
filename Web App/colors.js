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
function makeCheckers() {
bod.setAttribute("class", "checkers");
par.textContent = "red";
}
function makeGentlePinkle() {
bod.setAttribute("class", "gentlepinkle");
par.textContent = "pink";
}
function makePurpleDragon() {
bod.setAttribute("class", "purpledragon");
par.textContent = "purple";
}
function makeSilverGold() {
bod.setAttribute("class", "silvergold");
par.textContent = "blue";
}
function makeHappySapling() {
bod.setAttribute("class", "happysapling");
par.textContent = "dark green";
}
function makeWhiteGold() {
bod.setAttribute("class", "whitegold");
par.textContent = "white";
}
