import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import LinkValidator from "./link-validator";
import CheckApprovals from "./check-approvals";
import NFTPriceChecker from "./nft-price-checker";
import PlatformSecurityCheckmark from "./platform-security-checkmark";
import { ToastContainer } from "react-toastify";
import {
  FiLink,
  FiCheckSquare,
  FiDollarSign,
  FiShield,
} from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";

export default function HomeTabs() {
  return (
    <>
      {" "}
      <Tabs>
        <TabList
          style={{ display: "flex", justifyContent: "space-evenly" }}
          padding="0px"
        >
          <Tab _focus={{ boxShadow: "none" }} fontSize="sm">
            <FiLink style={{ marginRight: 5 }} /> Links
          </Tab>
          <Tab _focus={{ boxShadow: "none" }} fontSize="sm">
            <FiCheckSquare style={{ marginRight: 10 }} />
            Approval
          </Tab>
          <Tab _focus={{ boxShadow: "none" }} fontSize="sm">
            <FiDollarSign style={{ marginRight: 5 }} size={20} />
            Price Checker
          </Tab>
          <Tab _focus={{ boxShadow: "none" }} fontSize="sm">
            <FiShield style={{ marginRight: 5 }} />
            Security
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel padding="0px">
            <LinkValidator />
          </TabPanel>
          <TabPanel padding="0px">
            <CheckApprovals />
          </TabPanel>
          <TabPanel padding="0px">
            <NFTPriceChecker />
          </TabPanel>
          <TabPanel padding="0px">
            <PlatformSecurityCheckmark />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <ToastContainer position="bottom-right" />
    </>
  );
}
