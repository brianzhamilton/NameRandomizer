var randResult = document.getElementById("randResult");
var button = document.getElementById("generate");

function readFile() {
    var fr = new FileReader;
    fr.readFile('data/dataset.txt', function (err, data){
        if (err) {
            return console.error(err)
        }
    
        let dataArray = data.toString().split('\n');
    });


    var randNum = Math.floor(Math.random() * dataArray.length);
    return dataArray[randNum];
}

function generateName() {
    randResult.innerText = readFile();
}

// create event listeners
function createEventListeners() {
    if (button.addEventListener) {
        button.addEventListener("click", generateName, false);
    }
    else if (button.attachEvent) {
        button.attachEvent("onclick", generateName);
    }
}

// run setUpPage on page load
if (window.addEventListener) {
    window.addEventListener("load", createEventListeners, false);
}
else if (window.attachEvent) {
    window.attachEvent("onload", createEventListeners);
}
