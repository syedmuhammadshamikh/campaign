import React, { useState } from "react";
import { Box, Typography, Tabs, Tab } from "@mui/material";
import EmailTab from "./email/email";
import NotificationTab from "./notification/notification";
import FeedTab from "./feed/feed";
import SmsTab from "./sms/sms";

const CustomTabPanel = ({ children, value, index }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
};

const CreateContent = ({
  selectedCampaigns,
  onClick,
  selectedMergeField,
  setSelectedMergeField,
  expanded,
  setExpanded,
  setShowNotificationRightSide,
}) => {
  const [value, setValue] = useState(0);

  // Map campaign IDs to their respective tabs
  const campaignTabs = {
    1: {
      label: "Email",
      component: <EmailTab expanded={expanded} setExpanded={setExpanded} />,
    },
    2: {
      label: "Notification",
      component: (
        <NotificationTab
          selectedMergeField={selectedMergeField}
          setSelectedMergeField={setSelectedMergeField}
          onClick={onClick}
        />
      ),
    },
    3: { label: "Feed", component: <FeedTab /> },
    4: { label: "SMS", component: <SmsTab /> },
  };

  // Filter the tabs based on the selected campaigns
  const filteredTabs = Object.entries(selectedCampaigns)
    .filter(([campaignId, isSelected]) => isSelected)
    .map(([campaignId]) => campaignTabs[campaignId]);

  const handleTabChange = (e, newValue) => {
    setValue(newValue);
    // Close notification right side when tab changes
    if (setShowNotificationRightSide) {
      setShowNotificationRightSide(false);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box
        className="ns_campaign_tabs"
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Tabs
          value={value}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="off"
          aria-label="content tabs"
        >
          {filteredTabs.map((tab, index) => (
            <Tab
              key={index}
              label={tab.label}
              id={`tab-${index}`}
              aria-controls={`tabpanel-${index}`}
            />
          ))}
        </Tabs>
      </Box>
      {filteredTabs.map((tab, index) => (
        <CustomTabPanel key={index} value={value} index={index}>
          {tab.component}
        </CustomTabPanel>
      ))}
    </Box>
  );
};

export default CreateContent;
