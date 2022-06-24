import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Select } from "@chakra-ui/react";
import { FiChevronDown, FiSearch, FiAlertTriangle } from "react-icons/fi";
import { tokenList } from "./token-list";
import axios from "axios";

export default function NFTPriceChecker() {
  const [tokenAddress, setTokenAddress] = useState("");
  const [offerAmount, setOfferAmount] = useState("");
  const [offerValue, setOfferValue] = useState("");

  const handleTokenType = (e) => {
    setTokenAddress(e.target.value);
  };
  const handleOfferAmount = (e) => {
    setOfferAmount(e.target.value);
  };
  const handleSummary = (e) => {
    if (offerAmount && tokenAddress) {
      const headers = {
        "Content-Type": "application/json",
        "X-API-Key":
          "oGVKdL8OxL5M1sVH2jYTA9WKYHshReAGBHbRJG5Z7s9OzIPsXzASXbpZ5VNB40Dv",
      };

      axios
        .get(
          `
      https://deep-index.moralis.io/api/v2/erc20/${tokenAddress}/price?chain=eth`,
          {
            headers: headers,
          }
        )
        .then((response) => {
          const currentPrice = response.data.usdPrice;
          setOfferValue(currentPrice * offerAmount);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      toast.warning("Please fill both amount and token type fields!", {
        autoClose: 2000,
        position: "bottom-right",
        closeButton: false,
      });
    }
  };

  return (
    <>
      <div className="price-checker">
        <div className="price-checker__header">
          <h3>
            <FiSearch style={{ marginRight: 5 }} />
            NFT Price Check
          </h3>
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
              NFT Address
              <input type="text" />
            </div>
            <div className="nft-details__token-id">
              Token ID
              <input type="text" />
            </div>
          </div>

          <div className="offer-details">
            <div className="offer-details__amount">
              Offer Amount
              <input
                type="text"
                value={offerAmount}
                onChange={handleOfferAmount}
              />
            </div>
            <div className="offer-details__token-type">
              Token Type
              <Select
                size="sm"
                _focus={{ boxShadow: "none" }}
                placeholder="Select token"
                value={tokenAddress}
                onChange={handleTokenType}
              >
                {tokenList.map((token) => (
                  <option value={token.address}>{token.symbol}</option>
                ))}
              </Select>
            </div>
          </div>
          <div className="generate_summary">
            <button className="generate_summary__btn" onClick={handleSummary}>
              {" "}
              Generate Summary
            </button>
          </div>

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
