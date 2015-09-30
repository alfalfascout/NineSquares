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
