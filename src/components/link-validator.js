import React from "react";
import { FiLink, FiAlertTriangle } from "react-icons/fi";

export default function LinkValidator() {
  return (
    <>
      <div className="link-validator">
        <div className="link-validator__header">
          <span className="icon_wrapper">
            <FiLink />  <h3>Link Validator</h3>
          </span>
          <p>
            Verdict: <b> In Progress</b>
          </p>
        </div>
        <div className="link-validator__main">
          <span className="link-validator__main__link current_link">
            <b><h2>Current Link</h2></b>
            <p>https://uniswop.com</p>
          </span>
          <span className="link-validator__main__link original_link">
            <b><h2>Original Link</h2></b>
            <p>https://uniswap.com</p>
          </span>
        </div>
        <span className="detected_difference">
          <em> <FiAlertTriangle /><h2>Detected Change</h2></em>
          <p>https://-----o-.com</p>
        </span>

      </div>

    </>
  );
}
