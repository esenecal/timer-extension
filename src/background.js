// background.js

function timer(time) {
    console.log("start");
    setTimeout(() => {
        console.log('finish');
    }, time);
}

// receives the message from popup.js. Uses request to check which action was sent. Responds and prints to the console.
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'start') {
        timer(5000);
        sendResponse({ logged: true })
    }
});

