import React, { useState } from "react";
import { Box, Typography, Grid, TextField, Tabs, Tab } from "@mui/material";
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

const SmsTab = () => {
  // For SMS Text
  const [smsText, setSmsText] = useState("");
  const [shake, setShake] = useState(false);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSmsTextChange = (event) => {
    const text = event.target.value;

    if (text.length <= 160) {
      setSmsText(text);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <Box className="content_main_body">
      <Box className="responsive_content_view">
        <Box className="content_area sms_tab_area">
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
                  SMS Text <span style={{ color: "red" }}>*</span>
                </Typography>
              </Box>
              <ShakingTextField
                multiline
                placeholder="Enter SMS Text"
                size="small"
                rows={9}
                variant="outlined"
                fullWidth
                shake={shake ? 1 : 0}
                value={smsText}
                onChange={handleSmsTextChange}
              />
              <Box className="hint_area">
                <Typography className="hint_text" variant="body2">
                  Hint: A single message can only be of 160 characters. Use no
                  of merge-fields to auto complete.
                </Typography>
                <span className="count_words">{smsText.length}/160</span>
              </Box>
            </Grid>
            <Grid size={{ xl: 6, lg: 6, md: 6, sm: 6, xs: 12 }}>
              <Box className="count_box">
                <Typography variant="h6">{smsText.length}</Typography>
                <Typography variant="p">Number of Characters</Typography>
              </Box>
            </Grid>
            <Grid size={{ xl: 6, lg: 6, md: 6, sm: 6, xs: 12 }}>
              <Box className="count_box">
                <Typography variant="h6">1</Typography>
                <Typography variant="p">
                  Approximate Number of Messages
                </Typography>
              </Box>
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
              aria-label="sms preview tabs"
            >
              <Tab label="Lock Screen" {...a11yProps(0)} />
              <Tab label="Message Screen" {...a11yProps(1)} />
            </Tabs>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PhoneUI activeTab={value} smsText={smsText} componentType="sms" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SmsTab;
