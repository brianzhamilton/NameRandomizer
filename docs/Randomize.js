var randResult = document.getElementById("randResult");
var button = document.getElementById("generate");

function randomize() {
    randResult.innerText = readFile();
}

// create event listeners
function createEventListeners() {
    if (button.addEventListener) {
        button.addEventListener("click", randomize, false);
    }
    else if (button.attachEvent) {
        button.attachEvent("onclick", randomize);
    }
}

// run setUpPage on page load
if (window.addEventListener) {
    window.addEventListener("load", createEventListeners, false);
}
else if (window.attachEvent) {
    window.attachEvent("onload", createEventListeners);
}
