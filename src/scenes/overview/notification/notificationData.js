import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Divider,
  Autocomplete,
} from "@mui/material";

import { notificationTypeOption, eventNumbers } from "../../../data/menuItems";
import DropdownSelect from "../../../components/dropDownselect";
import CampaignSwitch from "../../../components/campaignSwitch";

const NotificationData = ({ showRightSide }) => {
  const [selectedEvent, setSelectedEvent] = useState();

  const [notification, setNotification] = useState(10);
  const handleNotificationType = (event) => {
    setNotification(event.target.value);
  };
  return (
    <Box className="notification_Accordian_wrapper">
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
            <DropdownSelect
              label="Notification Type"
              value={
                notification &&
                notificationTypeOption.some(
                  (option) => option.value === notification
                )
                  ? notification
                  : ""
              }
              onChange={handleNotificationType}
              options={notificationTypeOption}
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
            {notification === 20 ? (
              <>
                <Typography variant="body1" component="label" gutterBottom>
                  Event Number <span style={{ color: "red" }}>*</span>
                </Typography>
                <Autocomplete
                  size="small"
                  id="event-number-autocomplete"
                  freeSolo
                  options={eventNumbers.map((num) => num.toString())} // Convert numbers to strings
                  onChange={(event, newValue) => setSelectedEvent(newValue)}
                  renderInput={(params) => (
                    <TextField {...params} type="number" />
                  )}
                />
              </>
            ) : (
              <>
                <Typography variant="body1" component="label" gutterBottom>
                  Title <span style={{ color: "red" }}>*</span>
                </Typography>
                <TextField fullWidth size="small" />
              </>
            )}
          </Grid>

          {notification !== 20 && (
            <>
              <Grid
                size={{
                  xs: 12,
                  lg: 6,
                  xl: showRightSide ? 6 : 4,
                }}
                className="ns_field_style"
              >
                <Typography variant="body1" component="label" gutterBottom>
                  Description{" "}
                  <span style={{ color: "#6E6E6E" }}>(optional)</span>
                </Typography>
                <TextField
                  multiline
                  size="small"
                  rows={3}
                  variant="outlined"
                  fullWidth
                />
              </Grid>

              <Grid size={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}>
                <Divider sx={{ color: "divider" }} />
              </Grid>
              <Grid size={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}>
                <Box
                  component="label"
                  display="flex"
                  alignItems="center"
                  width="fit-content"
                  gap={1}
                  sx={{ cursor: "pointer" }}
                >
                  <CampaignSwitch />
                  <Typography variant="p">Open links in new tab</Typography>
                </Box>
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default NotificationData;
