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
 * Convert seconds to milliseconds.
 * @param {number} seconds The amount of time in seconds to be converted to ms.
 * @returns {number} The original time in milliseconds. 
 */
function secondsToMilli(seconds) {
    return seconds * 1000;
}

// receives the message from popup.js. Uses request to check which action was sent. Responds and prints to the console.
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'start') {
        timer(secondsToMilli(request.time));    // get the time from the time-input in the DOM, sent in the request.
        sendResponse({ logged: true });
    }
});

