import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Autocomplete,
} from "@mui/material";
import {
  postTypeOptions,
  feedFromOptions,
  allowedSitesOptions,
  actionTypes,
  durationOptions,
  durationOptionsPin,
  menuItems3,
  eventNumbers,
} from "../../../data/menuItems";
import DropdownSelect from "../../../components/dropDownselect";
import CampaignSwitch from "../../../components/campaignSwitch";
import { styled } from "@mui/system";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AddIcon from "@mui/icons-material/Add";

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

const FeedData = ({ showRightSide }) => {
  const [selectedEvent, setSelectedEvent] = useState();

  const [postType, setPostType] = useState("");
  const handlePostType = (event) => {
    setPostType(event.target.value);
  };
  const [openPostModal, setOpenPostModal] = useState(false);
  const handleOpenPostModal = () => setOpenPostModal(true);
  const handleClosePostModal = () => setOpenPostModal(false);

  const [allowedSites, setAllowedSites] = useState("");
  const handleAllowedSites = (event) => {
    setAllowedSites(event.target.value);
  };

  const [feedFrom, setFeedFrom] = useState("");
  const handleFeedFrom = (event) => {
    setFeedFrom(event.target.value);
  };

  const [enableLinkToEvent, setEnableLinkToEvent] = useState(false);
  const [enableActionButton, setEnableActionButton] = useState(false);
  const [enablePushNotification, setEnablePushNotification] = useState(false);
  const [enableActive, setEnableActive] = useState(false);
  const [enablePinToTop, setEnablePinToTop] = useState(false);

  const [actionType, setActionType] = useState(10);
  const handleActionChange = (event) => {
    setActionType(event.target.value);
  };

  const [menuItem, setMenuItem] = useState();
  const handleMenuItem = (event) => {
    setMenuItem(event.target.value);
  };

  // For Description
  const [description, setDescription] = useState("");
  const [shake, setShake] = useState(false);

  const handleDescriptionChange = (event) => {
    const text = event.target.value;

    if (text.length <= 30) {
      setDescription(text);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };
  // For Description

  const [durationType, setDurationType] = useState(10);
  const handleDurationChange = (event) => {
    setDurationType(event.target.value);
  };

  const [durationTypePin, setDurationTypePin] = useState(10);
  const handleDurationChangePin = (event) => {
    setDurationTypePin(event.target.value);
  };
  return (
    <Box className="feed_Accordian_wrapper">
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
              Title <span style={{ color: "red" }}>*</span>
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
            <Box sx={{ display: "flex", alignItems: "end", gap: 1 }}>
              <DropdownSelect
                label="Post Type"
                value={
                  postType &&
                  postTypeOptions.some((option) => option.value === postType)
                    ? postType
                    : ""
                }
                onChange={handlePostType}
                options={postTypeOptions}
              />
              <Button
                sx={{ height: "40px", maxWidth: "40px", minWidth: "40px" }}
                className="ns_primary_btn"
                onClick={handleOpenPostModal} // Open modal on click
              >
                <AddIcon />
              </Button>
            </Box>
          </Grid>
          <Grid
            size={{
              xs: 12,
              lg: 6,
              xl: showRightSide ? 6 : 4,
            }}
            className="ns_field_style"
          >
            <DropdownSelect
              label="Allowed Sites"
              value={
                allowedSites &&
                allowedSitesOptions.some(
                  (option) => option.value === allowedSites
                )
                  ? allowedSites
                  : ""
              }
              onChange={handleAllowedSites}
              options={allowedSitesOptions}
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
            <DropdownSelect
              label="From"
              value={
                feedFrom &&
                feedFromOptions.some((option) => option.value === feedFrom)
                  ? feedFrom
                  : ""
              }
              onChange={handleFeedFrom}
              options={feedFromOptions}
            />
          </Grid>
        </Grid>
        <Divider sx={{ color: "divider", my: 3 }} />
        <Box className={enableLinkToEvent ? "check_padding bg_white" : ""}>
          <Box
            component="label"
            display="flex"
            alignItems="center"
            width="fit-content"
            gap={1}
            sx={{ cursor: "pointer" }}
          >
            <CampaignSwitch
              checked={enableLinkToEvent}
              onChange={(e) => setEnableLinkToEvent(e.target.checked)}
            />
            <Typography variant="p">Link To Event</Typography>
          </Box>
          {enableLinkToEvent && (
            <Grid
              container
              rowSpacing={2}
              columnSpacing={{ xs: 1, sm: 2, md: 5 }}
              mt={2}
            >
              <Grid
                size={{
                  xs: 12,
                  lg: 6,
                  xl: showRightSide ? 6 : 4,
                }}
                className="ns_field_style"
              >
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
              </Grid>
            </Grid>
          )}
        </Box>
        <Box
          mt={3}
          className={enableActionButton ? "check_padding bg_white" : ""}
        >
          <Box
            component="label"
            display="flex"
            alignItems="center"
            width="fit-content"
            gap={1}
            sx={{ cursor: "pointer" }}
          >
            <CampaignSwitch
              checked={enableActionButton}
              onChange={(e) => setEnableActionButton(e.target.checked)}
            />
            <Typography variant="p">Enable Action Button</Typography>
          </Box>
          {enableActionButton && (
            <Grid
              container
              rowSpacing={2}
              columnSpacing={{ xs: 1, sm: 2, md: 5 }}
              mt={2}
            >
              <Grid
                size={{
                  xs: 12,
                  lg: 6,
                  xl: showRightSide ? 6 : 4,
                }}
                className="ns_field_style"
              >
                <DropdownSelect
                  label="Action Type"
                  value={actionType}
                  onChange={handleActionChange}
                  options={actionTypes}
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
                  Title <span style={{ color: "red" }}>*</span>
                </Typography>
                <TextField fullWidth size="small" />
              </Grid>
              {actionType === 10 && (
                <Grid
                  size={{
                    xs: 12,
                    lg: 6,
                    xl: showRightSide ? 6 : 4,
                  }}
                  className="ns_field_style"
                >
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
                </Grid>
              )}

              {actionType === 20 && (
                <Grid
                  size={{
                    xs: 12,
                    lg: 6,
                    xl: showRightSide ? 6 : 4,
                  }}
                  className="ns_field_style"
                >
                  <DropdownSelect
                    label="Menu Item"
                    value={menuItem}
                    onChange={handleMenuItem}
                    options={menuItems3}
                  />
                </Grid>
              )}

              {actionType === 30 && (
                <Grid
                  size={{
                    xs: 12,
                    lg: 6,
                    xl: showRightSide ? 6 : 4,
                  }}
                  className="ns_field_style"
                >
                  <Typography variant="body1" component="label" gutterBottom>
                    URL <span style={{ color: "red" }}>*</span>
                  </Typography>
                  <TextField fullWidth size="small" />
                </Grid>
              )}
              <Grid
                size={{
                  xs: 12,
                  lg: 6,
                  xl: showRightSide ? 12 : 8,
                }}
                className="ns_field_style"
              >
                <Typography variant="body1" component="label" gutterBottom>
                  Description{" "}
                  <span style={{ color: "#6E6E6E" }}>(optional)</span>
                </Typography>
                <ShakingTextField
                  multiline
                  placeholder="Write Here..."
                  size="small"
                  rows={2}
                  variant="outlined"
                  fullWidth
                  value={description}
                  onChange={handleDescriptionChange}
                  shake={shake ? 1 : 0}
                />
                <Box className="hint_area">
                  <Typography className="hint_text" variant="body2">
                    Hint: Maximum 30 characters allowed.
                  </Typography>
                  <span className="count_words">{description.length}/30</span>
                </Box>
              </Grid>
            </Grid>
          )}
        </Box>
      </Box>
      <Typography variant="h3">Publishing Properties</Typography>
      <Box
        mt={3}
        className={enablePushNotification ? "check_padding bg_gray" : ""}
      >
        <Box
          component="label"
          display="flex"
          alignItems="center"
          width="fit-content"
          gap={1}
          sx={{ cursor: "pointer" }}
        >
          <CampaignSwitch
            checked={enablePushNotification}
            onChange={(e) => setEnablePushNotification(e.target.checked)}
          />
          <Typography variant="p">Generate Push Notifications</Typography>
        </Box>
      </Box>
      <Box mt={2} className={enableActive ? "check_padding bg_gray" : ""}>
        <Box
          component="label"
          display="flex"
          alignItems="center"
          width="fit-content"
          gap={1}
          sx={{ cursor: "pointer" }}
        >
          <CampaignSwitch
            checked={enableActive}
            onChange={(e) => setEnableActive(e.target.checked)}
          />
          <Typography variant="p">Active</Typography>
        </Box>
        {enableActive && (
          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ xs: 1, sm: 2, md: 5 }}
            mt={2}
          >
            <Grid
              size={{
                xs: 12,
                lg: 6,
                xl: showRightSide ? 6 : 4,
              }}
              className="ns_field_style"
            >
              <DropdownSelect
                label="Duration"
                value={durationType}
                onChange={handleDurationChange}
                options={durationOptions}
              />
            </Grid>
            {durationType === 20 && (
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
                    Expiry Date <span style={{ color: "red" }}>*</span>
                  </Typography>
                  <LocalizationProvider
                    className="time_field"
                    dateAdapter={AdapterDayjs}
                  >
                    <DatePicker className="time_field" />
                  </LocalizationProvider>
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
                    Expiry Time <span style={{ color: "red" }}>*</span>
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker className="time_field" />
                  </LocalizationProvider>
                </Grid>
              </>
            )}
          </Grid>
        )}
      </Box>
      <Box mt={2} className={enablePinToTop ? "check_padding bg_gray" : ""}>
        <Box
          component="label"
          display="flex"
          alignItems="center"
          width="fit-content"
          gap={1}
          sx={{ cursor: "pointer" }}
        >
          <CampaignSwitch
            checked={enablePinToTop}
            onChange={(e) => setEnablePinToTop(e.target.checked)}
          />
          <Typography variant="p">Pin to Top</Typography>
        </Box>
        {enablePinToTop && (
          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ xs: 1, sm: 2, md: 5 }}
            mt={2}
          >
            <Grid
              size={{
                xs: 12,
                lg: 6,
                xl: showRightSide ? 6 : 4,
              }}
              className="ns_field_style"
            >
              <DropdownSelect
                label="Duration"
                value={durationTypePin}
                onChange={handleDurationChangePin}
                options={durationOptionsPin}
              />
            </Grid>
            {durationTypePin === 20 && (
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
                    Unpin Date <span style={{ color: "red" }}>*</span>
                  </Typography>
                  <LocalizationProvider
                    className="time_field"
                    dateAdapter={AdapterDayjs}
                  >
                    <DatePicker className="time_field" />
                  </LocalizationProvider>
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
                    Unpin Time <span style={{ color: "red" }}>*</span>
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker className="time_field" />
                  </LocalizationProvider>
                </Grid>
              </>
            )}
          </Grid>
        )}
        <Dialog
          open={openPostModal}
          onClose={handleClosePostModal}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Add New Post</DialogTitle>
          <DialogContent>
            <Grid
              container
              rowSpacing={2}
              columnSpacing={{ xs: 1, sm: 2, md: 5 }}
            >
              <Grid
                size={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}
                className="ns_field_style"
              >
                <Typography variant="body1" component="label" gutterBottom>
                  Post Type
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <TextField
                    placeholder="Enter Post Name"
                    fullWidth
                    size="small"
                  />
                  <Button className="ns_primary_btn">Add</Button>
                </Box>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              className="ns_secondary_btn_noborder"
              onClick={handleClosePostModal}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default FeedData;
