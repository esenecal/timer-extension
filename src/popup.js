// send message from popup.js to background.js to initiate and detect completion of timers.

// suggestion by Haiku 4.5 to use browser.runtime.connect() to push to popup when a connection is present, alongside browser local storage to track when a timer completes.
var port = browser.runtime.connect({ name: "timerPort" });  // connection variable for communicating with background. 
                                                            // immediately makes connection with background. 
var display;    // message to be displayed

var timerComplete;

// Get the timerComplete value from local storage. get returns a promise that must be resolved.
timerComplete = Promise.resolve(browser.storage.local.get("timerComplete"));

if (typeof timerComplete === 'undefined') {     // if timerComplete is undefined, then set to true. Any existing value is already there.
    timerComplete = true;
}


/**
 * Update the time display
 * @param {number} time the time to be displayed.
 */
var timeDisplay = document.getElementById("time-display");
function updateDisplay(message) {
    timeDisplay.innerText = message;
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
    // console.log(response);
}

// constantly listening for timer
port.onMessage.addListener((message) => {
    display = message.display;
    updateDisplay(display);
});

/**
 * Connection with background.js. Update display.
 */
if (timerComplete) {
    updateDisplay("No Timer Running");
} else {
    port.onMessage.addListener((message) => {   // timerComplete must be checked here--otherwise, the updates won't show if it is set to true.
        display = message.display;
        updateDisplay(display);
    });    
}

// Event Handlers. Onclick at the elements defined by the ID, the associated function is executed.
document.getElementById("countdown-timer").addEventListener('click', startCountdown);

// on page open