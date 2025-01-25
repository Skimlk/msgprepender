var title = document.getElementById('title');
var prependedString = document.getElementById('prepended-string');
var querySelector = document.getElementById('query-selector');

function updateTitle() {
	title.textContent = prependedString.value + "Message Prepender";
}

prependedString.oninput = function() {
	localStorage.setItem('prepended-string', prependedString.value);
	updateTitle();
}

prependedString.value = localStorage.getItem('prepended-string'); 
updateTitle();
