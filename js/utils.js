async function getActiveTab() {
	return (await browser.tabs.query({
		active: true,
		currentWindow: true,
	}))[0];
}

function extractHost(FQDN) {
	return FQDN.split('//')[1].split('/')[0];
}

export { getActiveTab, extractHost };
