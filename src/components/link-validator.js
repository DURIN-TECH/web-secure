import React from "react";
import { FiLink, FiAlertTriangle } from "react-icons/fi";
import { useEffect, useState } from "react";
import stringSimilarity from "string-similarity";
import { sites } from "./crypto-sites-array";

export default function LinkValidator() {
  const [link, setLink] = useState(null);
  const [similarLinks, setSimilarLinks] = useState([]);
  const [linkMatches, setMatches] = useState([]);
  useEffect(() => {
    // send a message to the background script to retrieve the current url
    window.chrome.runtime.sendMessage({ message: "GET_URL" }, (response) => {
      setLink(response.url);
    });
  }, []);
  useEffect(() => {
    if (link) {
      const inputString = link;
      var matches = stringSimilarity.findBestMatch(inputString, sites);
      console.log(matches); //produces response with rating to each string
      setMatches(matches);
      //initialize an empty array to store similar strings
      var getSimilar = [];
      for (var i in matches.ratings) {
        if (matches.ratings[i].rating > 0.4) {
          getSimilar.push(matches.ratings[i].target);
        }
      }

      setSimilarLinks(getSimilar);
      window.chrome.runtime.sendMessage({
        message: "console",
        matches,
        getSimilar,
      });
    }
  }, [link]);
  return (
    <>
      <div class="link-validator">
        <div class="link-validator__header">
          <span className="icon_wrapper">
            <FiLink /> <h3>Link Validator</h3>
          </span>
          <p>
            Verdict: <b> In Progress</b>
          </p>
        </div>
        <div class="link-validator__main">
          <span class="link-validator__main__link current_link">
            <b>
              <h2>Current Link</h2>
            </b>
            <p>{link}</p>
          </span>
          <span class="link-validator__main__link original_link">
            <b>
              <h2>Original Link</h2>
            </b>
            <p>https://uniswap.com</p>
          </span>
        </div>
        <span class="detected_difference">
          <em>
            {" "}
            <FiAlertTriangle />
            <h2>Detected Change</h2>
          </em>
          <p>https://-----o-.com</p>
        </span>
      </div>
    </>
  );
}
