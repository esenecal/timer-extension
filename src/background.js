// background.js

var display = 0;    // variable to be displayed by the popup. Retrieved by popup.js.
var connectionPort = null;

/**
 * Counts down from a set amount of time and displays a completion message.
 * @param {number} time Time to countdown from in seconds
 */
function countdown(time) {                      // TIME IS IN SECONDS
    browser.storage.local.set({ timerComplete: false });    // save timerComplete false to local storage.
    console.log('start');
    display = time;                             // display keeps track of the countdown.

    var myInterval = setInterval(() => {        // every 1 second...

        display--;                              // ...decrement count...

        if (connectionPort) {                   // if connectionPort is open, send display to popup.js
            connectionPort.postMessage({ display: display });
        }

        if (display == 0) {                     // ...if count is 0, stop the interval.
            clearInterval(myInterval);          // clear interval
            display = "FINISH";                 // indicate finish.
            timerComplete = true;               // set timerComplete state to true.

            browser.storage.local.set({ timerComplete: true });    // save timerComplete true to local storage.

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

// listening for connection from popup.js. Haiku 4.5 provided example code. 
browser.runtime.onConnect.addListener((port) => {
    if (port.name === 'timerPort') {            // when popup is opened, it automatically establishes a connection and runs this.
        connectionPort = port;                  // get the connection variable from popup.js
        console.log("Connection made");
        
        port.onDisconnect.addListener(() => {   // When the popup is closed, connection ends. 
            connectionPort = null;
            console.log("Connection disconnected");
        });
    }
});
