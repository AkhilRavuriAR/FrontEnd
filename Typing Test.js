let quotedisplayEl = document.getElementById("quoteDisplay");
let timerEl = document.getElementById("timer");
let textareaEl = document.getElementById("quoteInput");
let speedtestCont = document.getElementById("speedTypingTest");
let resultEl = document.getElementById("result");
let submitBtnEl = document.getElementById("submitBtn");
let resetbtnEl = document.getElementById("resetBtn");
let spinnerEl = document.getElementById("spinner");

let url = "https://apis.ccbp.in/random-quote";

textareaEl.addEventListener("change", function(event) {
    let textEntered = event.target.value;
})


function requestQuote() {
    let options = {
        method: "GET"
    }
    fetch(url, options)
        .then(function(response) {
            return response.json()
        })
        .then(function(jsonData) {
            console.log(jsonData)
            let quoterequested = jsonData.content;
            quotedisplayEl.textContent = quoterequested;
        })
}
requestQuote();

function timer() {
    let starttime = 0;
    let firstintervalid = setInterval(function() {
        timerEl.textContent = starttime
        starttime = starttime + 1

    }, 1000);
    return firstintervalid;
}

let timerstopper = timer();

submitBtnEl.addEventListener("click", function() {
    if (textareaEl.value === quotedisplayEl.textContent) {
        clearInterval(timerstopper);
        resultEl.textContent = "you have completed in" + timerEl.textContent + "seconds";
    } else {
        resultEl.textContent = "you have entered incorrect"
    }
})

resetbtnEl.addEventListener("click", function() {
    spinnerEl.classList.remove("d-none");
    speedtestCont.classList.add("d-none");
    requestQuote();
    clearInterval(timerstopper);
    timerstopper = timer();
    textareaEl.value = ""
    spinnerEl.classList.add("d-none");
    speedtestCont.classList.remove("d-none");

})