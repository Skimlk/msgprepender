import { getHost, fetchStoredString } from "./utils.js";

async function newEvent(event) {
	const host = await getHost();
	const selector = await fetchStoredString(host);
	if(document.querySelector(selector).textContent == "\ufeff")
        browser.runtime.sendMessage({ elementClicked: true });
}
function handleResponse(message, sender) {
	document.execCommand("delete", false);
	document.execCommand("insertText", false, message.text);
}

document.addEventListener("click", function(event) {newEvent(event)});
document.addEventListener("keyup", function(event) {newEvent(event)});

browser.runtime.onMessage.addListener(handleResponse);
