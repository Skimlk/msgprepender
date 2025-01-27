async function insertIntoPage(text) {
	const tabs = await browser.tabs.query({
		currentWindow: true,
		active: true
	});

	const promises = await tabs.map((tab) => {
		console.log("Tab: ", tab);
		console.log(`TabID: ${tab.id}`);
		return browser.tabs.sendMessage(tab.id, {type: "insert", text});
	});

	console.log(promises);
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
