// send message from popup.js to background.js to initiate and detect completion of timers.

// a few things we can do:
// save timer display in storage, update it to storage so that it can be pulled by popup.js
// save timer display data in background.js, have popup rqeuest and pull it whenever it is open. 
// Haiku 4.5 suggests using browser.runtime.connect() to push to popup when a connection is present, alongside browser local storage to track when a timer completes.
// Plan, based off of what we have learned:
// use runtime.connect to update the countdown whenever it is connected. If not connected, background.js still runs, just doesn't
// push to popup. When a timer completes, this is stored to storage, which is routinely checked by popup.js whenever it is opened.

var port = browser.runtime.connect({ name: "timerPort" });  // connection variable for communicating with background. 
                                                            // immediately makes connection with background. 
var display;    // message to be displayed

/**
 * Update the time display
 * @param {number} time the time to be displayed.
 */
var timeDisplay = document.getElementById("time-display");
function updateDisplay(time) {
    timeDisplay.innerText = time;
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

/**
 * Connection with background.js. Update display.
 */
port.onMessage.addListener((message) => {
    display = message.display;
    updateDisplay(display);
});

// Event Handlers. Onclick at the elements defined by the ID, the associated function is executed.
document.getElementById("countdown-timer").addEventListener('click', startCountdown);