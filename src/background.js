// receives the message from popup.js. Uses request to check which action was sent. Responds and prints to the console.
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'start') {
        console.log('start');
        sendResponse({ logged: true })
    }
}
)