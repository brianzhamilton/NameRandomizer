/*      Filename:   Randomize.js
 *      Authors:     Brian, Yousef, Sara
 *      Date:       07/26/2021
 *      Summary:    JavaScript file for inputting and selecting
 *                  names at random from a list
 */

// HTML elements assigned to JS variables
var nameInput = document.getElementById("nameInput");
var inputName = document.getElementById("inputName");
var numToWin = document.getElementById("numToWin");
var errorText = document.getElementById("errorText");
var removePrevWins = document.getElementById("removePrevWins");
var randResultHeader = document.getElementById("randResultHeader");
var randResult = document.getElementById("randResult");
var paragraph = document.getElementById("textComment");
var selectWinner = document.getElementById("selectWinner");
var btnReset = document.getElementById("btnReset");
var listOfNames = document.getElementById("listOfNames");
var removeButton = document.getElementById("removeButton");

// global arrays
var names = [];
var winners = [];

// regular expression for input validation
var nameExpression = /^[A-Za-z0-9]+$/

// reset button
function reset() {
    var yesOrNo = confirm("Are you sure?\nClicking \"OK\" will reset the entire list.");
    if (yesOrNo) {
        names = [];
        updateNameList();
    }
}

//function for removing names that are checked on the list
function removeNames() {
    for (let i = names.length - 1; i > -1; i--) {
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
        nameDiv = document.createElement("div");
        nameDiv.setAttribute("class", "namesOnList");
        listOfNames.appendChild(nameDiv);
        
        const cboxName = document.createElement("input");
        cboxName.setAttribute("type", "checkbox");
        cboxName.setAttribute("id", "cbox" + i);
        cboxName.setAttribute("class", "checkboxesOnList");
        nameDiv.appendChild(cboxName);

        const txtName = document.createElement("label");
        txtName.setAttribute("for", "cbox" + i);
        txtName.setAttribute("class", "labelsOnList");
        txtName.innerText = names[i];
        nameDiv.appendChild(txtName);
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
        nameInput.value = "";
    }
    updateNameList();
}

// produces the random winner results
function randomize() {
    // empties previous winner results
    randResult.innerHTML = "";
    winners = [];

    // selects winner(s)
    if (names[0] !== "" && numToWin.value <= names.length) {
        for (let i = 0; i < numToWin.value; i++) {
            const winningNumber = Math.floor(Math.random() * (names.length));
            
            // if there's multiple winners, this makes sure
            // the same person isn't selected multiple times
            if (winners.indexOf(names[winningNumber]) < 0) {
                winners[i] = names[winningNumber];
                randResult.innerHTML += winners[i] + "!</br>";
            }
            else {
                i--;
            }
        }

        if (removePrevWins.checked) {
            for (let i = 0; i < winners.length; i++) {
                var index = names.indexOf(winners[i]);
                names.splice(index, 1);
            }
            updateNameList();
        }
    
        // Changes the plurality of the language if 
        // there's more than one winner
        if (numToWin > 1) {
            randResultHeader.innerText = "The winners are..."
        }
        else {
            randResultHeader.innerText = "The winner is..."
        }
    
        // Reveals the result HTML element
        errorText.hidden = true;
        randResultHeader.hidden = false;
        randResult.hidden = false;
    }
    else if (numToWin.value > names.length) {
        errorText.innerText = "ERROR: number of winners cannot excede number of names on the list.";
        errorText.hidden = false;
        randResultHeader.hidden = true;
        randResult.hidden = true;
    }
}

// create event listeners
function createEventListeners() {
    if (selectWinner.addEventListener) {
        selectWinner.addEventListener("click", randomize, false);
        inputName.addEventListener("click", addName, false);
        removeButton.addEventListener("click", removeNames, false);
        btnReset.addEventListener("click", reset, false);
    }
    else if (button.attachEvent) {
        selectWinner.attachEvent("onclick", randomize);
        inputName.attachEvent("onclick", addName);
        removeButton.attachEvent("onclick", removeNames);
        btnReset.attachEvent("onclick", reset);
    }
}

// run setUpPage on page load
if (window.addEventListener) {
    window.addEventListener("load", createEventListeners, false);
}
else if (window.attachEvent) {
    window.attachEvent("onload", createEventListeners);
}
