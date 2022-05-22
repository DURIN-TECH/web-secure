import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import LinkValidator from "./link-validator";
import CheckApprovals from "./check-approvals";
import NFTPriceChecker from "./nft-price-checker";
import PlatformSecurityCheckmark from "./platform-security-checkmark";

export default function HomeTabs() {
  return (
    <>
      {" "}
      <Tabs>
        <TabList padding="0px">
          <Tab _focus={{boxShadow: "none"}} fontSize="sm">Links</Tab>
          <Tab _focus={{boxShadow: "none"}} fontSize="sm">Approval</Tab>
          <Tab _focus={{boxShadow: "none"}} fontSize="sm">Price Checker</Tab>
          <Tab _focus={{boxShadow: "none"}} fontSize="sm">Security</Tab>
        </TabList>

        <TabPanels>
          <TabPanel padding="0px">
            <LinkValidator />
          </TabPanel>
          <TabPanel padding="0px">
            <CheckApprovals/>
          </TabPanel>
          <TabPanel padding="0px">
            <NFTPriceChecker/>
          </TabPanel>
          <TabPanel padding="0px">
            <PlatformSecurityCheckmark/>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
