// HTML elements assigned to JS variables
var nameInput = document.getElementById("nameInput");
var inputName = document.getElementById("inputName");
var numToWin = document.getElementById("numToWin");
var removePrevWins = document.getElementById("removePrevWins");
var randResult = document.getElementById("randResult");
var selectWinner = document.getElementById("selectWinner");
var listOfNames = document.getElementById("listOfNames");
var removeButton = document.getElementById("removeButton");

// global arrays
var names = [];
var winners = [];

// regular expression for input validation
var nameExpression = /^[A-Za-z0-9]+$/

//function for removing names that are checked on the list
function removeNames() {
    for (let i = 0; i < names.length; i++) {
        const cbox = document.getElementById("cbox" + i);
        if (cbox.checked) {
            names.splice(i, 1);
        }
    }
    updateNameList();
}

// function for updating list when a name is added or removed
function updateNameList() {
    // remove old list elements, to make way for updated list
    const oldList = document.getElementsByClassName("namesOnList");

    while (oldList.length != 0) {
        listOfNames.removeChild(oldList[0]);
    }

    // create updated list
    for (let i = 0; i < names.length; i++) {
        const cboxName = document.createElement("input");
        cboxName.setAttribute("type", "checkbox");
        cboxName.setAttribute("id", "cbox" + i);
        cboxName.setAttribute("class", "checkboxesOnList");
        cboxName.setAttribute("class", "namesOnList");
        listOfNames.appendChild(cboxName);

        const txtName = document.createElement("label");
        txtName.setAttribute("for", "cbox" + i);
        txtName.setAttribute("class", "labelsOnList");
        txtName.setAttribute("class", "namesOnList");
        txtName.innerText = names[i];
        listOfNames.appendChild(txtName);
    }
    
    // displays or hides the Remove Names button, 
    // depending on whether names[] is empty or not
    if (names.length != 0) {
        removeButton.hidden = false;
    }
    else {
        removeButton.hidden = true;
    }
}

// function to add name to names[] and calls the updateNameList function
function addName() {
    if (nameExpression.test(nameInput.value)) {
        names.push(nameInput.value);
        console.log(names[names.length-1]);
        console.log(names.length);
        nameInput.value = "";
    }
    updateNameList();
}

// produces the random winner results
// !!!!!!!!!! IMPORTANT: MUST MODIFY MULTIPLE WINNERS TO NOT BE DUPLICATES
function randomize() {
    // empties previous winner results
    randResult.innerHTML = "";

    // selects winner(s)
    if (names[0] !== "" && numToWin.value <= names.length) {
        for (let i = 0; i < numToWin.value; i++) {
            const winningNumber = Math.floor(Math.random() * (names.length));
            winners[i] = names[winningNumber];

            randResult.innerHTML += winners[i] + "!</br>";
        }
    }

    if (removePrevWins.checked) {
        for (let i = 0; i < winners.length; i++) {
            var index = names.indexOf(winners[i]);
            names.splice(index, 1);
        }
        updateNameList();
    }

    // Reveals the result HTML element
    randResult.hidden = false;
}

// create event listeners
function createEventListeners() {
    if (selectWinner.addEventListener) {
        selectWinner.addEventListener("click", randomize, false);
        inputName.addEventListener("click", addName, false);
        removeButton.addEventListener("click", removeNames, false);
    }
    else if (button.attachEvent) {
        selectWinner.attachEvent("onclick", randomize);
        inputName.attachEvent("onclick", addName);
        removeButton.attachEvent("click", removeNames);
    }
}

// run setUpPage on page load
if (window.addEventListener) {
    window.addEventListener("load", createEventListeners, false);
}
else if (window.attachEvent) {
    window.attachEvent("onload", createEventListeners);
}
