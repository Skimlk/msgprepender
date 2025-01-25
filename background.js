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

browser.runtime.onMessage.addListener(function(message) {
	if (message.elementClicked) {
		var prependedString = localStorage.getItem('prepended-string') 
		if(prependedString) {
			insertIntoPage(prependedString);
			console.log(`'${prependedString}' prepended.`);
		}
	}
});
