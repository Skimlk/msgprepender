import { getHost, fetchStoredString } from "./utils.js";
const title = document.getElementById('title');
const prependedString = document.getElementById('prepended-string');
const querySelector = document.getElementById('query-selector');
const siteNameDisplay = document.getElementById('site-name-display');
const host = await getHost();

function updateText() {
	title.textContent = prependedString.value + "Message Prepender";
}

prependedString.oninput = function() {
	browser.storage.local.set({prependedString: prependedString.value});
	updateText();
}

querySelector.oninput = async function() {
	browser.storage.local.set({[host]: querySelector.value});
	updateText();
}

siteNameDisplay.innerText = `For site: '${host}'`;
prependedString.value = await fetchStoredString('prependedString') || ''; 
querySelector.value = await fetchStoredString(host) || '';
updateText();
