// send message from popup.js to background.js to initiate and detect completion of timers.

/**
 * Update the time display
 * @param {number} time the time to be displayed.
 */
var timeDisplay = document.getElementById("time-display");
function updateDisplay(time) {
    timeDisplay.innerText = time;
}

/**
 * Start the timer by sending a message to background.js
 */
async function startTimer() {
    var timeInput = document.getElementById("time-input");                      // get input element from DOM.

    // sends a message to the background script, as defined in manifest.json. Sends a message with an action "start"
    var response = await browser.runtime.sendMessage({
        action: 'start',
        time: timeInput.value           // send the time input in the object. Would converting to ms here be better?
    });
    console.log(response);
}

/**
 * Start the countdown timer by sending a message to background.js
 */
async function startCountdown() {
    var timeInput = document.getElementById("time-input");

    var response = await browser.runtime.sendMessage({
        action: 'startCountdown',
        time: timeInput.value
    });
    console.log(response);
}

// Event Handlers. Onclick at the elements defined by the ID, the associated function is executed.
document.getElementById("timer").addEventListener('click', startTimer);
document.getElementById("countdown-timer").addEventListener('click', startCountdown);


