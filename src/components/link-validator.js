import React from "react";
import { FiLink,FiAlertTriangle } from "react-icons/fi";

export default function LinkValidator() {
  return (
    <>
      <div class="link-validator">
        <div class="link-validator__header">
          <span className="icon_wrapper">
            <FiLink />  <h3>Link Validator</h3> 
          </span>
          <p>
            Verdict: <b> In Progress</b>
          </p>
        </div>
        <div class="link-validator__main">
          <span class="link-validator__main__link current_link">
            <b><h2>Current Link</h2></b>
            <p>https://uniswop.com</p>
          </span>
          <span class="link-validator__main__link original_link">
            <b><h2>Original Link</h2></b>
            <p>https://uniswap.com</p>
          </span>
        </div>
        <span class="detected_difference">
          <em> <FiAlertTriangle/><h2>Detected Change</h2></em>
          <p>https://-----o-.com</p>
        </span>

      </div>

    </>
  );
}
