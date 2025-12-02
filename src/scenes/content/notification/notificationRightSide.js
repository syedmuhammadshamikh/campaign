import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Divider,
  Button,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  TextField,
  InputAdornment,
} from "@mui/material";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
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
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const NotificationRightSide = ({
  setShowNotificationRightSide,
  selectedMergeField,
  setSelectedMergeField,
}) => {
  const [isClosing, setIsClosing] = useState(false);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowNotificationRightSide(false);
    }, 300);
  };

  const handleChipClick = (chip) => {
    setSelectedMergeField((prev) =>
      prev.includes(chip)
        ? prev.filter((item) => item !== chip)
        : [...prev, chip]
    );
  };

  const tabsData = [
    {
      title: "Member",
      accordions: [
        {
          title: "Personal Information",
          chips: ["Name", "Age", "Gender", "Email", "Phone"],
        },
        {
          title: "Membership Details",
          chips: ["ID", "Join Date", "Status", "Tier", "Points"],
        },
        {
          title: "Preferences",
          chips: [
            "Language",
            "Newsletter",
            "Notifications",
            "Privacy",
            "Theme",
          ],
        },
        {
          title: "Address",
          chips: ["Street", "City", "State", "Country", "ZIP"],
        },
        {
          title: "Emergency Contact",
          chips: ["Contact Name", "Relationship", "Phone", "Email", "Address"],
        },
      ],
    },
    {
      title: "Company",
      accordions: [
        {
          title: "Company Information",
          chips: ["Company Name", "Industry", "Size", "Revenue", "Founded"],
        },
        {
          title: "Contact Details",
          chips: ["Phone", "Email", "Website", "Fax", "HQ Address"],
        },
        {
          title: "Employees",
          chips: ["CEO", "HR Head", "Manager", "Developers", "Sales"],
        },
        {
          title: "Financials",
          chips: ["Profit", "Loss", "Revenue", "Expenses", "Investments"],
        },
        {
          title: "Clients",
          chips: [
            "Top Client",
            "Contracts",
            "Retention",
            "Leads",
            "Satisfaction",
          ],
        },
      ],
    },
    {
      title: "System",
      accordions: [
        {
          title: "User Roles",
          chips: ["Admin", "Editor", "Viewer", "Moderator", "Guest"],
        },
        {
          title: "Permissions",
          chips: ["Read", "Write", "Execute", "Delete", "Share"],
        },
        {
          title: "Configurations",
          chips: ["Theme", "Date Format", "Time Zone", "Language", "Currency"],
        },
        {
          title: "Integrations",
          chips: ["Google", "Facebook", "Slack", "Zapier", "Stripe"],
        },
        {
          title: "Security",
          chips: ["2FA", "Encryption", "Firewall", "Anti-Virus", "Backup"],
        },
      ],
    },
  ];

  const generateAccordions = (accordions) => {
    return accordions.map(({ title, chips }, index) => (
      <Accordion
        elevation={0}
        PaperProps={{ elevation: 0 }}
        key={index}
        sx={{
          margin: "20px 0",
          paddingBottom: "15px",
          borderRadius: "0px !important",
          borderBottom: 1,
          borderColor: "divider",
          "&:last-of-type": {
            borderBottom: "none",
          },
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography component="label">{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box className="rightSide_tabs_data">
            <Box className="subject_chips">
              {chips.map((chip, idx) => (
                <Box
                  key={idx}
                  className={`subject_custom_chip ${
                    selectedMergeField.includes(chip) ? "selected" : ""
                  }`}
                  onClick={() => handleChipClick(chip)}
                >
                  <Typography variant="p">{chip}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    ));
  };

  return (
    <Box className="right_section">
      <Box className="right_top">
        <Typography variant="h3">Add Merge Fields</Typography>
        <CloseIcon onClick={handleClose} style={{ cursor: "pointer" }} />
      </Box>
      <Box className="rightSide_tabs rightSidemerge_field">
        <Box className="ns_field_style " sx={{ mb: 3 }}>
          <TextField
            className="search_field"
            fullWidth
            placeholder="Search merge field"
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          {tabsData.map((tab, index) => (
            <Tab key={index} label={tab.title} {...a11yProps(index)} />
          ))}
        </Tabs>
        <Box className="add_merge_fieldBody_scroll">
          {tabsData.map((tab, index) => (
            <CustomTabPanel key={index} value={value} index={index}>
              <Box mt={3} className="ns_accordion_style">
                {generateAccordions(tab.accordions)}
              </Box>
            </CustomTabPanel>
          ))}
        </Box>
      </Box>
      <Box sx={{ textAlign: "right", padding: "16px 18px" }}>
        <Divider sx={{ color: "#d6d6d6", mb: 3 }} />
        <Button onClick={handleClose} className="ns_secondary_btn_noborder">
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default NotificationRightSide;
