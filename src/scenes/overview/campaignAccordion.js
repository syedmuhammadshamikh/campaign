import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Icon, Typography } from "@mui/material";
import {
  email_icon,
  sms_icon,
  feed_icon,
  notification_icon,
} from "../../data/menuItems";
import EmailData from "./email/emailData";
import NotificationData from "./notification/notificationData";
import SmsData from "./sms/smsData";
import FeedData from "./feed/feedData";

const CampaignAccordion = ({
  selectedCampaigns = {},
  showRightSide,
  onClick,
  launchType,
  selectedChips,
}) => {
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // Map campaign IDs to their respective panel information
  const campaignPanels = {
    1: {
      id: "email_accordion",
      component: (
        <EmailData
          showRightSide={showRightSide}
          onClick={onClick}
          launchType={launchType}
          selectedChips={selectedChips}
        />
      ),
      icon: email_icon,
      title: "Email",
      colorClass: "blue",
    },
    2: {
      id: "notification_accordion",
      component: <NotificationData showRightSide={showRightSide} />,
      icon: notification_icon,
      title: "Notification",
      colorClass: "purple",
    },
    3: {
      id: "feed_accordion",
      component: <FeedData showRightSide={showRightSide} />,
      icon: feed_icon,
      title: "Feed",
      colorClass: "darkyellow",
    },
    4: {
      id: "sms_accordion",
      component: <SmsData showRightSide={showRightSide} />,
      icon: sms_icon,
      title: "SMS",
      colorClass: "green",
    },
  };

  return (
    <Box className="ns_accordion_section">
      <Box className="typo_title">
        <Typography sx={{ mb: 2, display: { xs: "none", md: "block" } }}>
          Fill in the details of every campaign type selected.
        </Typography>
      </Box>
      <Box className="ns_accordion_style">
        {/* Only render accordion panels for selected campaign types */}
        {Object.entries(selectedCampaigns).map(([campaignId, isSelected]) => {
          if (!isSelected) return null;

          const panel = campaignPanels[campaignId];
          if (!panel) return null;

          return (
            <Accordion
              key={panel.id}
              expanded={expanded === panel.id}
              onChange={handleChange(panel.id)}
              id={panel.id}
              sx={{
                marginBottom: "20px",
                boxShadow: "none",
                border: "0px",
                borderRadius: "12px",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${panel.id}-content`}
                id={`${panel.id}-header`}
              >
                <Box display="flex" alignItems="center">
                  <Box className={`icons ${panel.colorClass}`}>
                    <Icon sx={{ width: 32, height: 32 }}>
                      <Box
                        component="img"
                        src={panel.icon}
                        alt={`${panel.title} icon`}
                      />
                    </Icon>
                  </Box>
                  <Typography component="label" sx={{ display: "block" }}>
                    {panel.title}
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>{panel.component}</AccordionDetails>
            </Accordion>
          );
        })}

        {/* Show a message if no campaigns are selected */}
        {Object.values(selectedCampaigns).every((val) => !val) && (
          <Typography sx={{ textAlign: "center", py: 4 }}>
            No campaign types selected. Please go back and select at least one
            campaign type.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default CampaignAccordion;
