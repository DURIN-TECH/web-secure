import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiAlertTriangle, FiCheckCircle } from "react-icons/fi";
import { Switch } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import stringSimilarity from "string-similarity";
import { sites } from "./crypto-sites-array";

export default function LinkValidator() {
  const str = "www.";
  const [currentLink, setCurrentLink] = useState(null);
  const [bestMatch, setBestMatch] = useState(null);
  const [validationAlert, setAlert] = useState({});
  const [verdict, setVerdict] = useState({});
  const [checked, setChecked] = useState(false);
  const [rootURL, setRootURL] = useState(false);

  // handle black/whitelisting of sites
  const handleListing = (isChecked) => {
    if (isChecked === true) {
      // send a message to the background script to whitelist current url
      window.chrome.runtime.sendMessage(
        { message: "SET_WHITELIST" },
        (response) => {
          if (response.status === true) {
            toast.success(
              "this site has been whitelisted. Refresh to see changes.",
              { autoClose: 2000, closeButton: false }
            );
          }
        }
      );
    } else {
      // send a message to the background script to remove current url from whitelist
      window.chrome.runtime.sendMessage(
        { message: "REMOVE_WHITELIST" },
        (response) => {
          if (response.status === true) {
            toast.info("this site has been removed from whitelist.", {
              autoClose: 2000,
              position: "bottom-right",
              closeButton: false,
            });
          }
        }
      );
    }
  };
  const handleCheck = () => {
    setChecked(!checked);
    handleListing(!checked);
  };

  // get current tab URL from background script
  useEffect(() => {
    // send a message to the background script to retrieve the current url
    window.chrome.runtime.sendMessage({ message: "GET_URL" }, (response) => {
      // format string to remove trailing slash and www.
      const url = response.url;
      const formatURL = url.split("/").slice(0, 3).join("/");
      setRootURL(formatURL);
      const formattedUrl = formatURL.replace(str, "");
      setCurrentLink(formattedUrl.replace(/\/$/, ""));
    });
  }, []);

  // get whitelist from storage
  useEffect(() => {
    window.chrome.storage.local.get("web_secure_whitelist", (result) => {
      const whitelist = result.web_secure_whitelist;
      // check if url is in array
      const isInArray = whitelist.includes(rootURL);
      if (isInArray) {
        setChecked(true);
      }
    });
  }, [rootURL]);

  // find best matched URL from array
  useEffect(() => {
    if (currentLink) {
      const inputString = currentLink;
      // finds best matching link from sites array
      var matches = stringSimilarity.findBestMatch(inputString, sites);
      // removes www. from site names to allow equal comparison
      setBestMatch(matches.bestMatch.target.replace(str, ""));
    }
  }, [currentLink]);

  // compare Current URL and best matched URl
  useEffect(() => {
    if (bestMatch && currentLink) {
      if (bestMatch.length !== currentLink.length) {
        setAlert({
          status: "bad",
          message: `detected changes in URL`,
        });
        setVerdict({ status: "bad", message: "Fake" });
      } else {
        const alpha = bestMatch.split("");
        const beta = currentLink.split("");
        let diff = [];
        let diffIndex = [];
        alpha.forEach((letter, index) => {
          if (letter !== beta[index]) {
            diff.push(beta[index]);
            diffIndex.push(index);
          }
        });
        if (!diff.length) {
          setAlert({ status: "good", message: `no detected changes in URL` });
          setVerdict({ status: "good", message: "Original" });
        } else {
          let diffString = "";
          for (let index = 0; index < currentLink.length; index++) {
            if (!diffIndex.includes(index)) {
              diffString = diffString + "-";
            } else {
              diffString = diffString + `${currentLink[index]}`;
            }
          }
          const dots = currentLink.split(".");
          const tld = dots[1];
          const tldLength = tld.length + 1;
          const diffString2 = diffString.slice(8, -tldLength);
          const difference = `https://${diffString2}.${tld}`;
          setAlert({ status: "bad", message: `${difference}` });
          setVerdict({ status: "bad", message: "Fake" });
        }
      }
    }
  }, [bestMatch, currentLink]);

  return (
    <>
      <div className="link-validator">
        <div className="link-validator__header">
          <h3>
            {" "}
            <FiCheckCircle style={{ marginRight: 5 }} /> Link Validator
          </h3>
          <p>
            Verdict:{" "}
            <b
              style={
                verdict.status === "good"
                  ? { color: "#00E676" }
                  : { color: "#D50000" }
              }
            >
              {verdict.message}
            </b>
          </p>
        </div>
        <div className="link-validator__main">
          <span className="link-validator__main__link current_link">
            <b>
              <h2>Current Link</h2>
            </b>
            <p>{currentLink}</p>
          </span>
          <span className="link-validator__main__link original_link">
            <b>
              <h2>Matched Link</h2>
            </b>
            <p>{bestMatch}</p>
          </span>
        </div>
        <span className="detected_difference">
          <span>
            {" "}
            <FiAlertTriangle />
            <h2>Detected Change</h2>
          </span>
          {validationAlert && (
            <p
              style={
                validationAlert.status === "good"
                  ? { color: "#00E676" }
                  : { color: "#D50000" }
              }
            >
              {validationAlert.message}
            </p>
          )}
        </span>
        <div className="whitelist_site">
          <h2>Whitelist Site</h2>
          <Switch
            id="whitelist_site"
            size="md"
            style={{ marginLeft: 10 }}
            isChecked={checked}
            onChange={handleCheck}
          />
        </div>
      </div>
    </>
  );
}
