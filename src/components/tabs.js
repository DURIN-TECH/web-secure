import React, { useContext } from "react";
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
import { ThemeContext } from "../context/themeContext";

export default function HomeTabs() {
  const { darkMode } = useContext(ThemeContext)
  const tabMode =  darkMode ? {borderBottomColor:'#66FCF1',color:'#66FCF1'} : null
  return ( 
    <>
      {" "}
      <Tabs>
        <TabList
          style={{ display: "flex", justifyContent: "space-evenly" }}
          padding="0px"
        >
          <Tab _selected={tabMode} _focus={{ boxShadow: "none"}} fontSize="sm">
            <FiLink style={{ marginRight: 5 }} /> Links
          </Tab>
          <Tab _selected={tabMode} _focus={{ boxShadow: "none" }} fontSize="sm">
            <FiCheckSquare style={{ marginRight: 10 }} />
            Approval
          </Tab>
          <Tab _selected={tabMode} _focus={{ boxShadow: "none" }} fontSize="sm">
            <FiDollarSign style={{ marginRight: 5 }} size={20} />
            Price Checker
          </Tab>
          <Tab _selected={tabMode} _focus={{ boxShadow: "none" }} fontSize="sm">
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
