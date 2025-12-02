import React, { useState, useEffect } from "react";
import {
  Box,
  Tabs,
  Tab,
  Grid,
  Typography,
  TextField,
  InputAdornment,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControlLabel,
  FormGroup,
  Checkbox,
  Button,
} from "@mui/material";
import PropTypes from "prop-types";
import AllRecipientTab from "./all/allRecipientTab";
import EmailRecipientTab from "./email/emailRecipientTab";
import FeedRecipientTab from "./feed/feedRecipientTab";
import NotificationRecipientTab from "./notification/notificationRecipientTab";
import SmsRecipientTab from "./sms/smsRecipientTab";
import {
  Search as SearchIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import { searchandadd } from "../../components/media";
import SearchAndAddDialog from "./searchAndAddDialog";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import AddressDetailsModal from "./AddressDetailsModal";

// Standard TabPanel component with padding
const CustomTabPanel = ({ children, value, index, ...other }) => (
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

// TabPanel component without padding for Add Recipients tabs
const AddRecipientTabPanel = ({ children, value, index, ...other }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`add-recipient-tabpanel-${index}`}
    aria-labelledby={`add-recipient-tab-${index}`}
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

AddRecipientTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

// Helper functions for accessibility props
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function addRecipientA11yProps(index) {
  return {
    id: `add-recipient-tab-${index}`,
    "aria-controls": `add-recipient-tabpanel-${index}`,
  };
}

// Reusable category accordion component with checkbox handling
const CategoryAccordion = ({
  title,
  options,
  selectedOptions,
  onOptionChange,
}) => (
  <Accordion defaultExpanded>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      <Typography component="label">{title}</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Box sx={{ padding: "0px 16px" }}>
        <FormGroup>
          {options.map((option) => (
            <FormControlLabel
              key={option}
              className={selectedOptions.includes(option) ? "selected" : ""}
              control={
                <Checkbox
                  checked={selectedOptions.includes(option)}
                  onChange={(e) => onOptionChange(option, e.target.checked)}
                />
              }
              label={option}
            />
          ))}
        </FormGroup>
      </Box>
    </AccordionDetails>
  </Accordion>
);

CategoryAccordion.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  onOptionChange: PropTypes.func.isRequired,
};

// Address item component
const AddressItem = ({ label }) => {
  const [openAddressDetails, setOpenAddressDetails] = useState(false);

  const handleOpenAddressDetails = () => setOpenAddressDetails(true);
  const handleCloseAddressDetails = () => setOpenAddressDetails(false);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <FormControlLabel
          value="end"
          control={<Checkbox />}
          label={label}
          labelPlacement="end"
        />
        <Typography
          variant="h6"
          onClick={handleOpenAddressDetails}
          sx={{ cursor: "pointer" }}
        >
          Details <KeyboardArrowRightIcon />
        </Typography>
      </Box>
      <AddressDetailsModal
        open={openAddressDetails}
        onClose={handleCloseAddressDetails}
        address={label}
      />
    </>
  );
};

const addressItems = [
  "Email to All Active Members",
  "Slippery Rock Test",
  "North Star Test",
  "Email to All Active Members",
];

// Search field component
const SearchMemberField = () => (
  <TextField
    fullWidth
    size="small"
    placeholder="Search Member"
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <SearchIcon />
        </InputAdornment>
      ),
    }}
  />
);

const CreateRecipients = ({
  selectedCampaigns = {},
  expanded,
  setExpanded,
}) => {
  const [campaignTabValue, setCampaignTabValue] = useState(0);
  const [addRecipientValue, setAddRecipientValue] = useState(0);
  const [visibleTabs, setVisibleTabs] = useState([]);
  const [open, setOpen] = React.useState(false);

  const handleSearchandAdd = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // State for tracking selected options
  const [selectedStaticOptions, setSelectedStaticOptions] = useState([]);
  const [selectedDynamicOptions, setSelectedDynamicOptions] = useState([]);

  // Category options
  const staticOptions = ["Default", "Stats", "Statistic", "Men's Golf"];
  const dynamicOptions = [
    "Default",
    "Permanent Members",
    "Classic",
    "Premium Guests",
  ];

  // Handle option selection for static category
  const handleStaticOptionChange = (option, isChecked) => {
    if (isChecked) {
      setSelectedStaticOptions([...selectedStaticOptions, option]);
    } else {
      setSelectedStaticOptions(
        selectedStaticOptions.filter((item) => item !== option)
      );
    }
  };

  // Handle option selection for dynamic category
  const handleDynamicOptionChange = (option, isChecked) => {
    if (isChecked) {
      setSelectedDynamicOptions([...selectedDynamicOptions, option]);
    } else {
      setSelectedDynamicOptions(
        selectedDynamicOptions.filter((item) => item !== option)
      );
    }
  };

  // Check if options are selected from both categories
  const hasSelectedBothCategories =
    selectedStaticOptions.length > 0 && selectedDynamicOptions.length > 0;

  useEffect(() => {
    // Determine visible tabs based on selected campaigns
    const showAllTabs =
      !selectedCampaigns ||
      Object.values(selectedCampaigns).every((value) => !value);

    // Get current campaign tabs with updated components
    const currentCampaignTabs = {
      0: {
        label: "All",
        component: (
          <AllRecipientTab bothCategoriesSelected={hasSelectedBothCategories} />
        ),
      },
      1: {
        label: "Email",
        component: (
          <EmailRecipientTab
            bothCategoriesSelected={hasSelectedBothCategories}
          />
        ),
      },
      2: {
        label: "Notification",
        component: (
          <NotificationRecipientTab
            bothCategoriesSelected={hasSelectedBothCategories}
          />
        ),
      },
      3: {
        label: "Feed",
        component: (
          <FeedRecipientTab
            bothCategoriesSelected={hasSelectedBothCategories}
          />
        ),
      },
      4: {
        label: "SMS",
        component: (
          <SmsRecipientTab bothCategoriesSelected={hasSelectedBothCategories} />
        ),
      },
    };

    // Filter the tabs based on the selected campaigns, always including the "All" tab
    const filteredTabs = showAllTabs
      ? Object.entries(currentCampaignTabs)
      : Object.entries(currentCampaignTabs).filter(([tabId]) => {
          // Always include the "All" tab (id 0)
          return tabId === "0" || selectedCampaigns[tabId];
        });

    setVisibleTabs(filteredTabs);
  }, [selectedCampaigns, selectedStaticOptions, selectedDynamicOptions]);

  // Add recipient tab configurations
  const addRecipientTabConfigs = [
    {
      label: "Categories",
      content: (
        <Box className="categories_tab">
          <Grid container spacing={3}>
            <Grid size={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}>
              <CategoryAccordion
                title="Static"
                options={staticOptions}
                selectedOptions={selectedStaticOptions}
                onOptionChange={handleStaticOptionChange}
              />
            </Grid>
            <Grid size={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}>
              <CategoryAccordion
                title="Dynamic"
                options={dynamicOptions}
                selectedOptions={selectedDynamicOptions}
                onOptionChange={handleDynamicOptionChange}
              />
            </Grid>
          </Grid>
        </Box>
      ),
    },
    {
      label: "Search & Add",
      content: (
        <Box className="search_add_tab">
          <img src={searchandadd} alt="Search and Add" />
          <Typography variant="p">
            Search recipients and add them to the campaign
          </Typography>
          <Button className="ns_primary_btn" onClick={handleSearchandAdd}>
            Search & Add
          </Button>
        </Box>
      ),
    },
    {
      label: "Address Book",
      content: (
        <Box className="address_box">
          {addressItems.map((label, index) => (
            <AddressItem key={index} label={label} />
          ))}
        </Box>
      ),
    },
  ];

  const handleCampaignCategoryTab = (event, newValue) => {
    setCampaignTabValue(newValue);
  };

  const handleAddRecipientChange = (event, newValue) => {
    setAddRecipientValue(newValue);
  };

  return (
    <Box className="create_recipients_wrapper" sx={{ flexGrow: 1 }}>
      <Box className="create_recipients_body">
        {/* Left side - Recipient selection options */}
        <Box className="create_recipients_leftside">
          <Grid container spacing={3} className="ns_field_style">
            {/* Recipient Type */}
            <Grid size={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}>
              <Typography variant="body1" component="label" gutterBottom>
                Recipient Type <span style={{ color: "red" }}>*</span>
              </Typography>
              <TextField disabled value="Member" fullWidth size="small" />
            </Grid>

            {/* Add Recipients Tabs */}
            <Grid size={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}>
              <Typography variant="body1" component="label" gutterBottom>
                Add Recipients <span style={{ color: "red" }}>*</span>
              </Typography>
              <Box
                mb={3}
                className={`ns_campaign_tabs ns_font_light_tabs${
                  !expanded ? " left_Panel_collapsed" : ""
                }`}
              >
                <Tabs
                  variant="scrollable"
                  scrollButtons="auto"
                  value={addRecipientValue}
                  onChange={handleAddRecipientChange}
                >
                  {addRecipientTabConfigs.map((config, index) => (
                    <Tab
                      key={config.label}
                      label={config.label}
                      {...addRecipientA11yProps(index)}
                    />
                  ))}
                </Tabs>
              </Box>

              <Box mb={3}>
                <SearchMemberField />
              </Box>
              {/* Add Recipient Tab Panels - using the non-padded panel */}
              {addRecipientTabConfigs.map((config, index) => (
                <AddRecipientTabPanel
                  key={config.label}
                  value={addRecipientValue}
                  index={index}
                >
                  {config.content}
                </AddRecipientTabPanel>
              ))}
            </Grid>
          </Grid>
        </Box>

        {/* Right side - Campaign tabs */}
        <Box className="create_recipients_rightside">
          <Box
            className="ns_campaign_tabs"
            sx={{ borderBottom: 1, borderColor: "divider" }}
          >
            <Tabs
              value={campaignTabValue}
              onChange={handleCampaignCategoryTab}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="recipient tabs"
            >
              {visibleTabs.map(([tabId, tab], index) => (
                <Tab key={tabId} label={tab.label} {...a11yProps(index)} />
              ))}
            </Tabs>
          </Box>

          {/* Campaign Tab Panels - using the standard padded panel */}
          {visibleTabs.map(([tabId, tab], index) => (
            <CustomTabPanel key={tabId} value={campaignTabValue} index={index}>
              {tab.component}
            </CustomTabPanel>
          ))}
        </Box>
      </Box>
      <SearchAndAddDialog open={open} onClose={handleClose} />
    </Box>
  );
};

export default CreateRecipients;
