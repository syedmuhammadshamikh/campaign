import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Tab,
  Tabs,
} from "@mui/material";
import PropTypes from "prop-types";
import { styled } from "@mui/system";
import PhoneUI from "../../../components/PhoneUI";

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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

const ShakingTextField = styled(TextField)(({ shake }) => ({
  transition: "transform 0.1s ease-in-out",
  ...(shake && {
    animation: "shake 0.3s ease-in-out",
  }),
  "@keyframes shake": {
    "0%, 100%": { transform: "translateX(0)" },
    "25%": { transform: "translateX(-4px)" },
    "50%": { transform: "translateX(4px)" },
    "75%": { transform: "translateX(-4px)" },
  },
}));

const NotificationTab = ({ onClick, selectedMergeField }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // For Description
  const [description, setDescription] = useState("");
  const [shake, setShake] = useState(false);

  // Combined text logic
  const combinedText = () => {
    const mergeFieldText =
      selectedMergeField.length > 0 ? ` ${selectedMergeField.join(", ")}` : "";
    return `${description}${mergeFieldText}`.trim();
  };
  const handleDescriptionChange = (event) => {
    const text = event.target.value;

    if (text.length > 200) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    setDescription(text);
  };

  // For Additional Details
  const [additionalDetails, setAdditionalDetails] = useState("");

  const handleAdditionalDetailsChange = (event) => {
    setAdditionalDetails(event.target.value);
  };

  return (
    <Box className="content_main_body">
      <Box className="responsive_content_view">
        <Box className="content_area">
          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ xs: 1, sm: 2, md: 5 }}
          >
            <Grid
              size={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}
              className="ns_field_style"
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 3,
                }}
              >
                <Typography variant="h6" className="campaign_subheading">
                  Notification Text <span style={{ color: "red" }}>*</span>
                </Typography>
                <Button onClick={onClick} className="ns_secondary_btn">
                  Add Merge Fields
                </Button>
              </Box>

              <ShakingTextField
                multiline
                placeholder="Enter Description"
                size="small"
                rows={9}
                variant="outlined"
                fullWidth
                value={description} // Only bind description to the input
                onChange={handleDescriptionChange}
                shake={shake ? 1 : 0}
              />

              <Box className="hint_area">
                <Typography className="hint_text" variant="body2">
                  Hint: Maximum 200 characters allowed.
                </Typography>
                <span className="count_words">{description.length}/200</span>
              </Box>
            </Grid>
            <Grid
              size={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}
              className="ns_field_style"
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 3,
                }}
              >
                <Typography variant="h6" className="campaign_subheading">
                  Additional Details
                </Typography>
                <Button className="ns_secondary_btn">Add Merge Fields</Button>
              </Box>
              <TextField
                multiline
                placeholder="Enter Details"
                size="small"
                rows={9}
                variant="outlined"
                fullWidth
                value={additionalDetails}
                onChange={handleAdditionalDetailsChange}
              />
            </Grid>
          </Grid>
        </Box>
        <Box className="content_preview">
          <Box mb={3}>
            <Typography variant="h6" className="campaign_subheading">
              Preview
            </Typography>
          </Box>

          <Box
            className="ns_campaign_tabs"
            sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Lock Screen" {...a11yProps(0)} />
              <Tab label="Additional Details" {...a11yProps(1)} />
            </Tabs>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PhoneUI
              notificationText={combinedText()}
              additionalDetails={additionalDetails}
              activeTab={value}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default NotificationTab;
