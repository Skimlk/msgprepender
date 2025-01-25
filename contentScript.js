function newEvent(event) {
	if(document.querySelector(".markup_f8f345.editor_a552a6.slateTextArea_e52116.fontSize16Padding_bdf0de").textContent == "\ufeff")
        browser.runtime.sendMessage({ elementClicked: true });
}
function handleResponse(message, sender) {
	document.execCommand("delete", false);
	document.execCommand("insertText", false, message.text);
}

document.addEventListener("click", function(event) {newEvent(event)});
document.addEventListener("keyup", function(event) {newEvent(event)});

browser.runtime.onMessage.addListener(handleResponse);
