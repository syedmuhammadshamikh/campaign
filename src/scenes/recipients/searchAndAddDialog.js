import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Grid,
  Tab,
  Tabs,
  Divider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  TextField,
} from "@mui/material";
import {
  memberTypeOptions,
  selfBilled,
  memberGuest,
  memberCharge,
  memberStatus,
  dependantType,
  memberGuestGroup,
  subSections,
  ownerOptions,
  qualifiersOptions,
  searchFilterOption,
} from "../../data/menuItems.js";
import PropTypes from "prop-types";
import DropdownSelect from "../../components/dropDownselect";
import CloseIcon from "@mui/icons-material/Close";

const CustomTabPanel = ({ children, value, index, ...other }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    {...other}
  >
    {value === index && <Box mt={3}>{children}</Box>}
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

const SearchAndAddDialog = ({ open, onClose }) => {
  const [searchFilter, setSearchFilter] = useState();
  const [memberType, setMemberType] = useState();
  const [selfBilledValue, setSelfBilledValue] = useState();
  const [memberGuestValue, setMemberGuestValue] = useState();
  const [memberChargeValue, setMemberChargeValue] = useState();
  const [memberStatusValue, setMemberStatusValue] = useState();
  const [dependentTypeValue, setDependentTypeValue] = useState();
  const [memberGuestGroupValue, setMemberGuestGroupValue] = useState();
  const [subSectionsValue, setSubSectionsValue] = useState();
  const [ownerValue, setOwnerValue] = useState();
  const [qualifierValue, setQualifierValue] = useState();

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => setValue(newValue);

  return (
    <Dialog
      className="dialog_wrapper search_dialog"
      open={open}
      onClose={onClose}
      fullScreen
    >
      <DialogTitle className="heading_blue">
        Search and Add <CloseIcon onClick={onClose} />
      </DialogTitle>
      <DialogContent sx={{ flexGrow: 1 }}>
        <Box>
          <Grid
            mb={2}
            container
            rowSpacing={{ xs: 2, sm: 2, md: 3 }}
            columnSpacing={{ xs: 1, sm: 2, md: 5 }}
          >
            <Grid
              size={{
                xl: 3,
                lg: 3,
                md: 4,
                sm: 6,
                xs: 12,
              }}
              className="ns_field_style"
            >
              {" "}
              <Typography variant="h6" className="campaign_subheading18">
                Search Member
              </Typography>
            </Grid>
            <Grid
              textAlign="right"
              size={{
                xl: 9,
                lg: 9,
                md: 8,
                sm: 6,
                xs: 12,
              }}
              className="ns_field_style"
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  justifyContent: "end",
                }}
              >
                <Button className="ns_secondary_btn_noborder">Cancel</Button>
                <Button className="ns_secondary_btn">Save Settings</Button>
                <Button className="ns_primary_btn"> Search</Button>
              </Box>
            </Grid>
            <Grid
              size={{
                xl: 3,
                lg: 3,
                md: 4,
                sm: 6,
                xs: 12,
              }}
              className="ns_field_style"
            >
              {" "}
              <DropdownSelect
                label=""
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                options={searchFilterOption}
              />
            </Grid>
            <Grid
              size={{
                xl: 9,
                lg: 9,
                md: 8,
                sm: 6,
                xs: 12,
              }}
              className="ns_field_style"
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  justifyContent: "end",
                }}
              >
                <Button className="ns_secondary_btn">
                  Create Search Filter
                </Button>
                <Button className="ns_secondary_btn">Advance Search</Button>
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={value} onChange={handleChange}>
              <Tab label="Member" {...a11yProps(0)} />
              <Tab label="Member by dependant demographics" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <Box className="body_bg">
              <Grid
                container
                rowSpacing={{ xs: 2, sm: 2, md: 5 }}
                columnSpacing={{ xs: 1, sm: 2, md: 5 }}
              >
                <Grid
                  size={{
                    xl: 3,
                    lg: 3,
                    md: 4,
                    sm: 6,
                    xs: 12,
                  }}
                  className="ns_field_style"
                >
                  <DropdownSelect
                    label="Member Type"
                    value={memberType}
                    onChange={(e) => setMemberType(e.target.value)}
                    options={memberTypeOptions}
                  />
                </Grid>
                <Grid
                  size={{
                    xl: 3,
                    lg: 3,
                    md: 4,
                    sm: 6,
                    xs: 12,
                  }}
                  className="ns_field_style"
                >
                  <DropdownSelect
                    label="Self Billed"
                    value={selfBilledValue}
                    onChange={(e) => setSelfBilledValue(e.target.value)}
                    options={selfBilled}
                  />
                </Grid>
                <Grid
                  size={{
                    xl: 3,
                    lg: 3,
                    md: 4,
                    sm: 6,
                    xs: 12,
                  }}
                  className="ns_field_style"
                >
                  <DropdownSelect
                    label="Member/Guest"
                    value={memberGuestValue}
                    onChange={(e) => setMemberGuestValue(e.target.value)}
                    options={memberGuest}
                  />
                </Grid>
                <Grid
                  size={{
                    xl: 3,
                    lg: 3,
                    md: 4,
                    sm: 6,
                    xs: 12,
                  }}
                  className="ns_field_style"
                >
                  <DropdownSelect
                    label="Member Charge"
                    value={memberChargeValue}
                    onChange={(e) => setMemberChargeValue(e.target.value)}
                    options={memberCharge}
                  />
                </Grid>
                <Grid
                  size={{
                    xl: 3,
                    lg: 3,
                    md: 4,
                    sm: 6,
                    xs: 12,
                  }}
                  className="ns_field_style"
                >
                  <DropdownSelect
                    label="Member Status"
                    value={memberStatusValue}
                    onChange={(e) => setMemberStatusValue(e.target.value)}
                    options={memberStatus}
                  />
                </Grid>
                <Grid
                  size={{
                    xl: 3,
                    lg: 3,
                    md: 4,
                    sm: 6,
                    xs: 12,
                  }}
                  className="ns_field_style"
                >
                  <DropdownSelect
                    label="Dependant Type"
                    value={dependentTypeValue}
                    onChange={(e) => setDependentTypeValue(e.target.value)}
                    options={dependantType}
                  />
                </Grid>
                <Grid
                  size={{
                    xl: 3,
                    lg: 3,
                    md: 4,
                    sm: 6,
                    xs: 12,
                  }}
                  className="ns_field_style"
                >
                  <DropdownSelect
                    label="Member/Guest Group"
                    value={memberGuestGroupValue}
                    onChange={(e) => setMemberGuestGroupValue(e.target.value)}
                    options={memberGuestGroup}
                  />
                </Grid>
                <Grid
                  size={{
                    xl: 3,
                    lg: 3,
                    md: 4,
                    sm: 6,
                    xs: 12,
                  }}
                  className="ns_field_style"
                >
                  <DropdownSelect
                    label="Sub Sections"
                    value={subSectionsValue}
                    onChange={(e) => setSubSectionsValue(e.target.value)}
                    options={subSections}
                  />
                </Grid>
                <Grid
                  size={{
                    xl: 3,
                    lg: 3,
                    md: 4,
                    sm: 6,
                    xs: 12,
                  }}
                  className="ns_field_style"
                >
                  <DropdownSelect
                    label="Owner"
                    value={ownerValue}
                    onChange={(e) => setOwnerValue(e.target.value)}
                    options={ownerOptions}
                  />
                </Grid>
              </Grid>
              <Divider sx={{ margin: "32px 0px" }} />
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Primary with dependants"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Search linked accounts"
                />
              </FormGroup>
            </Box>
            <Box sx={{ margin: "32px 0" }}>
              <Typography variant="h6" className="campaign_subheading18">
                Basic Information
              </Typography>
            </Box>
            <Box className="body_bg">
              <Grid
                container
                rowSpacing={{ xs: 2, sm: 2, md: 5 }}
                columnSpacing={{ xs: 1, sm: 2, md: 5 }}
              >
                <Grid
                  size={{
                    xl: 3,
                    lg: 3,
                    md: 4,
                    sm: 6,
                    xs: 12,
                  }}
                  className="ns_field_style"
                >
                  <DropdownSelect
                    label="Search Qualifier"
                    value={qualifierValue}
                    onChange={(e) => setQualifierValue(e.target.value)}
                    options={qualifiersOptions}
                    required={false}
                  />
                </Grid>
                <Grid
                  size={{
                    xl: 3,
                    lg: 3,
                    md: 4,
                    sm: 6,
                    xs: 12,
                  }}
                  className="ns_field_style"
                >
                  <Typography variant="body1" component="label" gutterBottom>
                    Member Number
                  </Typography>
                  <TextField fullWidth size="small" />
                </Grid>
                <Grid
                  size={{
                    xl: 3,
                    lg: 3,
                    md: 4,
                    sm: 6,
                    xs: 12,
                  }}
                  className="ns_field_style"
                >
                  <Typography variant="body1" component="label" gutterBottom>
                    First Name <span style={{ color: "red" }}>*</span>
                  </Typography>
                  <TextField fullWidth size="small" />
                </Grid>
                <Grid
                  size={{
                    xl: 3,
                    lg: 3,
                    md: 4,
                    sm: 6,
                    xs: 12,
                  }}
                  className="ns_field_style"
                >
                  <Typography variant="body1" component="label" gutterBottom>
                    Last Name
                  </Typography>
                  <TextField fullWidth size="small" />
                </Grid>
                <Grid
                  size={{
                    xl: 3,
                    lg: 3,
                    md: 4,
                    sm: 6,
                    xs: 12,
                  }}
                  className="ns_field_style"
                >
                  <Typography variant="body1" component="label" gutterBottom>
                    Nick Name
                  </Typography>
                  <TextField fullWidth size="small" />
                </Grid>
                <Grid
                  size={{
                    xl: 3,
                    lg: 3,
                    md: 4,
                    sm: 6,
                    xs: 12,
                  }}
                  className="ns_field_style"
                >
                  <Typography variant="body1" component="label" gutterBottom>
                    Card Number
                  </Typography>
                  <TextField fullWidth size="small" />
                </Grid>
                <Grid
                  size={{
                    xl: 3,
                    lg: 3,
                    md: 4,
                    sm: 6,
                    xs: 12,
                  }}
                  className="ns_field_style"
                >
                  <Typography variant="body1" component="label" gutterBottom>
                    Spouse Last Name
                  </Typography>
                  <TextField fullWidth size="small" />
                </Grid>
                <Grid
                  size={{
                    xl: 3,
                    lg: 3,
                    md: 4,
                    sm: 6,
                    xs: 12,
                  }}
                  className="ns_field_style"
                >
                  <Typography variant="body1" component="label" gutterBottom>
                    Middle Name
                  </Typography>
                  <TextField fullWidth size="small" />
                </Grid>
              </Grid>
            </Box>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}></CustomTabPanel>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} className="ns_secondary_btn_noborder">
          Cancel
        </Button>
        <Button className="ns_primary_btn" onClick={onClose}>
          Add to Campaign
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SearchAndAddDialog;
