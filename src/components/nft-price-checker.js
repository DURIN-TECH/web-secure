import React, { useEffect, useState } from "react";
import { Select } from "@chakra-ui/react";
import { FiChevronDown, FiSearch, FiAlertTriangle } from "react-icons/fi";
import { tokenList } from "./token-list";
import axios from "axios";

export default function NFTPriceChecker() {
  const [tokenType, setTokenType] = useState("");
  const [offerAmount, setOfferAmount] = useState("");
  const [offerValue, setOfferValue] = useState("");

  const handleTokenType = (e) => {
    setTokenType(e.target.value);
  };
  const handleOfferAmount = (e) => {
    setOfferAmount(e.target.value);
  };
  const handleSummary = (e) => {
    if (offerAmount && tokenType) {
      axios
      .get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${tokenType}&vs_currencies=usd`
      )
        .then((response) => {
          console.log(tokenType)
        console.log(response)
          const currentPrice = response.data[tokenType].usd;
        setOfferValue(currentPrice * offerAmount);
      })
      .catch((err) => {
        console.log({ err });
      });
    } else {
      alert("Please fill both amount and token type fields")
    }
    
  };

  return (
    <>
      <div className="price-checker">
        <div className="price-checker__header">
          <span className="icon_wrapper">
            <FiSearch /> <h3>NFT Price Check</h3>
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
              <input
                type="text"
                value={offerAmount}
                onChange={handleOfferAmount}
              />
            </div>
            <div className="offer-details__token-type">
              <p>Token Type</p>
              <Select
                size="md"
                _focus={{ boxShadow: "none" }}
                placeholder="Select token"
                value={tokenType}
                onChange={handleTokenType}
              >
                {tokenList.map((token) => (
                  <option value={token.name.replace(/\s+/g, "-").toLowerCase()}>
                    {token.symbol}
                  </option>
                ))}
              </Select>
            </div>
          </div>
          <button onClick={handleSummary}> Generate Summary</button>
          <div className="summary_list">
            <h2>
              <b>Executive Summary</b>
            </h2>
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
              <input
                className="summary__input"
                type="text"
                value={offerValue}
              />
            </div>
            <div className="summary">
              <div className="summary__title">Price Difference (USD)</div>
              <input className="summary__input" type="text" />
            </div>
          </div>
          <div className="verdict">
            <h2>
              <FiAlertTriangle /> Verdict: <b>In Progress</b>{" "}
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}
