function newEvent(event) {
    //if(document.getElementsByClassName("editor__66464")[0].children[0].children.length <= 1)
    if(document.getElementsByClassName("editor__66464")[0].textContent == "\ufeff")
        browser.runtime.sendMessage({ elementClicked: true });
}

document.addEventListener("click", function(event) {newEvent(event)});
document.addEventListener("keyup", function(event) {newEvent(event)});

function handleResponse(message, sender) {
    document.execCommand("delete", false);
    document.execCommand("insertText", false, message.text);
}

browser.runtime.onMessage.addListener(handleResponse);
