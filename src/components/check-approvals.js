import React, { useContext } from "react";
import { FiBox, FiHexagon } from "react-icons/fi";
import { FaUnlink } from "react-icons/fa";
import { ThemeContext } from "../context/themeContext";

export default function CheckApprovals() {
  const { darkMode } = useContext(ThemeContext);

  return (
    <>
      <div className="approvals">
        <div className="approvals__header">
          <h3>
            <FiHexagon style={{ marginRight: 5 }} />
            Token Approvals
          </h3>
          <p>
            <b className={darkMode ? "address-dark" : ""}>0xef1...45bd</b>
          </p>
        </div>
        <h3 className="contracts_header">
          Detected Contracts <FiBox style={{ marginLeft: 10 }} />
        </h3>

        <div className={`contract_list ${darkMode ? "scroll-dark" : ""}`}>
          <div className={`contract ${darkMode ? "contract-dark" : ""}`}>
            <div className="contract__title">0xef1...45bd [UNI-V3 LP]</div>
            <div className="contract__button">
              <p className={darkMode ? "button-dark" : ""}>
                <FaUnlink style={{ marginRight: 5 }} /> Revoke
              </p>{" "}
            </div>
          </div>
          <div className={`contract ${darkMode ? "contract-dark" : ""}`}>
            <div className="contract__title">0xef1...45bd [UNI-V3 LP]</div>
            <div className="contract__button">
              <p className={darkMode ? "button-dark" : ""}>
                <FaUnlink style={{ marginRight: 5 }} /> Revoke
              </p>{" "}
            </div>
          </div>
          <div className={`contract ${darkMode ? "contract-dark" : ""}`}>
            <div className="contract__title">0xef1...45bd [UNI-V3 LP]</div>
            <div className="contract__button">
              <p className={darkMode ? "button-dark" : ""}>
                <FaUnlink style={{ marginRight: 5 }} /> Revoke
              </p>{" "}
            </div>
          </div>
          <div className={`contract ${darkMode ? "contract-dark" : ""}`}>
            <div className="contract__title">0xef1...45bd [UNI-V3 LP]</div>
            <div className="contract__button">
              <p className={darkMode ? "button-dark" : ""}>
                <FaUnlink style={{ marginRight: 5 }} /> Revoke
              </p>{" "}
            </div>
          </div>
          <div className={`contract ${darkMode ? "contract-dark" : ""}`}>
            <div className="contract__title">0xef1...45bd [UNI-V3 LP]</div>
            <div className="contract__button">
              <p className={darkMode ? "button-dark" : ""}>
                <FaUnlink style={{ marginRight: 5 }} /> Revoke
              </p>{" "}
            </div>
          </div>
          <div className={`contract ${darkMode ? "contract-dark" : ""}`}>
            <div className="contract__title">0xef1...45bd [UNI-V3 LP]</div>
            <div className="contract__button">
              <p className={darkMode ? "button-dark" : ""}>
                <FaUnlink style={{ marginRight: 5 }} /> Revoke
              </p>{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
