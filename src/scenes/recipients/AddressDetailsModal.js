import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
  Grid,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const AddressDetailsModal = ({ open, onClose, address }) => {
  return (
    <div>
      <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
        <DialogTitle>Address Book Details</DialogTitle>
        <DialogContent>
          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid
              size={{
                xs: 12,
                lg: 12,
                xl: 12,
              }}
              className="ns_field_style"
            >
              <Typography variant="body1" component="label" gutterBottom>
                Campaign Name
              </Typography>
              <TextField disabled value={address} fullWidth size="small" />
            </Grid>
            <Grid
              size={{
                xs: 12,
                lg: 12,
                xl: 12,
              }}
              className="ns_field_style"
            >
              <Typography variant="body1" component="label" gutterBottom>
                Owner
              </Typography>
              <TextField value="Brian Hall" disabled fullWidth size="small" />
            </Grid>
            <Grid
              size={{
                xs: 12,
                lg: 12,
                xl: 12,
              }}
              className="ns_field_style"
            >
              <Typography variant="body1" component="label" gutterBottom>
                Type
              </Typography>
              <TextField value="Member" disabled fullWidth size="small" />
            </Grid>{" "}
            <Grid
              size={{
                xs: 12,
                lg: 12,
                xl: 12,
              }}
              className="ns_field_style"
            >
              <Typography variant="body1" component="label" gutterBottom>
                Status
              </Typography>
              <TextField value="Active" disabled fullWidth size="small" />
            </Grid>{" "}
            <Grid
              size={{
                xs: 12,
                lg: 12,
                xl: 12,
              }}
              className="ns_field_style"
            >
              <Typography variant="body1" component="label" gutterBottom>
                Count
              </Typography>
              <TextField value="20" disabled fullWidth size="small" />
            </Grid>{" "}
            <Grid
              size={{
                xs: 12,
                lg: 12,
                xl: 12,
              }}
              className="ns_field_style"
            >
              <Typography variant="body1" component="label" gutterBottom>
                Permission
              </Typography>
              <TextField value="Editable" disabled fullWidth size="small" />
            </Grid>{" "}
            <Grid
              size={{
                xs: 12,
                lg: 12,
                xl: 12,
              }}
              className="ns_field_style"
            >
              <Typography variant="body1" component="label" gutterBottom>
                Created
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  disabled
                  slotProps={{
                    textField: {
                      size: "small",
                      fullWidth: true,
                      sx: {
                        "& .MuiInputAdornment-root": {
                          backgroundColor: "transparent !important",
                          borderLeft: "none !important",
                          padding: "0px 14px 0px 0px !important",
                        },
                      },
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button className="ns_secondary_btn_noborder" onClick={onClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddressDetailsModal;
