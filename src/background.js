// background.js

/**
 * Indicate the start and finish of a timeout in the console.
 * @param {number} time Time to countdown from in milliseconds
 */
function timer(time) {
    console.log("start");
    setTimeout(() => {
        console.log('finish');
    }, time);
}

/**
 * Counts down from a set amount of time and displays a completion message.
 * @param {number} time Time to countdown from in seconds
 */
function countdown(time) {                      // TIME IS IN SECONDS
    console.log('start');
    var count = time;                           // count keeps track of the countdown.

    var myInterval = setInterval(() => {        // every 1 second...
        count--;                                // ...decrement count...
        console.log(count)                      // display count would be here.
        if (count == 0) {                       // ...if count is 0, stop the interval.
            clearInterval(myInterval);
            console.log('finish');
        }
    }, 1000);

}

/**
 * Convert seconds to milliseconds.
 * @param {number} seconds The amount of time in seconds to be converted to ms.
 * @returns {number} The original time in milliseconds. 
 */
function secondsToMilli(seconds) {
    return seconds * 1000;
}

// receives the message from popup.js. Uses request to check which action was sent. Responds and prints to the console.
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'start') {           // start the timer
        timer(secondsToMilli(request.time));    // get the time from the time-input in the DOM, sent in the request.
        sendResponse({ logged: true });
    }

    if (request.action === 'startCountdown') {  // start countdown.
        countdown(request.time);
        sendResponse({ logged: true });
    }
});