var bod = document.getElementsByTagName("body")[0];
var par = document.getElementById("wincolor");
var panel = document.getElementById("options_panel");

function toggleOptions() {
    if (panel.getAttribute("class") == "inviso") {
        panel.setAttribute("class", "viso");
    }
    else {
        panel.setAttribute("class", "inviso");
    }
}

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
