import React, { useState } from "react";
import {
  Box,
  Alert,
  Snackbar,
  Drawer,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import CampaignSlots from "./campaignSlots.js";
import LeftSide from "../components/leftSide.js";
import CreateOverview from "../scenes/overview/createOverview.js";
import CreateContent from "../scenes/content/createContent.js";
import CreateRecipients from "../scenes/recipients/createRecipients.js";
import RightSide from "../components/rightSide.js";
import NotificationRightSide from "../scenes/content/notification/notificationRightSide.js";

const CampaignWrapper = ({
  showLeftSide: propShowLeftSide,
  activeStep,
  setActiveStep,
  selectedCampaigns,
  setSelectedCampaigns,
  alertOpen,
  setAlertOpen,
  onCampaignSelectionChange,
  showRightSide,
  setShowRightSide,
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [showNotificationRightSide, setShowNotificationRightSide] =
    useState(false);
  const [selectedChips, setSelectedChips] = useState([]);
  const [selectedMergeField, setSelectedMergeField] = useState([]);

  const handleCampaignTypeUpdate = (newCampaignTypes) => {
    const campaignMap = {
      Email: "1",
      Notification: "2",
      Feed: "3",
      SMS: "4",
    };

    const newSelectedCampaigns = {};

    Object.keys(campaignMap).forEach((type) => {
      newSelectedCampaigns[campaignMap[type]] = false;
    });

    newCampaignTypes.forEach((campaignType) => {
      const id = campaignMap[campaignType.title];
      if (id) {
        newSelectedCampaigns[id] = true;
      }
    });

    setSelectedCampaigns(newSelectedCampaigns);
    if (onCampaignSelectionChange) {
      onCampaignSelectionChange(newSelectedCampaigns);
    }
  };

  const onNotificationRightClick = () => {
    setShowRightSide(false);
    setShowNotificationRightSide(true);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const handleStepClick = (step) => {
    setActiveStep(step);
    setShowNotificationRightSide(false);
    setShowRightSide(false);
  };

  const handleCampaignSelectionChange = (selections) => {
    setSelectedCampaigns(selections);
    if (onCampaignSelectionChange) {
      onCampaignSelectionChange(selections);
    }
  };

  const onRightClick = () => {
    setShowNotificationRightSide(false);
    setShowRightSide(true);
  };

  const [expanded, setExpanded] = useState(true);

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <CreateOverview
            selectedCampaigns={selectedCampaigns}
            onCampaignTypeUpdate={handleCampaignTypeUpdate}
            onClick={onRightClick}
            showRightSide={showRightSide}
            selectedChips={selectedChips}
          />
        );
      case 1:
        return (
          <CreateContent
            selectedCampaigns={selectedCampaigns}
            onClick={onNotificationRightClick}
            selectedMergeField={selectedMergeField}
            setSelectedMergeField={setSelectedMergeField}
            setShowNotificationRightSide={setShowNotificationRightSide}
            expanded={expanded}
            setExpanded={setExpanded}
          />
        );
      case 2:
        return (
          <CreateRecipients
            selectedCampaigns={selectedCampaigns}
            expanded={expanded}
            setExpanded={setExpanded}
          />
        );
      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <Box className="Inner_wrapper">
      <Snackbar
        open={alertOpen}
        autoHideDuration={3000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleAlertClose}
          severity="warning"
          sx={{ width: "100%" }}
        >
          Please select at least one campaign type
        </Alert>
      </Snackbar>

      {propShowLeftSide && (
        <LeftSide
          activeStep={activeStep}
          handleStepClick={handleStepClick}
          showRightSide={showRightSide || showNotificationRightSide}
          expanded={expanded}
          setExpanded={setExpanded}
        />
      )}

      <Box
        className={`workspace-outer ${
          (showRightSide || showNotificationRightSide) && !isSmallScreen
            ? "rightside_show"
            : ""
        }`}
        sx={{
          display: "flex",
          gap: { xs: 1, lg: 3 },
        }}
      >
        <Box className="workspace">
          {propShowLeftSide ? (
            getStepContent(activeStep)
          ) : (
            <CampaignSlots onSelectionChange={handleCampaignSelectionChange} />
          )}
        </Box>
        {showRightSide && (
          <>
            {isSmallScreen ? (
              <Drawer
                className="main_wrapper_app"
                open={showRightSide}
                anchor="right"
                onClose={() => setShowRightSide(false)}
              >
                <RightSide
                  selectedChips={selectedChips}
                  setSelectedChips={setSelectedChips}
                  setShowRightSide={setShowRightSide}
                />
              </Drawer>
            ) : (
              <>
                <RightSide
                  selectedChips={selectedChips}
                  setSelectedChips={setSelectedChips}
                  setShowRightSide={setShowRightSide}
                />
              </>
            )}
          </>
        )}
        {showNotificationRightSide && (
          <>
            {isSmallScreen ? (
              <Drawer
                className="main_wrapper_app"
                open={showNotificationRightSide}
                anchor="right"
                onClose={() => setShowNotificationRightSide(false)}
              >
                <NotificationRightSide
                  setShowNotificationRightSide={setShowNotificationRightSide}
                  selectedMergeField={selectedMergeField}
                  setSelectedMergeField={setSelectedMergeField}
                />
              </Drawer>
            ) : (
              <>
                <NotificationRightSide
                  setShowNotificationRightSide={setShowNotificationRightSide}
                  selectedMergeField={selectedMergeField}
                  setSelectedMergeField={setSelectedMergeField}
                />
              </>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default CampaignWrapper;
