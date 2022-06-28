import React, { useEffect, useContext } from "react";
import { FiAward } from "react-icons/fi";
import { ThemeContext } from "../context/themeContext";

export default function PlatformSecurityCheckmark() {
  const { darkMode } = useContext(ThemeContext);

  // send a message to the background script to get exploits data
  useEffect(() => {
    window.chrome.runtime.sendMessage(
      {
        message: "GET_API_DATA",
        url: "https://jsonplaceholder.typicode.com/todos/1",
      },
      (response) => {
        // do stuff with response
      }
    );
  }, []);

  return (
    <>
      <div className="platform-checkmark">
        <div className="platform-checkmark__header">
          <h2>
            {" "}
            <FiAward style={{ marginRight: 5 }} /> Platform Rating
          </h2>
          <p className={darkMode ? "address-dark" : ""}>uniswap.org</p>
        </div>
        <div className="platform-checkmark__main-details">
          <h3>Dapp Rank: 1</h3>
          <p className={darkMode ? "address-dark" : ""}>0x4da...ef23</p>
          <h1>A+</h1>
        </div>
        <div
          className={`platform-checkmark__more-details ${
            darkMode ? "scroll-dark" : ""
          }`}
        >
          <span>
            <h2>About</h2>
            <p id="about">
              Uniswap is a decentralized exchange protocol built on Ethereum. To
              be more precise, it is an automated liquidity protocol. There is
              no order book or any centralized party required to make trades.
              Uniswap allows users to trade without intermediaries, with a high
              degree of decentralization and censorship-resistance.
            </p>
          </span>
          <span>
            <h2>Reported Exploits</h2>
            <p>None</p>
          </span>
          <span>
            <h2>Socials</h2>
            <p>Discord</p>
            <p>Twitter</p>
            <p>CoinGecko</p>
            <p>CMC</p>
          </span>
        </div>
      </div>
    </>
  );
}
