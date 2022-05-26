import React from "react";
import { FiLink, FiAlertTriangle } from "react-icons/fi";
import { useEffect, useState } from "react";
import stringSimilarity from "string-similarity";
import { sites } from "./crypto-sites-array";

export default function LinkValidator() {
  const str = "www.";
  const [currentLink, setCurrentLink] = useState(null);
  const [bestMatch, setBestMatch] = useState(null);
  const [alert, setAlert] = useState({});
  const [verdict, setVerdict] = useState({});

  // get cuurent tab URL from background script
  useEffect(() => {
    // send a message to the background script to retrieve the current url
    window.chrome.runtime.sendMessage({ message: "GET_URL" }, (response) => {
      // format string to remove trailing slash and www.
      const url = response.url;
      const formatURL = url.split("/").slice(0, 3).join("/");
      const formattedUrl = formatURL.replace(str, "");
      setCurrentLink(formattedUrl.replace(/\/$/, ""));
    });
  }, []);

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
      const alpha = bestMatch.split("");
      const beta = currentLink.split("");
      let diff = [];
      alpha.forEach((letter, index) => {
        if (letter !== beta[index]) {
          diff.push(beta[index]);
        }
      });
      // if there is difference between the two strings then the link is insecure
      if (diff.length) {
        setAlert({
          status: "bad",
          message: `detected changes in URL`,
        });
        setVerdict({ status: "bad", message: "Fake" });
      } else {
        setAlert({ status: "good", message: `no detected changes in URL` });
        setVerdict({ status: "good", message: "Original" });
      }
    }
  }, [bestMatch, currentLink]);

  return (
    <>
      <div className="link-validator">
        <div className="link-validator__header">
          <span className="icon_wrapper">
            <FiLink /> <h3>Link Validator</h3>
          </span>
          <p>
            Verdict:{" "}
            <b
              style={
                verdict.status === "good" ? { color: "green" } : { color: "red" }
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
              <h2>Original Link</h2>
            </b>
            <p>{bestMatch}</p>
          </span>
        </div>
        <span className="detected_difference">
          <em>
            {" "}
            <FiAlertTriangle />
            <h2>Detected Change</h2>
          </em>
          {alert && (
            <p
              style={
                alert.status === "good" ? { color: "green" } : { color: "red" }
              }
            >
              {alert.message}
            </p>
          )}
        </span>
      </div>
    </>
  );
}
