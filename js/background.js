import { getActiveTab, extractHost } from "./utils.js";

async function insertIntoPage(text) {
	const activeTab = await getActiveTab();
	if(activeTab) {
		browser.tabs.sendMessage(activeTab.id, {type: "insert", text});
	}
}

browser.runtime.onMessage.addListener(async function(message) {
	if (message.elementClicked) {
		var prependedString = Object.values(await browser.storage.local.get('prependedString'))[0];
		if(prependedString) {
			insertIntoPage(prependedString);
			console.log(`'${prependedString}' prepended.`);
		}
	}
});
