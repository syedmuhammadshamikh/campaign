import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Tooltip,
} from "@mui/material";
import { DataGridPro } from "@mui/x-data-grid-pro";
import SortIcon from "@mui/icons-material/UnfoldMore";
import SearchIcon from "@mui/icons-material/Search";
import {
  selectrecipients,
  iconemail,
  iconnotification,
  iconfeed,
  iconsms,
} from "../../../components/media";
import RemoveRecipientsModal from "../RemoveRecipientsModal";
import { maxWidth, minWidth } from "@mui/system";

const AllRecipientTab = ({ bothCategoriesSelected }) => {
  // Initial data for the grid
  const initialRows = [
    {
      id: 1,
      name: "John",
      email: "john@gmail.com",
      type: "Member",
      dateSent: "03/01/2024",
      addedBy: "James Tom",
      campaignTypes: ["email", "notification", "feed", "sms"],
    },
    {
      id: 2,
      name: "Mike",
      email: "mike@gmail.com",
      type: "Member",
      dateSent: "28/05/2024",
      addedBy: "Thomas Dean",
      campaignTypes: ["email", "sms"],
    },
    {
      id: 3,
      name: "Emily",
      type: "Guest",
      dateSent: "12/03/2024",
      addedBy: "Rachel Green",
      campaignTypes: ["notification"],
    },
    {
      id: 4,
      name: "Daniel",
      type: "Admin",
      dateSent: "05/06/2024",
      addedBy: "Monica Geller",
      campaignTypes: ["feed", "email"],
    },
    {
      id: 5,
      name: "Sophia",
      type: "Member",
      dateSent: "20/02/2024",
      addedBy: "Chandler Bing",
      campaignTypes: ["sms"],
    },
  ];

  // State for rows and selected rows
  const [rows, setRows] = useState(initialRows);
  const [selectedRows, setSelectedRows] = useState([]);

  const [openRemoveRecipients, setOpenRemoveRecipients] = useState(false);

  const handleCloseRemoveRecipients = () => setOpenRemoveRecipients(true);
  const handleCloseAddressDetails = () => setOpenRemoveRecipients(false);

  const campaignIcons = {
    email: iconemail,
    notification: iconnotification,
    feed: iconfeed,
    sms: iconsms,
  };

  // Handler for row selection changes
  const handleSelectionModelChange = (newSelectionModel) => {
    setSelectedRows(newSelectionModel);
  };

  // Handler for "Remove Selected" button
  const handleRemoveSelected = () => {
    if (selectedRows.length === 0) return;

    // Filter out selected rows
    const updatedRows = rows.filter((row) => !selectedRows.includes(row.id));
    setRows(updatedRows);
    setSelectedRows([]);
  };

  // Handler for "Remove All" button
  const handleRemoveAll = () => {
    setRows([]);
    setSelectedRows([]);
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    minWidth: 200,
      sortable: true,

      renderHeader: (params) => (
        <Typography variant="body2">{params.colDef.headerName}</Typography>
      ),
      renderCell: (params) => (
        <Typography variant="body1">{params.value}</Typography>
      ),
    },
    {
      field: "campaignTypes",
      headerName: "Campaign Types",
      flex: 1,
    minWidth: 200,
      sortable: true,
      renderHeader: (params) => (
        <Typography variant="body2">{params.colDef.headerName}</Typography>
      ),
      renderCell: (params) => (
        <Box className="campaign_types_icons" display="flex" gap={1}>
          {params.row.campaignTypes?.map((type) => (
            <Tooltip key={type} title={type} arrow placement="top">
              <img src={campaignIcons[type]} alt={type} />
            </Tooltip>
          ))}
        </Box>
      ),
    },
    {
      field: "type",
      headerName: "Type",
      flex: 1,
    minWidth: 200,
      sortable: true,

      renderHeader: (params) => (
        <Typography variant="body2">{params.colDef.headerName}</Typography>
      ),
      renderCell: (params) => (
        <Typography variant="body1">{params.value}</Typography>
      ),
    },
    {
      field: "dateSent",
      headerName: "Date Sent",
      flex: 1,
    minWidth: 200,
      sortable: true,

      renderHeader: (params) => (
        <Typography variant="body2">{params.colDef.headerName}</Typography>
      ),
      renderCell: (params) => (
        <Typography variant="body1">{params.value}</Typography>
      ),
    },
    {
      field: "addedBy",
      headerName: "Added By",
      flex: 1,
    minWidth: 200,
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
    <>
      {!bothCategoriesSelected ? (
        <Box className="select_recipients_box">
          <img src={selectrecipients} alt="Select Recipients" />
          <Typography variant="p">Select Recipients</Typography>
        </Box>
      ) : (
        <Box className="all_recipients_tab">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="end"
            gap={2}
            mb={3}
          >
            <Button
              className="ns_secondary_btn"
              onClick={handleCloseRemoveRecipients}
            >
              Remove Recipients
            </Button>
            <Button
              className="ns_secondary_btn"
              onClick={handleRemoveSelected}
              disabled={selectedRows.length === 0}
            >
              Remove Selected
            </Button>
            <Button
              className="ns_secondary_btn"
              onClick={handleRemoveAll}
              disabled={rows.length === 0}
            >
              Remove All
            </Button>
          </Box>
          <Box sx={{ height: 250, width: "100%" }}>
            <DataGridPro
              className="campaign_datagrid"
              rows={rows}
              columns={columns}
              hideFooter={true}
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
              onRowSelectionModelChange={handleSelectionModelChange}
              rowSelectionModel={selectedRows}
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
              }}
            />
          </Box>
          <RemoveRecipientsModal
            open={openRemoveRecipients}
            onClose={handleCloseAddressDetails}
          />
        </Box>
      )}
    </>
  );
};

export default AllRecipientTab;
