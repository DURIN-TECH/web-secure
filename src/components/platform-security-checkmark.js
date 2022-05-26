import React from "react";
import { FiAward } from "react-icons/fi";

export default function PlatformSecurityCheckmark() {
  return (
    <>
      <div className="platform-checkmark">
        <div className="platform-checkmark__header">
          <h2> <FiAward style={{marginRight:5}}/> Platform Rating</h2>
          <p>uniswap.org</p>
        </div>
        <div className="platform-checkmark__main-details">
          <h3>Dapp Rank: 1</h3>
          <p>0x4da...ef23</p>
          <h1>A+</h1>
        </div>
        <div className="platform-checkmark__more-details">
          <span><h2>About</h2>
            <p>Uniswap is a decentralized exchange
              protocol built on Ethereum. To be more precise,
              it is an automated liquidity protocol.
              There is no order book or any centralized
              party required to make trades. Uniswap
              allows users to trade without intermediaries,
              with a high degree of decentralization and
              censorship-resistance.</p>
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
