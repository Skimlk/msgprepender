import { getHost, fetchStoredString, hasElement } from "./utils.js";

let functionLock = false;
async function newEvent(event) {
	if(functionLock) return;
	functionLock = true;

	try {
		const host = await getHost();
		const selector = await fetchStoredString(host);
		const selectedElements = await document.querySelectorAll(selector);
		if(selectedElements.length > 0 && hasElement(selectedElements, document.activeElement)) {
			const selectedTag = document.activeElement;
			let selectedContent;

			if(selectedTag.nodeName === "INPUT") {
				selectedContent = selectedTag.value;
			} else {
				selectedContent = selectedTag.textContent;
			}

			if(selectedContent == "\ufeff" || selectedContent == "")
				browser.runtime.sendMessage({ elementClicked: true });
		}
	} finally {
		functionLock = false;
	}
}

function handleResponse(message, sender) {
	document.execCommand("insertText", false, message.text);
}

document.addEventListener("click", function(event) {newEvent(event)});
document.addEventListener("keyup", function(event) {newEvent(event)});

browser.runtime.onMessage.addListener(handleResponse);
