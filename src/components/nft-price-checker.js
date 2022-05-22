import React from "react";
import { FaSearchDollar } from "react-icons/fa";
import { FiChevronDown,FiAlertTriangle } from "react-icons/fi";

export default function NFTPriceChecker() {
  return (
    <>
      <div class="price-checker">
        <div class="price-checker__header">
          <span className="icon_wrapper">
            <FaSearchDollar /> <h3>NFT Price Check</h3>
          </span>
          <p>
            <b>0xef1...45bd</b>
          </p>
        </div>
        <h3 className="offer_header">
          Offer Details <FiChevronDown style={{ marginLeft: 10 }} />
        </h3>
        <div className="scroll">
          <div className="nft-details">
            <div className="nft-details__address">
              <p>NFT Address</p>
              <input type="text" />
            </div>
            <div className="nft-details__token-id">
              <p>Token ID</p>
              <input type="text" />
            </div>
          </div>

          <div className="offer-details">
            <div className="offer-details__amount">
              <p>Offer Amount</p>
              <input type="text" />
            </div>
            <div className="offer-details__token-type">
              <p>Token Type</p>
              <input type="text" />
            </div>
          </div>
          <div className="summary_list">
            <h2><b>Executive Summary</b></h2>
            <div className="summary">
              <div className="summary__title">Purchase Amount</div>
              <input className="summary__input" type="text" />
            </div>{" "}
            <div className="summary">
              <div className="summary__title">Purchase Amount</div>
              <input className="summary__input" type="text" />
            </div>{" "}
            <div className="summary">
              <div className="summary__title">Purchase Token</div>
              <input className="summary__input" type="text" />
            </div>{" "}
            <div className="summary">
              <div className="summary__title">Purchase Value (USD)</div>
              <input className="summary__input" type="text" />
            </div>{" "}
            <div className="summary">
              <div className="summary__title">Offer Value (USD)</div>
              <input className="summary__input" type="text" />
            </div>
            <div className="summary">
              <div className="summary__title">Price Difference (USD)</div>
              <input className="summary__input" type="text" />
            </div>
          </div>
          <div className="verdict">
            <h2>
              <FiAlertTriangle/> Verdict: <b>In Progress</b>{" "}
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}
