import React, { useEffect, useRef, useState } from "react";
import Header from "../components/mainHeader";
import { menuItems } from "../data/menuItems";
import CampaignWrapper from "./createCampaignStepperlayout";
import useHeaderHeight from "../hooks/useHeaderHeight";

const CreateCampaign = () => {
  const [showLeftSide, setShowLeftSide] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [selectedCampaigns, setSelectedCampaigns] = useState({});
  const [alertOpen, setAlertOpen] = useState(false);

  const headerRef = useHeaderHeight();

  const handleCreateNewCampaign = () => {
    const hasSelectedCampaigns = Object.values(selectedCampaigns).some(
      (selected) => selected
    );

    if (hasSelectedCampaigns) {
      setShowLeftSide(true);
    } else {
      setAlertOpen(true);
    }
  };

  const handleSave = () => {
    console.log("Save button clicked");
  };

  const handleFinalize = () => {
    console.log("Finalize Campaign button clicked");
  };

  const handleNext = () => {
    if (activeStep < 2) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevStep) => prevStep - 1);
    }
  };

  const handleBackButtonClick = () => {
    if (showLeftSide) {
      setShowLeftSide(false);
    }
    setShowRightSide(false);
  };

  const handleCampaignSelectionChange = (selections) => {
    setSelectedCampaigns(selections);
  };
  const [showRightSide, setShowRightSide] = useState(false);

  const [checkedSlots, setCheckedSlots] = useState({});

  return (
    <>
      <Header
        headerRef={headerRef}
        title="Create Campaign"
        description="Now you can create multiple types of campaigns at a time by selecting multiple options."
        hideDescription={showLeftSide}
        dottedMenuButton={{
          enable: showLeftSide,
        }}
        onBackButtonClick={!showLeftSide ? undefined : handleBackButtonClick}
        menuItems={menuItems}
        showIcon={true}
        buttons={{
          add: {
            enable: showLeftSide, // Only show Save after Create Campaign is clicked
            label: "Save",
            onClick: handleSave,
            className: "ns_secondary_btn",
          },
          save: {
            // enable: showLeftSide && activeStep === 2,
            enable: showLeftSide,
            label: "Finalize Campaign",
            onClick: handleFinalize,
            className: "ns_primary_btn",
            disabled: activeStep < 2,
          },
          create: {
            enable: !showLeftSide, // Hide Create Campaign after it's clicked
            label: "Create Campaign",
            onClick: handleCreateNewCampaign,
            className: "ns_primary_btn",
          },
          next: {
            enable: showLeftSide && activeStep < 2, // Only show Next when not on last step
            label: "Next",
            onClick: handleNext,
            className: "ns_primary_btn",
          },
          // back: {
          //   enable: showLeftSide && activeStep > 0, // Only show Back when not on first step
          //   label: "Back",
          //   onClick: handleBack,
          //   className: "ns_secondary_btn",
          // },
        }}
        buttonOrder={["add", "save", "back", "next", "create"]}
      />
      <CampaignWrapper
        showLeftSide={showLeftSide}
        setShowLeftSide={setShowLeftSide}
        showRightSide={showRightSide}
        setShowRightSide={setShowRightSide}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        selectedCampaigns={selectedCampaigns}
        setSelectedCampaigns={setSelectedCampaigns}
        alertOpen={alertOpen}
        setAlertOpen={setAlertOpen}
        onCampaignSelectionChange={handleCampaignSelectionChange}
      />
    </>
  );
};

export default CreateCampaign;
