/*global chrome*/

chrome.runtime.onInstalled.addListener(function () {
  // once the extension is installed initialize whitelist storage
  chrome.storage.local.set({
    web_secure_whitelist: [],
  });
});

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
        sendResponse({ url });
      }
    );
  }
  if (request.message === "SET_WHITELIST") {
    chrome.tabs.query(
      {
        active: true,
        lastFocusedWindow: true,
      },
      function (tabs) {
        const url = tabs[0].url;
        // getting the whitelist from storage
        chrome.storage.local.get("web_secure_whitelist", (result) => {
          // adding new url to the whitelist
          const rootURL = url.split("/").slice(0, 3).join("/");
          const newWhitelist = [...result.web_secure_whitelist, rootURL];
          chrome.storage.local.set(
            { web_secure_whitelist: newWhitelist, }, () => {
              sendResponse({ status: true });
            }
          );
        });
      }
    );
  }
  if (request.message === "REMOVE_WHITELIST") {
    chrome.tabs.query(
      {
        active: true,
        lastFocusedWindow: true,
      },
      function (tabs) {
        const url = tabs[0].url;
        const rootURL = url.split("/").slice(0, 3).join("/");
       // remove from whitelist
      chrome.storage.local.get("web_secure_whitelist", (result) => {
        const whitelist = result.web_secure_whitelist;
        const newWhitelist = whitelist.filter((url) => url !== rootURL);
        chrome.storage.local.set({ web_secure_whitelist: newWhitelist }, () => {
          sendResponse({ status: true });
        });
      });
      }
    );
  }

  return true;
});

// disable input fields
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && /^http/.test(tab.url)) {
    chrome.scripting
      .executeScript({
        target: { tabId: tabId },
        files: ["./contentScript.js"],
      })
      .then(() => {
        console.log("INJECTED THE SCRIPT.");
      })
      .catch((err) => console.log(err));
  }
});

// console log stuff
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.message === "console") {
//     console.log(request.response);
//   }
// });
