import React from "react";
import { FiCheckSquare, FiBox, FiX } from "react-icons/fi";

export default function CheckApprovals() {
  return (
    <>
      <div className="approvals">
        <div className="approvals__header">
          <span className="icon_wrapper">
            <FiCheckSquare /> <h3>Approval Checker</h3>
          </span>
          <p>
            <b>0xef1...45bd</b>
          </p>
        </div>
        <h3 className="contracts_header">
          Detected Contracts <FiBox style={{ marginLeft: 10 }} />
        </h3>

        <div className="contract_list">
          <div className="contract">
            <div className="contract__title">0xef1...45bd [UNI-V3 LP]</div>
            <div className="contract__button">
              <FiX /> <p>Revoke</p>{" "}
            </div>
          </div>
          <div className="contract">
            <div className="contract__title">0xef1...45bd [UNI-V3 LP]</div>
            <div className="contract__button">
              <FiX /> <p>Revoke</p>{" "}
            </div>
          </div>
          <div className="contract">
            <div className="contract__title">0xef1...45bd [UNI-V3 LP]</div>
            <div className="contract__button">
              <FiX /> <p>Revoke</p>{" "}
            </div>
          </div>
          <div className="contract">
            <div className="contract__title">0xef1...45bd [UNI-V3 LP]</div>
            <div className="contract__button">
              <FiX /> <p>Revoke</p>{" "}
            </div>
          </div>
          <div className="contract">
            <div className="contract__title">0xef1...45bd [UNI-V3 LP]</div>
            <div className="contract__button">
              <FiX /> <p>Revoke</p>{" "}
            </div>
          </div>
          <div className="contract">
            <div className="contract__title">0xef1...45bd [UNI-V3 LP]</div>
            <div className="contract__button">
              <FiX /> <p>Revoke</p>{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
