import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Typography,
  TextField,
  Grid,
  InputAdornment,
} from "@mui/material";
import { DataGridPro } from "@mui/x-data-grid-pro";
import SortIcon from "@mui/icons-material/UnfoldMore";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";

const RemoveRecipientsModal = ({ open, onClose }) => {
  // Adding state for pagination
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  const rows = [
    {
      id: 1,
      name: "Crawford, Broderick",
      type: "Member",
      email: "mike@gmail.com",
      category: "Default",
      reason: "Duplicate Email Address",
    },
    {
      id: 2,
      name: "Mike",
      type: "Member",
      email: "mike@gmail.com",
      category: "Default",
      reason: "Duplicate Email Address",
    },
    {
      id: 3,
      name: "Mike",
      type: "Member",
      email: "mike@gmail.com",
      category: "Default",
      reason: "Duplicate Email Address",
    },
    {
      id: 4,
      name: "Appleton, Anne A.",
      type: "Member",
      email: "mike@gmail.com",
      category: "Default",
      reason: "Duplicate Email Address",
    },
    {
      id: 5,
      name: "Hornsby, Bruce",
      type: "Member",
      email: "mike@gmail.com",
      category: "Default",
      reason: "Duplicate Email Address",
    },
    {
      id: 6,
      name: "Michael, Robin A",
      type: "Member",
      email: "mike@gmail.com",
      category: "Default",
      reason: "Duplicate Email Address",
    },
    {
      id: 7,
      name: "Mike",
      type: "Member",
      email: "mike@gmail.com",
      category: "Member Outings",
      reason: "Duplicate Email Address",
    },
    {
      id: 8,
      name: "Hornsby, Bruce",
      type: "Member",
      email: "mike@gmail.com",
      category: "Member Outings",
      reason: "Duplicate Email Address",
    },
    {
      id: 9,
      name: "Mike",
      type: "Member",
      email: "mike@gmail.com",
      category: "Member Outings",
      reason: "Duplicate Email Address",
    },
  ];

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      sortable: true,
      renderHeader: (params) => (
        <Typography variant="body2">{params.colDef.headerName}</Typography>
      ),
      renderCell: (params) => (
        <Typography variant="body1">{params.value}</Typography>
      ),
    },
    {
      field: "type",
      headerName: "Type",
      flex: 1,
      sortable: true,
      renderHeader: (params) => (
        <Typography variant="body2">{params.colDef.headerName}</Typography>
      ),
      renderCell: (params) => (
        <Typography variant="body1">{params.value}</Typography>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      sortable: true,
      renderHeader: (params) => (
        <Typography variant="body2">{params.colDef.headerName}</Typography>
      ),
      renderCell: (params) => (
        <Typography variant="body1">{params.value}</Typography>
      ),
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
      sortable: true,
      renderHeader: (params) => (
        <Typography variant="body2">{params.colDef.headerName}</Typography>
      ),
      renderCell: (params) => (
        <Typography variant="body1">{params.value}</Typography>
      ),
    },
    {
      field: "reason",
      headerName: "Reason",
      flex: 1,
      sortable: true,
      renderHeader: (params) => (
        <Typography variant="body2">{params.colDef.headerName}</Typography>
      ),
      renderCell: (params) => (
        <Typography variant="body1">{params.value}</Typography>
      ),
    },
  ];

  return (
    <div>
      <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth>
        <DialogTitle>
          Removed Recipients{" "}
          <CloseIcon
            onClick={onClose}
            style={{ cursor: "pointer", float: "right" }}
          />
        </DialogTitle>
        <DialogContent>
          <Grid
            container
            rowSpacing={2}
            mb={3}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            alignItems={{ xs: "start", lg: "center", xl: "center" }}
          >
            <Grid
              size={{
                xl: 6,
                lg: 6,
                md: 6,
                sm: 9,
                xs: 12,
              }}
            >
              <Typography variant="p">
                These recipients have been removed from the list because they
                appeared in both lists.
              </Typography>
            </Grid>
            <Grid
              size={{
                xl: 6,
                lg: 6,
                md: 6,
                sm: 3,
                xs: 12,
              }}
              textAlign="right"
            >
              <Button className="ns_secondary_btn">
                <LocalPrintshopOutlinedIcon sx={{ marginRight: "6px" }} /> Print
              </Button>
            </Grid>
          </Grid>
          <DataGridPro
            className="campaign_datagrid"
            rows={rows}
            columns={columns}
            checkboxSelection
            disableColumnFilter
            disableColumnMenu
            autoHeight
            rowHeight={56}
            columnHeaderHeight={40}
            headerFilterHeight={52}
            headerFilters
            showCellVerticalBorder
            showColumnVerticalBorder
            disableColumnResize={true}
            disableRowSelectionOnClick={true}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[5, 10, 25]}
            pagination
            paginationMode="client"
            slots={{
              headerFilterMenu: null,
              columnSortedAscendingIcon: SortIcon,
              columnSortedDescendingIcon: SortIcon,
              columnUnsortedIcon: SortIcon,
            }}
            slotProps={{
              headerFilterCell: {
                InputComponent: TextField,
                InputComponentProps: {
                  variant: "outlined",
                  size: "small",
                  fullWidth: true,
                  InputProps: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  },
                  placeholder: "Search...",
                  label: undefined,
                },
              },
              footer: {
                sx: {
                  borderTop: "1px solid rgba(224, 224, 224, 1)",
                  padding: "10px 0",
                },
              },
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RemoveRecipientsModal;
