import { getActiveTab, extractHost } from "./utils.js";
const title = document.getElementById('title');
const prependedString = document.getElementById('prepended-string');
const querySelector = document.getElementById('query-selector');

function updateTitle() {
	title.textContent = prependedString.value + "Message Prepender";
}

prependedString.oninput = function() {
	browser.storage.local.set({prependedString: prependedString.value});
	updateTitle();
}

querySelector.onchange = async function() {
	const activeTab = await getActiveTab();
	const host = extractHost(activeTab.url);
	browser.storage.local.set({[host]: querySelector.value});
	console.log(host);
}

async function initalize() { 
	const activeTab = await getActiveTab();
	const host = extractHost(activeTab.url);
	querySelector.value = Object.values(await browser.storage.local.get(host))[0] || '';
	prependedString.value = Object.values(await browser.storage.local.get('prependedString'))[0] || ''; 
	updateTitle();
}

initalize();
