function writeComment(target, text) {
    let dataTransfer = new DataTransfer()
    dataTransfer.setData('text/plain', text);
    target.dispatchEvent(
        new ClipboardEvent('paste', {
            clipboardData: dataTransfer,
            bubbles: true,
            cancelable: true
        })
    );
    dataTransfer.clearData();
}
function submitComment(type, element) {
    let event;
    if (document.createEvent) {
        event = document.createEvent("HTMLEvents");
        event.initEvent(type, true, true);
    } else {
        event = document.createEventObject();
        event.eventType = type;
    }
    event.eventName = type;
    event.keyCode = 13;
    event.which = 13;
    if (document.createEvent) {
        element.dispatchEvent(event);
    } else {
        element.fireEvent("on" + event.eventType, event);
    }
}
writeComment(document.querySelector('[role="presentation"] [contenteditable]'), 'TEST1234\nTEST1234')
submitComment('keydown', document.querySelector('[role="presentation"] [contenteditable]'));
