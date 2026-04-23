/**
 * Displays a timer completion message after a set amount of time.
 */
function timer() {      // timer function with a set
    var timeInput = document.getElementById("time-input");                      // get input element from DOM.
    setTimeout(() => {alert("Timer Over")}, secondsToMilli(timeInput.value));   // 
}

/**
 * Counts down from a set amount of time and displays a completion message.
 */
function countdown() {
    var timeInput = document.getElementById("time-input");
    var count = timeInput.value;                           // count keeps track of the countdown.
    var myInterval = setInterval(() => {        // every 1 second...
        count--;                                // ...decrement count...
        updateDisplay(count);                     // ...display count...
        if (count == 0) {                       // ...if count is 0, stop the interval.
            clearInterval(myInterval);
            alert("Finished");
        }
    }, 1000);

}

/**
 * Update the time display
 * @param {number} time the time to be displayed.
 */
var timeDisplay = document.getElementById("time-display");
function updateDisplay(time) {
    timeDisplay.innerText = time;
}

/**
 * Convert seconds to milliseconds.
 * @param {number} seconds The amount of time in seconds to be converted to ms.
 * @returns {number} The original time in milliseconds. 
 */
function secondsToMilli(seconds) {
    return seconds * 1000;
}


// Event Handlers
document.getElementById("timer").addEventListener('click', timer);
document.getElementById("countdown-timer").addEventListener('click', countdown);