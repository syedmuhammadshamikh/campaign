import React, { useState, useMemo } from "react";
import { Box, Typography, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import {
  campaignType,
  recipent,
  permissionOptionData,
  launchTypes,
} from "../../data/menuItems";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DropdownSelect from "../../components/dropDownselect";
import CampaignAccordion from "../../scenes/overview/campaignAccordion";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { RecurringEmailModal, RemoveCampaignModal } from "./modalsOverview";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const Overview = ({
  selectedCampaigns,
  onCampaignTypeUpdate,
  onClick,
  showRightSide,
  selectedChips,
}) => {
  const [campaignName, setCampaignName] = useState("");
  const [campaignNameError, setCampaignNameError] = useState(false);
  const [helperText, setHelperText] = useState("");

  // Modal states
  const [removeCampaignModalOpen, setRemoveCampaignModalOpen] = useState(false);
  const [campaignToRemove, setCampaignToRemove] = useState(null);
  const [recurringModalOpen, setRecurringModalOpen] = useState(false);

  const selectedCampaignTypes = useMemo(() => {
    const campaignMap = {
      1: "Email",
      2: "Notification",
      3: "Feed",
      4: "SMS",
    };

    return Object.entries(selectedCampaigns)
      .filter(([id, isSelected]) => isSelected)
      .map(([id]) => ({ title: campaignMap[id] }));
  }, [selectedCampaigns]);

  const handleCampaignTypeChange = (event, newValue, reason, details) => {
    if (reason === "removeOption") {
      setCampaignToRemove(details.option);
      setRemoveCampaignModalOpen(true);
      return;
    }

    if (onCampaignTypeUpdate) {
      onCampaignTypeUpdate(newValue);
    }
  };

  const handleConfirmRemoval = () => {
    const newValue = selectedCampaignTypes.filter(
      (campaign) => campaign.title !== campaignToRemove.title
    );

    if (onCampaignTypeUpdate) {
      onCampaignTypeUpdate(newValue);
    }

    setRemoveCampaignModalOpen(false);
    setCampaignToRemove(null);
  };

  const handleCancelRemoval = () => {
    setRemoveCampaignModalOpen(false);
    setCampaignToRemove(null);
  };

  const [recipientOptions, setRecipient] = useState(10);
  const handleChange = (event) => {
    setRecipient(event.target.value);
  };

  const [permission, setPermission] = useState(30);
  const handlePermissionChange = (event) => {
    setPermission(event.target.value);
  };

  const [launchType, setLaunchType] = useState("finalize");
  const handleLaunchChange = (event) => {
    const selectedValue = event.target.value;
    setLaunchType(selectedValue);

    if (selectedValue === "recurring") {
      setRecurringModalOpen(true);
    }
  };

  const handleCloseRecurringModal = () => {
    setRecurringModalOpen(false);
    setLaunchType("finalize");
  };

  // Handle proceed button in recurring campaign modal
  const handleProceedRecurring = () => {
    // Find the Email campaign type from the available options
    const emailCampaignType = campaignType.find(
      (type) => type.title === "Email"
    );

    // If Email campaign exists, only keep that one
    if (emailCampaignType) {
      const newCampaignTypes = [emailCampaignType];

      // Convert to the format that onCampaignTypeUpdate expects
      if (onCampaignTypeUpdate) {
        onCampaignTypeUpdate(newCampaignTypes);
      }
    }

    // Close the modal
    setRecurringModalOpen(false);
  };

  // Handle on Submit Button
  const handleSubmit = (e) => {
    e.preventDefault();
    if (campaignName.trim() === "") {
      setCampaignNameError(true);
      setHelperText("Please enter Campaign Name");
    } else {
      setCampaignNameError(false);
      setHelperText("");
      console.log("Form Submitted", { campaignName });
      setCampaignName("");
    }
  };

  // Handle Key Press (Check if Tab is pressed)
  const handleKeyDown = (e) => {
    if (e.key === "Tab" && campaignName.trim() === "") {
      e.preventDefault();
      if (campaignName.trim() === "") {
        setCampaignNameError(true);
        setHelperText("Please enter Campaign Name");
      } else {
        setCampaignNameError(false);
        setHelperText("");
        console.log("Form Submitted", { campaignName });
        setCampaignName("");
      }
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* <Typography variant="h4" component="h1" gutterBottom>
        <strong>Overview</strong>
      </Typography> */}
      <Box className="ns_formbox_wrapper">
        <form onSubmit={handleSubmit}>
          <Box className="ns_formbox">
            <Grid
              container
              rowSpacing={2}
              columnSpacing={{ xs: 1, sm: 2, md: 5 }}
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
                  Campaign Name <span style={{ color: "red" }}>*</span>
                </Typography>
                <TextField
                  error={campaignNameError}
                  id="outlined-error"
                  fullWidth
                  size="small"
                  value={campaignName}
                  onChange={(e) => {
                    setCampaignName(e.target.value);
                    if (e.target.value.trim() !== "") {
                      setCampaignNameError(false);
                      setHelperText("");
                    }
                  }}
                  helperText={helperText}
                  onKeyDown={handleKeyDown}
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
                  Campaign Type <span style={{ color: "red" }}>*</span>
                </Typography>
                <Autocomplete
                  multiple
                  id="checkboxes-campaign-type"
                  size="small"
                  options={campaignType ?? []}
                  disableCloseOnSelect
                  value={selectedCampaignTypes}
                  onChange={handleCampaignTypeChange}
                  getOptionLabel={(option) => option?.title ?? ""}
                  isOptionEqualToValue={(option, value) =>
                    option?.title === value?.title
                  }
                  renderOption={(props, option, { selected }) => (
                    <li {...props} key={option?.title ?? Math.random()}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option?.title ?? "Unknown"}
                    </li>
                  )}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>

              <Grid
                item
                size={{
                  xs: 12,
                  lg: 6,
                  xl: showRightSide ? 6 : 4,
                }}
                className="ns_field_style"
              >
                <DropdownSelect
                  label="Permission (for non-creators)"
                  value={
                    permission &&
                    permissionOptionData.some(
                      (option) => option.value === permission
                    )
                      ? permission
                      : ""
                  }
                  onChange={handlePermissionChange}
                  options={permissionOptionData}
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

              <Grid
                size={{
                  xs: 12,
                  lg: 6,
                  xl: showRightSide ? 6 : 4,
                }}
                className="ns_field_style"
              >
                <DropdownSelect
                  label="Recipient Type"
                  value={
                    recipientOptions &&
                    recipent.some((option) => option.value === recipientOptions)
                      ? recipientOptions
                      : ""
                  }
                  onChange={handleChange}
                  options={recipent}
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
                  label="Launch Type"
                  value={launchType}
                  onChange={handleLaunchChange}
                  options={launchTypes}
                />
              </Grid>

              {launchType === "datetime" && (
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
                      Launch Date <span style={{ color: "red" }}>*</span>
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
                      Launch Time <span style={{ color: "red" }}>*</span>
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker className="time_field" />
                    </LocalizationProvider>
                  </Grid>
                </>
              )}
              {/* <Grid size={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Grid> */}
            </Grid>
          </Box>
          <Box>
            <CampaignAccordion
              selectedCampaigns={selectedCampaigns}
              showRightSide={showRightSide}
              onClick={onClick}
              launchType={launchType}
              selectedChips={selectedChips}
            />
          </Box>
        </form>
      </Box>

      <RecurringEmailModal
        open={recurringModalOpen}
        onClose={handleCloseRecurringModal}
        onProceed={handleProceedRecurring}
      />

      <RemoveCampaignModal
        open={removeCampaignModalOpen}
        onClose={handleCancelRemoval}
        onConfirm={handleConfirmRemoval}
        campaignTitle={campaignToRemove?.title}
      />
    </Box>
  );
};

export default Overview;
