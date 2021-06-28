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
//Với thằng Facebook này thì bạn dùng DataTransfer, ClipboardEvent (2 constructors này bạn tự research). Sau đó đứng tại element của input comment (bạn mò CSS selector của FB để lấy được nó) và call method dispatchEvent để dispatch "paste" event. Cách này bạn có thể hiểu là kích hoạt một sự kiện paste content vào ô comment, draftjs sẽ xử lý hành vi này tương tự end-user paste thật. Chúc bạn làm được nhé.
