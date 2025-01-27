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
	activeTab = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });	
	console.log(activeTab[0].url.split('//')[1].split('/')[0]);
}

async function initalize() { 
	prependedString.value = Object.values(await browser.storage.local.get('prependedString'))[0] || ''; 
	updateTitle();
}

initalize();
