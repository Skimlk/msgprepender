import { getActiveTab, fetchStoredString } from "./utils.js";

async function insertIntoPage(text) {
	const activeTab = await getActiveTab();
	if(activeTab) {
		browser.tabs.sendMessage(activeTab.id, {type: 'insert', text});
	}
}

browser.runtime.onMessage.addListener(async function(message) {
	if (message.elementClicked) {
		const prependedString = await fetchStoredString('prependedString');
		if(prependedString) {
			insertIntoPage(prependedString);
			console.log(`'${prependedString}' prepended.`);
		}
	}
});
