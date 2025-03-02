async function getActiveTab() {
	return (await browser.tabs.query({
		active: true,
		currentWindow: true,
	}))[0];
}

async function getURL(tab) {
	if(tab == null) {
		const err = new Error();
		if(err.stack.includes("contentMain.js")) {
			return window.location.href;
		} else {
			tab = await getActiveTab();
		}
	}
	return tab.url;
}

function extractHost(FQDN) {
	return FQDN.split('//')[1].split('/')[0];
}

async function getHost() {
	return extractHost(await getURL());
}

async function fetchStoredString(key) {
	return Object.values(
			await browser.storage.local.get(key)
	)[0];
}

function hasElement(elements, element) {
	for(const item of elements) { 
		if(item == element) 
			return true;
	} 
	return false;
}

export { getActiveTab, getURL, extractHost, getHost, fetchStoredString, hasElement };
