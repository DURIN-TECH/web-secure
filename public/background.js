/*global chrome*/

// respond to the message to retrieve the current url
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "GET_URL") {
    chrome.tabs.query(
      {
        active: true,
        lastFocusedWindow: true,
      },
      function (tabs) {
        const url = tabs[0].url;
        sendResponse({ url })
      }
    );
  }
  return true;
});

// console log stuff
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "console") {
    console.log(request.matches);
    console.log(request.getSimilar);
  }
});

