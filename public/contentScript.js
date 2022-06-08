/*global chrome*/

// send a message to the background script to retrieve the current url
chrome.runtime.sendMessage({ message: "GET_URL" }, (response) => {
  const url = response.url;
  const rootURL = url.split("/").slice(0, 3).join("/");
  chrome.storage.local.get("web_secure_whitelist", (result) => {
    const whitelist = result.web_secure_whitelist;
    // check if url is in array
    const isInArray =  whitelist.includes(rootURL);
  
    if (isInArray === false) {
      if (
        window.find("seed phrase") ||
        window.find("private key") ||
        window.find("pass phrase")
      ) {
        // retrieves all input tags on the site and disables them
        const inputs = Array.from(document.getElementsByTagName("input"));
        inputs.forEach((input) => {
          input.disabled = true;
          input.style.borderColor = "red";
          input.value = "disabled";
        });
        alert(
          `Due to occurence of keywords such as [seed phrase, private key, pass phrase]. All input fields have been disabled for security reasons`
        );
      }
    }
  });
});


