(async () => {
  const src = chrome.runtime.getURL("js/contentMain.js");
  const contentMain = await import(src);
})();
