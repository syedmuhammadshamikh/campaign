import React, { useState, useMemo } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
  Grid,
  TextField,
  InputAdornment,
  ListItemText,
  Button,
  IconButton,
  Select,
  MenuItem,
  Divider,
  Checkbox,
  Pagination,
  Menu,
  FormControlLabel,
} from "@mui/material";
import {
  Search as SearchIcon,
  PrintOutlined as PrintOutlinedIcon,
  CachedOutlined as CachedOutlinedIcon,
  DeleteOutline as DeleteOutlineIcon,
  CreateOutlined as CreateOutlinedIcon,
  UnfoldMore as UnfoldMoreIcon,
  Tune as TuneIcon,
} from "@mui/icons-material";
import { menuItems } from "../data/menuItems";
import Header from "../components/mainHeader";
import CreateCampaign from "./createCampaign";
import useHeaderHeight from "../hooks/useHeaderHeight";

const getChipClass = (label) => {
  switch (label) {
    case "SMS":
      return "sms_chip";
    case "Email":
      return "email_chip";
    case "Notification":
      return "notification_chip";
    case "Feed":
      return "feed_chip";
    default:
      return "";
  }
};

const generateDummyData = (count) => {
  const campaigns = [
    "Golf Course Renovation",
    "Holiday Event Promo",
    "Membership Drive",
    "Community Outreach",
  ];
  const createdBy = ["James", "Anna", "Michael", "Sophie"];
  const types = ["Members", "Guests"];
  const statuses = ["Sent", "Not Sent"];
  const chipsOptions = [
    ["SMS", "Email"],
    ["Notification"],
    ["Feed"],
    ["Email", "Feed", "SMS", "Notification"],
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    campaign: campaigns[i % campaigns.length],
    createdBy: createdBy[i % createdBy.length],
    createdOn: `Tue September ${(i % 30) + 1}, 2024 10:15 am`,
    chips: chipsOptions[i % chipsOptions.length],
    type: types[i % types.length],
    totalRecipients: Math.floor(Math.random() * 1000000) + 1000,
    status: statuses[i % statuses.length],
  }));
};

const ColumnVisibilityMenu = ({
  anchorEl,
  open,
  onClose,
  columns,
  visibleColumns,
  onToggleColumn,
}) => (
  <Menu
    anchorEl={anchorEl}
    open={open}
    onClose={onClose}
    PaperProps={{
      sx: {
        maxHeight: 300,
        width: 250,
        px: 2,
      },
    }}
  >
    <Typography variant="subtitle1" sx={{ mb: 1 }}>
      Show/Hide Columns
    </Typography>
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {columns.map((column) => (
        <FormControlLabel
          key={column.id}
          control={
            <Checkbox
              checked={visibleColumns.includes(column.id)}
              onChange={() => onToggleColumn(column.id)}
            />
          }
          label={column.label}
        />
      ))}
    </Box>
  </Menu>
);

// Components
const CampaignCell = ({ campaign, createdBy, createdOn, chips }) => (
  <Box className="campaign_cell">
    <Typography variant="h6">{campaign}</Typography>
    <Box sx={{ display: "flex", gap: 1, my: 1 }}>
      {chips.map((chip, index) => (
        <Chip
          key={index}
          label={chip}
          size="small"
          className={getChipClass(chip)}
        />
      ))}
    </Box>
    <Typography variant="p">
      Created on {createdOn} by {createdBy}
    </Typography>
  </Box>
);

const SortableTableHeader = ({
  label,
  field,
  sortConfig,
  onSort,
  sortable = true,
}) => {
  const getIcon = () => {
    if (!sortable) return null;
    if (sortConfig.key !== field)
      return <UnfoldMoreIcon sx={{ fontSize: 18 }} />;
    return sortConfig.direction === "asc" ? (
      <UnfoldMoreIcon sx={{ fontSize: 18, transform: "rotate(180deg)" }} />
    ) : (
      <UnfoldMoreIcon sx={{ fontSize: 18 }} />
    );
  };

  return (
    <TableCell>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          userSelect: "none",
        }}
        onClick={() => onSort(field)}
      >
        {label}
        <IconButton size="small" sx={{ ml: 0.5 }}>
          {getIcon()}
        </IconButton>
      </Box>
    </TableCell>
  );
};

const CAMPAIGN_CATEGORIES = [
  { value: "SMS", label: "SMS Campaigns" },
  { value: "Email", label: "Email Campaigns" },
  { value: "Notification", label: "Notification Campaigns" },
  { value: "Feed", label: "Feed Campaigns" },
];

const Filters = ({
  typeFilter,
  setTypeFilter,
  statusFilter,
  setStatusFilter,
  campaignCategories,
  setCampaignCategories,
  campaignTypeFilter,
  setCampaignTypeFilter,
  createdDateFilter,
  setCreatedDateFilter,
  sentDateFilter,
  setSentDateFilter,
}) => {
  // Function to check if any filters are active
  const isAnyFilterActive = () => {
    return (
      typeFilter !== "" ||
      statusFilter !== "" ||
      campaignTypeFilter !== "" ||
      campaignCategories.length > 0 ||
      createdDateFilter !== "" ||
      sentDateFilter !== ""
    );
  };

  // Function to handle reset
  const handleReset = () => {
    setTypeFilter("");
    setStatusFilter("");
    setCampaignTypeFilter("");
    setCampaignCategories([]);
    setCreatedDateFilter("");
    setSentDateFilter("");
  };

  return (
    <Box className="filters_Area">
      <Typography variant="body2">Filters:</Typography>
      <Divider
        orientation="vertical"
        sx={{ height: "24px", color: "#6e6e6e" }}
      />

      <Select
        value={typeFilter}
        onChange={(e) => setTypeFilter(e.target.value)}
        displayEmpty
        size="small"
        sx={{ minWidth: 150 }}
      >
        <MenuItem value="">Changed by</MenuItem>
        <MenuItem value="User1">User 1</MenuItem>
        <MenuItem value="User2">User 2</MenuItem>
      </Select>

      <Select
        value={campaignTypeFilter}
        onChange={(e) => setCampaignTypeFilter(e.target.value)}
        displayEmpty
        size="small"
      >
        <MenuItem value="">Campaign Types</MenuItem>
        <MenuItem value="Members">Members</MenuItem>
        <MenuItem value="Guests">Guests</MenuItem>
      </Select>

      <Select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        displayEmpty
        size="small"
      >
        <MenuItem value="">Status</MenuItem>
        <MenuItem value="Sent">Sent</MenuItem>
        <MenuItem value="Not Sent">Not Sent</MenuItem>
      </Select>

      <Select
        multiple
        value={campaignCategories}
        onChange={(e) => setCampaignCategories(e.target.value)}
        className={campaignCategories.length > 0 ? "active-filter" : ""}
        renderValue={(selected) => (
          <span>
            Campaign Categories
            {selected.length > 0 && (
              <span className="category-count"> {selected.length}</span>
            )}
          </span>
        )}
        displayEmpty
        size="small"
      >
        {CAMPAIGN_CATEGORIES.map((category) => (
          <MenuItem key={category.value} value={category.value}>
            <Checkbox
              checked={campaignCategories.indexOf(category.value) > -1}
            />
            <ListItemText primary={category.label} />
          </MenuItem>
        ))}
      </Select>

      <Select
        value={createdDateFilter}
        onChange={(e) => setCreatedDateFilter(e.target.value)}
        displayEmpty
        size="small"
      >
        <MenuItem value="">Created Date</MenuItem>
        <MenuItem value="Last 7 Days">Last 7 Days</MenuItem>
        <MenuItem value="Last 30 Days">Last 30 Days</MenuItem>
      </Select>

      <Select
        value={sentDateFilter}
        onChange={(e) => setSentDateFilter(e.target.value)}
        displayEmpty
        size="small"
      >
        <MenuItem value="">Sent Date</MenuItem>
        <MenuItem value="Today">Today</MenuItem>
        <MenuItem value="Yesterday">Yesterday</MenuItem>
        <MenuItem value="Last 7 Days">Last 7 Days</MenuItem>
      </Select>

      {isAnyFilterActive() && (
        <>
          <Divider
            orientation="vertical"
            sx={{ height: "24px", color: "#6e6e6e" }}
          />
          <Typography
            className="resetText"
            variant="body2"
            onClick={handleReset}
          >
            Reset
          </Typography>
        </>
      )}
    </Box>
  );
};

const PaginationControls = ({
  totalItems,
  pageSize,
  setPageSize,
  currentPage,
  setCurrentPage,
  totalPages,
  startIndex,
  endIndex,
}) => (
  <Box className="pagination_bottom_table">
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Typography variant="p">
        Showing <strong>{startIndex + 1}</strong> to <strong>{endIndex}</strong>{" "}
        of <strong>{totalItems}</strong> rows
      </Typography>

      <Box>
        <Box
          className="ns_field_style"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <Select
            size="small"
            value={pageSize}
            onChange={(e) => {
              setPageSize(e.target.value);
              setCurrentPage(1);
            }}
          >
            {[4, 10, 25, 50, 100].map((size) => (
              <MenuItem key={size} value={size}>
                {size}
              </MenuItem>
            ))}
          </Select>
          <Typography variant="p">Rows per page</Typography>
        </Box>
      </Box>
    </Box>

    <Box className="right_Area_pagination">
      <Pagination
        variant="outlined"
        shape="rounded"
        count={totalPages}
        page={currentPage}
        onChange={(event, value) => setCurrentPage(value)}
      />

      <Box
        className="ns_field_style"
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
      >
        <Typography variant="p">Go to page:</Typography>
        <TextField
          size="small"
          type="number"
          value={currentPage === null ? "" : currentPage}
          onChange={(e) => {
            const value = e.target.value;
            if (value === "") {
              setCurrentPage(null);
            } else {
              let numValue = Number(value);
              if (numValue > totalPages) numValue = totalPages;
              if (numValue < 1) numValue = 1;
              setCurrentPage(numValue);
            }
          }}
          onBlur={() => {
            if (currentPage === null) setCurrentPage(1);
          }}
          sx={{ width: 73 }}
          inputProps={{ min: 1, max: totalPages }}
        />
      </Box>
    </Box>
  </Box>
);

const ListCampaigns = () => {
  const [typeFilter, setTypeFilter] = useState("");
  const [campaignTypeFilter, setCampaignTypeFilter] = useState("");
  const [campaignCategories, setCampaignCategories] = useState([]);
  const [createdDateFilter, setCreatedDateFilter] = useState("");
  const [sentDateFilter, setSentDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "",
  });
  const [selected, setSelected] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const headerRef = useHeaderHeight();

  const [columnMenuAnchor, setColumnMenuAnchor] = useState(null);
  const [columns] = useState([
    { id: "campaign", label: "Campaign", sortable: true },
    { id: "type", label: "Type", sortable: true },
    {
      id: "totalRecipients",
      label: "Total Recipients",
      sortable: true,
      flex: 1,
    },
    { id: "status", label: "Status", sortable: false },
    { id: "actions", label: "Actions", sortable: false },
  ]);
  const [visibleColumns, setVisibleColumns] = useState(
    columns.map((col) => col.id)
  );

  const handleColumnMenuOpen = (event) => {
    setColumnMenuAnchor(event.currentTarget);
  };

  const handleColumnMenuClose = () => {
    setColumnMenuAnchor(null);
  };

  const [rows] = useState(generateDummyData(1000));

  const filteredRows = useMemo(() => {
    return rows.filter(
      (row) =>
        row.campaign.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (statusFilter ? row.status === statusFilter : true) &&
        (campaignTypeFilter ? row.type === campaignTypeFilter : true) &&
        (campaignCategories.length > 0
          ? campaignCategories.some((category) => row.chips.includes(category))
          : true)
    );
  }, [rows, searchTerm, statusFilter, campaignTypeFilter, campaignCategories]);

  const sortedRows = useMemo(() => {
    if (!sortConfig.key) return filteredRows;

    const column = columns.find((col) => col.id === sortConfig.key);

    if (!column?.sortable) return filteredRows;

    return [...filteredRows].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key])
        return sortConfig.direction === "asc" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key])
        return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredRows, sortConfig, columns]);

  const totalItems = sortedRows.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);
  const currentRows = sortedRows.slice(startIndex, endIndex);

  const handleToggleColumn = (columnId) => {
    setVisibleColumns((prev) => {
      if (prev.includes(columnId)) {
        if (prev.length === 1) return prev;
        return prev.filter((id) => id !== columnId);
      }
      return [...prev, columnId];
    });
  };

  const handleSort = (columnKey) => {
    const column = columns.find((col) => col.id === columnKey);

    if (!column || !column.sortable) {
      return;
    }

    setSortConfig((prev) => {
      if (prev.key !== columnKey) {
        return { key: columnKey, direction: "asc" };
      }
      if (prev.direction === "asc") {
        return { key: columnKey, direction: "desc" };
      }
      return { key: "", direction: "" };
    });
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = currentRows.map((row) => row.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const [showCreateCampaign, setShowCreateCampaign] = useState(false);

  const handleCreate = () => {
    setShowCreateCampaign(true);
  };
  return (
    <>
      {!showCreateCampaign ? (
        <Box>
          <Header
            headerRef={headerRef}
            title="List Of Campaigns"
            buttons={{
              create: {
                enable: true,
                label: "Create Campaign",
                onClick: handleCreate,
                className: "ns_primary_btn",
              },
            }}
          />
          <Box className="list_campaign_wrapper">
            <Grid
              container
              spacing={2}
              sx={{ mb: 3 }}
              className="ns_field_style"
            >
              <Grid item xs={12} sm={6} md={6} xl={3} lg={4}>
                <TextField
                  className="search_campaigns"
                  fullWidth
                  size="small"
                  placeholder="Search Campaigns"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                xl={9}
                sm={6}
                lg={8}
                md={6}
                sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}
                className="rightButtons"
              >
                <Button variant="outlined">
                  <CachedOutlinedIcon />
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleColumnMenuOpen}
                  startIcon={<TuneIcon />}
                >
                  Table Columns
                </Button>
                <Button variant="outlined" startIcon={<PrintOutlinedIcon />}>
                  Print
                </Button>
              </Grid>
            </Grid>

            <ColumnVisibilityMenu
              anchorEl={columnMenuAnchor}
              open={Boolean(columnMenuAnchor)}
              onClose={handleColumnMenuClose}
              columns={columns}
              visibleColumns={visibleColumns}
              onToggleColumn={handleToggleColumn}
            />

            <Grid container className="ns_field_style">
              <Grid item xs={12} md={12} lg={12} xl={12}>
                <Filters
                  typeFilter={typeFilter}
                  setTypeFilter={setTypeFilter}
                  statusFilter={statusFilter}
                  setStatusFilter={setStatusFilter}
                  campaignCategories={campaignCategories}
                  setCampaignCategories={setCampaignCategories}
                  campaignTypeFilter={campaignTypeFilter}
                  setCampaignTypeFilter={setCampaignTypeFilter}
                  createdDateFilter={createdDateFilter}
                  setCreatedDateFilter={setCreatedDateFilter}
                  sentDateFilter={sentDateFilter}
                  setSentDateFilter={setSentDateFilter}
                />
              </Grid>
            </Grid>

            <TableContainer className="ns_table_style" component={Paper}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        indeterminate={
                          selected.length > 0 &&
                          selected.length < currentRows.length
                        }
                        checked={
                          currentRows.length > 0 &&
                          selected.length === currentRows.length
                        }
                        onChange={handleSelectAllClick}
                      />
                    </TableCell>
                    {columns.map(
                      (column) =>
                        visibleColumns.includes(column.id) && (
                          <SortableTableHeader
                            key={column.id}
                            label={column.label}
                            field={column.id}
                            sortConfig={sortConfig}
                            onSort={handleSort}
                            sortable={column.sortable}
                          />
                        )
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentRows.map((row) => {
                    const isItemSelected = isSelected(row.id);
                    return (
                      <TableRow
                        key={row.id}
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            onChange={(event) => handleClick(event, row.id)}
                          />
                        </TableCell>
                        {visibleColumns.includes("campaign") && (
                          <TableCell>
                            <CampaignCell
                              campaign={row.campaign}
                              createdBy={row.createdBy}
                              createdOn={row.createdOn}
                              chips={row.chips}
                            />
                          </TableCell>
                        )}
                        {visibleColumns.includes("type") && (
                          <TableCell>
                            <Typography variant="p">{row.type}</Typography>
                          </TableCell>
                        )}
                        {visibleColumns.includes("totalRecipients") && (
                          <TableCell>
                            <Typography variant="p">
                              {row.totalRecipients.toLocaleString()}
                            </Typography>
                          </TableCell>
                        )}
                        {visibleColumns.includes("status") && (
                          <TableCell>
                            <Typography
                              variant="p"
                              className={
                                row.status === "Sent"
                                  ? "sent_status"
                                  : row.status === "Not Sent"
                                  ? "unsent_status"
                                  : ""
                              }
                            >
                              {" "}
                              {row.status}
                            </Typography>
                          </TableCell>
                        )}
                        {visibleColumns.includes("actions") && (
                          <TableCell>
                            <Box
                              className="actionsArea"
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              <Button
                                color="primary"
                                sx={{ textTransform: "none" }}
                              >
                                View Analytics
                              </Button>
                              <Divider
                                orientation="vertical"
                                flexItem
                                sx={{ height: "12px", margin: "auto 0" }}
                              />
                              <IconButton size="small">
                                <CreateOutlinedIcon />
                              </IconButton>

                              <Divider
                                orientation="vertical"
                                flexItem
                                sx={{ height: "12px", margin: "auto 0" }}
                              />
                              <IconButton size="small">
                                <DeleteOutlineIcon />
                              </IconButton>
                            </Box>
                          </TableCell>
                        )}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>

            <PaginationControls
              totalItems={totalItems}
              pageSize={pageSize}
              setPageSize={setPageSize}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
              startIndex={startIndex}
              endIndex={endIndex}
            />
          </Box>
        </Box>
      ) : (
        <CreateCampaign />
      )}
    </>
  );
};

export default ListCampaigns;
