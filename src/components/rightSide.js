import React, { useState } from "react";
import { Box, Tabs, Tab, Typography, Divider, Button } from "@mui/material";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";

const CustomTabPanel = ({ children, value, index, ...other }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    {...other}
  >
    {value === index && <Box>{children}</Box>}
  </div>
);

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const a11yProps = (index) => ({
  id: `simple-tab-${index}`,
  "aria-controls": `simple-tabpanel-${index}`,
});

const tabContent = {
  Sponsor: [
    "Prosper. member ID",
    "Prosper sponsor First Name",
    "Reference sponsor First Name",
    "Prosper sponsor date",
    "Seconder member ID",
    "Robin member ID",
  ],
  Address: ["Street Address", "City", "State", "Postal Code", "Country"],
  System: ["User ID", "Account Type", "Last Login", "Status"],
  "Un-Subscription": ["Email Opt-Out", "SMS Opt-Out", "Do Not Call"],
  Member: ["Membership ID", "Join Date", "Expiry Date", "Member Status"],
  Company: ["Company Name", "Company ID", "Industry", "Headquarters"],
  Interest: ["Sports", "Music", "Technology", "Travel"],
};

const RightSide = ({ setShowRightSide, selectedChips, setSelectedChips }) => {
  const [value, setValue] = useState(0);
  const [isClosing, setIsClosing] = useState(false);

  const handleChange = (event, newValue) => setValue(newValue);

  const handleClose = () => {
    setIsClosing(true);
    // Delay to allow closing animation to complete
    setTimeout(() => {
      setShowRightSide(false);
    }, 300);
  };

  const handleChipClick = (chip) => {
    setSelectedChips((prev) =>
      prev.includes(chip)
        ? prev.filter((item) => item !== chip)
        : [...prev, chip]
    );
  };

  return (
    <Box className="right_section">
      <Box className="right_top">
        <Typography variant="h3">Personalized Subject</Typography>
        <CloseIcon
          onClick={handleClose}
          style={{
            cursor: "pointer",
            transition: "transform 0.2s",
            ":hover": {
              transform: "rotate(90deg)",
            },
          }}
        />
      </Box>
      <Box className="rightSide_tabs">
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            aria-label="basic tabs example"
          >
            {Object.keys(tabContent).map((label, index) => (
              <Tab key={index} label={label} {...a11yProps(index)} />
            ))}
          </Tabs>
        </Box>

        <Box className="tabs_data_bodyScroll">
          {Object.entries(tabContent).map(([label, data], index) => (
            <CustomTabPanel key={index} value={value} index={index}>
              <Box className="rightSide_tabs_data">
                <Box className="subject_chips">
                  {data.map((text, idx) => (
                    <Box
                      key={idx}
                      className={`subject_custom_chip ${
                        selectedChips.includes(text) ? "selected" : ""
                      }`}
                      onClick={() => handleChipClick(text)}
                    >
                      <Typography variant="p">{text}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </CustomTabPanel>
          ))}
        </Box>
        <Divider sx={{ color: "#d6d6d6", mt: 3 }} />
      </Box>
      <Box sx={{ textAlign: "right", padding: "16px 18px" }}>
        <Button onClick={handleClose} className="ns_secondary_btn_noborder">
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default RightSide;
