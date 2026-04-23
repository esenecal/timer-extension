/**
 * Displays a timer completion message after a set amount of time.
 * @param {number} time The amount of time the timer counts down from.
 */
function timer(time) {      // timer function with a set 
    setTimeout(() => {console.log("timer over")}, time);
}

/**
 * Counts down from a set amount of time and displays a completion message.
 * @param {number} time The amount of time the timer counts down from in seconds
 */
function countdown(time) {
    var count = time;                           // count keeps track of the countdown.
    var myInterval = setInterval(() => {        // every 1 second...
        count--;                                // ...decrement count...
        console.log(count);                     // ...display count...
        if (count == 0) {                       // ...if count is 0, stop the interval.
            clearInterval(myInterval);
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

console.log("START");
// timer(secondsToMilli(10));
countdown(5);