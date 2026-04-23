/**
 * Execute a function after a set amount of time.
 * @param {number} time The amount of time the timer counts down from.
 */
function timer(time) {      // timer function with a set 
    setTimeout(() => {console.log("timer over")}, time);
}

/**
 * Convert seconds to milliseconds.
 * @param {number} seconds The amount of time in seconds to be converted to ms.
 * @returns {number} The original time in milliseconds. 
 */
function secondsToMilli(seconds) {
    return seconds * 1000;
}

timer(secondsToMilli(10));