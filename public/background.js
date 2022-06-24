/*global chrome*/

// setting up indexedDB
if (!indexedDB) {
  console.log(`Your browser doesn't support IndexedDB`);
} else {
  console.log("IndexedDB is supported");
}

let db = null;

function initialize_database() {
  // Using MyTestDB50 for development
  const request = indexedDB.open("MyTestDB50");
  request.onerror = function (event) {
    console.log("Problem opening DB.");
  };
  request.onupgradeneeded = function (event) {
    db = event.target.result;
    let objectStore = db.createObjectStore("web_secure_cache", {
      keyPath: "url",
    });
    objectStore.transaction.oncomplete = function (event) {
      console.log("ObjectStore Created.");
    };
  };
  request.onsuccess = function (event) {
    db = event.target.result;
    console.log("DB OPENED.");
    // insert_record({
    //   url: "https://www.google.com",
    //   data: {
    //     hacks: 0,
    //   },
    // });
  };
}
function insert_data(data) {
  if (db) {
    const insert_transaction = db.transaction("web_secure_cache", "readwrite");
    const objectStore = insert_transaction.objectStore("web_secure_cache");
    return new Promise((resolve, reject) => {
      insert_transaction.oncomplete = function () {
        console.log("ALL INSERT TRANSACTIONS COMPLETE.");
        resolve(true);
      };

      insert_transaction.onerror = function () {
        console.log("PROBLEM INSERTING RECORDS.");
        resolve(false);
      };
      let request = objectStore.add(data);
      request.onsuccess = function () {
        console.log("Added: ", data);
      };
    });
  }
}
function get_data(url) {
  if (db) {
    const get_transaction = db.transaction("web_secure_cache", "readonly");
    const objectStore = get_transaction.objectStore("web_secure_cache");
    return new Promise((resolve, reject) => {
      get_transaction.oncomplete = function () {
        console.log("ALL GET TRANSACTIONS COMPLETE.");
      };

      get_transaction.onerror = function () {
        console.log("PROBLEM GETTING RECORDS.");
      };

      let request = objectStore.get(url);

      request.onsuccess = function (event) {
        resolve(event.target.result);
      };
    });
  }
}

initialize_database();
// end of indexedDB setup

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
  } else if (request.message === "SET_WHITELIST") {
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
            { web_secure_whitelist: newWhitelist },
            () => {
              sendResponse({ status: true });
            }
          );
        });
      }
    );
  } else if (request.message === "REMOVE_WHITELIST") {
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
          chrome.storage.local.set(
            { web_secure_whitelist: newWhitelist },
            () => {
              sendResponse({ status: true });
            }
          );
        });
      }
    );
  } else if (request.message === "GET_API_DATA") {
    const cacheQuery = get_data(request.url);
    cacheQuery.then((res) => {
      if (res) {
        sendResponse({ data: res.data, status: "success from cache" });
      } else {
        // fetch data from api and cache it
        fetch(request.url)
          .then((response) => response.json())
          .then((res) => {
            console.log(res);
            sendResponse({ data: res, status: "success from api" });
            const newData = { url: request.url, data: res };
            const cacheAdd = insert_data(newData);
            cacheAdd.then((res) => {
              if (res) {
                console.log({ data: res, status: "cache success" });
              } else {
                console.log({ status: "cache error" });
              }
            });
          })
          .catch((err) => {
            console.log({ err });
          });
      }
    });
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
