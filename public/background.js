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

// disable input fields
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && /^http/.test(tab.url)) {
      chrome.scripting.executeScript({
          target: { tabId: tabId },
          files: ["./contentScript.js"]
      })
          .then(() => {
              console.log("INJECTED THE SCRIPT.");
          })
          .catch(err => console.log(err));
  }
});

// console log stuff
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.message === "console") {
//     console.log(request.response);
//   }
// });


