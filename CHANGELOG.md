# Changelog

**Overall Goal**: create a timer extension, with a timer countdown, setting a time, an alert, pause and reset buttons.

## Sprint 2: Extension Prototype

2026-04-23--

**Goal**: create a basic GUI and implement the timer into it

**Plan**: consisted of the goal; focused on learning extension structure, connecting an HTML/CSS page with JavaScript, and packaging the extension.

**Design**: generally had an idea of a timer that counts down, but this sprint was largely played by ear; using the basic goal, trial and error was used to find something that worked without worry too much to design.

**Build**:
- `index.html`: basic popup structure. Provides simple metadata, link to `style.css`, and elements for display and input.
    - `"time-display"` element: used for displaying any messages on the popup.
    - `"time-input"` element: used for input for timer in seconds.
    - `"countdown-timer"` element: button used to trigger timer.
- `style.css`: provides style for `index.html`.
- `popup.js`: "frontend" type code for the popup (`index.html`). Handles display of information on the popup and communication between the popup and the background script. 
    - `port`: provides a runtime connect port, which is used for opening a connection between `popup.js` and `background.js`. Allows for timer countdown and messages to be sent from `background.js` to be displayed in "real time."
    - `timerComplete`: pulls the value associated with `"timerComplete"` from local storage on the popup open. Used to track timer completion and thus what should be displayed (timer, "No Timer Running", etc.)
    - `startCountdown`: function that sends a start message and the input timer amount (in `time-input`) to background.js via `browser.runtime.sendMessage`.
    - `onMessage` listeners: listening for timer data from `background.js`. Displayed if `timerComplete` is false.
- `background.js`: "backend" type code for handling the timer countdown.
    - `countdown`: function that provides a countdown in seconds from the timer input amount. If a connectionPort is open, it sends this information to `popup.js` for display. It triggers `timerComplete` in local storage according to the timer status.
    - `onMessage` listener: listens for timer start message from `popup.js`. Calls countdown.
    - `onConnect` listener: listens for an onConnect connection from popup.js. 

## Sprint 1: Command Line Prototype

2026-04-23

**Goal**: create a basic command line prototype of a timer.

**Plan**: consisted of the goal; focus on learning JavaScript functions and features that could be used to create a timer.

**Design**: basic command line prototype of a timer, using Node.js.

**Build**:
- Use of `setInterval` and `setTimeout`.
- Created `secondsToMilli` to convert seconds to milliseconds.

**Test**:
- START message indicated beginning of script; separate timer used to verify the code was counting correctly.

**Review**:
- Basic command line timer that does its job. Nothing much to say. Provides an example that can be expanded for a GUI application.