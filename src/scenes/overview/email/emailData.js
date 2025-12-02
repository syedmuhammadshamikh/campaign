import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Grid,
  InputAdornment,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { emailicon } from "../../../components/media";

const EmailData = ({ showRightSide, onClick, launchType, selectedChips }) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <Box className="email_Accordian_wrapper">
      <Box className="body_bg">
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 5 }}>
          <Grid
            size={{
              xs: 12,
              lg: 6,
              xl: showRightSide ? 6 : 4,
            }}
            className="ns_field_style"
          >
            <Typography variant="body1" component="label" gutterBottom>
              Subject <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              multiline
              className="for_subjects"
              value={selectedChips.join(", ")}
              placeholder="Select subjects"
              fullWidth
              size="small"
              InputProps={{ readOnly: true }}
            />
            <Typography
              variant="p"
              onClick={onClick}
              sx={{
                cursor: "pointer",
                color: "#0E53A8 !important",
                fontWeight: "normal !important",
                mt: "8px !important",
              }}
            >
              Select Subject tags from our guide
            </Typography>
          </Grid>
          <Grid
            size={{
              xs: 12,
              lg: 6,
              xl: showRightSide ? 6 : 4,
            }}
            className="ns_field_style"
          >
            <Typography variant="body1" component="label" gutterBottom>
              Sender Email <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="Enter your email"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <img src={emailicon} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid
            size={{
              xs: 12,
              lg: 6,
              xl: showRightSide ? 6 : 4,
            }}
            className="ns_field_style"
          >
            <Typography variant="body1" component="label" gutterBottom>
              Sender Name <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField fullWidth size="small" />
          </Grid>
          <Grid
            size={{
              xs: 12,
              lg: 6,
              xl: showRightSide ? 6 : 4,
            }}
            className="ns_field_style"
          >
            <Typography variant="body1" component="label" gutterBottom>
              Sender Replies To <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField fullWidth size="small" />
          </Grid>
        </Grid>
      </Box>

      {launchType === "recurring" && (
        <Box mt={3} className="ns_accordion_style">
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
            sx={{
              marginBottom: "20px",
              boxShadow: "none",
              border: "0px",
              borderRadius: "12px",
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography component="label" sx={{ display: "block" }}>
                Recurring Campaign Criteria
              </Typography>
            </AccordionSummary>
            <AccordionDetails>Recurring Emails</AccordionDetails>
          </Accordion>
        </Box>
      )}
    </Box>
  );
};

export default EmailData;
