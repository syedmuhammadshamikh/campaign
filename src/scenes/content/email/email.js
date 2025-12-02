import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Slider,
  Tabs,
  Tab,
  Grid,
  TextField,
  InputAdornment,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import PropTypes from "prop-types";
import {
  Search as SearchIcon,
  AddCircleOutline as AddCircleOutlineIcon,
  Checklist as ChecklistIcon,
} from "@mui/icons-material";
import {
  emailtemplate1,
  emailtemplate2,
  emailtemplate3,
  emailtemplate4,
  emailtemplate5,
  emailtemplate6,
  emailtemplate7,
} from "../../../components/media";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const EmailTab = ({ expanded, setExpanded }) => {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.only("md"));
  const isSmScreen = useMediaQuery(theme.breakpoints.only("sm"));
  const isXsScreen = useMediaQuery(theme.breakpoints.only("xs"));
  const [showTabs, setShowTabs] = useState(true);
  const [columns, setColumns] = useState(4);
  const [transitioning, setTransitioning] = useState(false);
  const [previousColumns, setPreviousColumns] = useState(4);
  const [itemPositions, setItemPositions] = useState({});
  const [itemRefs, setItemRefs] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  // Initialize state based on screen size
  useEffect(() => {
    if (isSmScreen || isMdScreen || isXsScreen) {
      setColumns(3);
      setShowTabs(false);
    } else {
      setColumns(4);
      setShowTabs(true);
    }
  }, [isMdScreen]);

  useEffect(() => {
    if (transitioning) {
      // Force a new render cycle
      setTimeout(() => {
        applyFlipAnimation();
      }, 0);
    }
  }, [columns, transitioning]);

  // All Templates
  const allTemplates = [
    {
      img: emailtemplate1,
      title: "Welcome Email",
      category: "general",
    },
    {
      img: emailtemplate2,
      title: "Newsletter",
      category: "general",
    },
    {
      img: emailtemplate3,
      title: "Product Update",
      category: "service",
    },
    {
      img: emailtemplate4,
      title: "Thank You",
      category: "general",
    },
    {
      img: emailtemplate5,
      title: "Special Offer",
      category: "spa",
    },
    {
      img: emailtemplate6,
      title: "Event Invitation",
      category: "spa",
    },
    {
      img: emailtemplate7,
      title: "Webinar",
      category: "service",
    },
  ];

  // Create New Template - to be added to all categories
  const createNewTemplate = {
    title: "Create New Template",
    isCreateNew: true,
    category: "all",
  };

  // Filter templates by search query
  const filterTemplatesBySearch = (templates) => {
    if (!searchQuery) return templates;

    return templates.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Filter templates by category based on active tab
  const getTemplatesForTab = (tabIndex) => {
    let filteredTemplates = [];

    switch (tabIndex) {
      case 0: // All Templates
        filteredTemplates = [...allTemplates];
        break;
      case 1: // Spa Templates
        filteredTemplates = allTemplates.filter(
          (item) => item.category === "spa"
        );
        break;
      case 2: // Services Templates
        filteredTemplates = allTemplates.filter(
          (item) => item.category === "service"
        );
        break;
      default:
        filteredTemplates = [...allTemplates];
    }

    // Apply search filter
    filteredTemplates = filterTemplatesBySearch(filteredTemplates);

    // Always include the "Create New" template unless searching
    if (!searchQuery || searchQuery.toLowerCase().includes("create new")) {
      return [createNewTemplate, ...filteredTemplates];
    }
    return filteredTemplates;
  };

  // Check if there are any templates to display (excluding the "Create New" template)
  const hasTemplates = () => {
    const templates = getTemplatesForTab(value);
    return templates.some((template) => !template.isCreateNew);
  };

  // Initialize and update refs for items
  useEffect(() => {
    const templates = getTemplatesForTab(value);
    const newItemRefs = {};

    templates.forEach((item, index) => {
      const key = item.isCreateNew ? "new-template" : `template-${index}`;
      if (!itemRefs[key]) {
        newItemRefs[key] = React.createRef();
      } else {
        newItemRefs[key] = itemRefs[key];
      }
    });

    setItemRefs(newItemRefs);
  }, [value, searchQuery]);

  // Record current positions before transition
  const recordItemPositions = () => {
    const positions = {};

    Object.keys(itemRefs).forEach((key) => {
      const element = itemRefs[key].current;
      if (element) {
        const rect = element.getBoundingClientRect();
        positions[key] = {
          left: rect.left,
          top: rect.top,
          width: rect.width,
          height: rect.height,
        };
      }
    });

    return positions;
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleTabs = () => {
    setShowTabs(!showTabs);
  };

  const handleColumnChange = (event, newValue) => {
    const adjustedValue =
      (isMdScreen || isSmScreen) && newValue > 4 ? 4 : newValue;

    // Record current positions before changing layout
    const currentPositions = recordItemPositions();
    setItemPositions(currentPositions);

    setPreviousColumns(columns);
    setTransitioning(true);
    setColumns(adjustedValue);

    // Force a new render cycle to ensure DOM updates before animation
    setTimeout(() => {
      applyFlipAnimation();

      // Reset transitioning state after animation completes
      setTimeout(() => {
        setTransitioning(false);
      }, 600);
    }, 0);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // FLIP animation technique (First-Last-Invert-Play)
  const applyFlipAnimation = () => {
    Object.keys(itemRefs).forEach((key) => {
      const element = itemRefs[key].current;
      if (element && itemPositions[key]) {
        const oldPosition = itemPositions[key];
        const newPosition = element.getBoundingClientRect();

        // Calculate the delta
        const deltaX = oldPosition.left - newPosition.left;
        const deltaY = oldPosition.top - newPosition.top;
        const scaleX = oldPosition.width / newPosition.width;
        const scaleY = oldPosition.height / newPosition.height;

        // Apply the inverse transform to make it appear in the old position
        element.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${scaleX}, ${scaleY})`;
        element.style.transition = "none";

        // Force a reflow - fixed the linting error by assigning to a variable
        const reflow = element.offsetWidth;

        // Transition to the identity transform (new position)
        element.style.transform = "";
        element.style.transition = "transform 0ms ease";
      }
    });
  };

  // Masonry-style height
  const getItemHeight = (index) => {
    const aspectRatios = ["120%", "80%", "100%", "130%", "110%"];
    return aspectRatios[index % aspectRatios.length];
  };

  // Distribute items into columns based on current tab
  const distributeItems = (columnCount) => {
    const items = getTemplatesForTab(value);
    const columnsArray = Array.from({ length: columnCount }, () => []);

    items.forEach((item, index) => {
      const columnIndex = index % columnCount;
      columnsArray[columnIndex].push({
        item,
        index,
        key: item.isCreateNew ? "new-template" : `template-${index}`,
      });
    });

    return columnsArray;
  };

  return (
    <Box className="content_main_body">
      <Box className="email_tab">
        <Box className="email_tab_header">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Typography variant="h3">Select Template</Typography>
            <Button className="ns_secondary_btn">Add Attachment</Button>
          </Box>
          <Grid mb={2} container spacing={2} className="ns_field_style">
            <Grid size={{ xl: 8, lg: 8, md: 12, sm: 12, xs: 12 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                <Button
                  className="ns_secondary_btn toggle_btn"
                  onClick={toggleTabs}
                >
                  <ChecklistIcon />
                </Button>
                <Slider
                  aria-label="Column count"
                  value={columns}
                  step={1}
                  marks={
                    isMdScreen || isSmScreen
                      ? [{ value: 3 }, { value: 4 }]
                      : [{ value: 3 }, { value: 4 }, { value: 5 }]
                  }
                  min={3}
                  max={isMdScreen || isSmScreen ? 4 : 5}
                  onChange={handleColumnChange}
                />
              </Box>
            </Grid>
            <Grid size={{ xl: 4, lg: 4, md: 12, sm: 12, xs: 12 }}>
              <TextField
                className="search_campaigns"
                fullWidth
                size="small"
                placeholder="Search Email Templates"
                value={searchQuery}
                onChange={handleSearchChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </Box>

        <Box className="email_templates_main_box">
          <Box sx={{ display: "flex", width: "100%" }}>
            {/* Left side: Tabs - with sliding animation */}
            <Box
              className={`campaign_tabs${
                !expanded ? " left_Panel_collapsed" : ""
              }${!showTabs ? " campaign_tab_hidden" : ""}`}
            >
              <Tabs
                orientation="vertical"
                variant="scrollable"
                scrollButtons="off"
                value={value}
                onChange={handleChange}
              >
                <Tab label="All Templates" {...a11yProps(0)} />
                <Tab label="Spa Templates" {...a11yProps(1)} />
                <Tab label="Services Templates" {...a11yProps(2)} />
              </Tabs>
            </Box>

            {/* Right side: Content area */}
            <Box
              sx={{
                width: showTabs ? "80%" : "100%",
                transition: "width 0.3s ease",
                flexGrow: 1,
              }}
            >
              {/* Masonry gallery */}
              <Box
                className="mansory_item_gallery"
                sx={{
                  transition: "width 0.3s ease",
                }}
              >
                {hasTemplates() ? (
                  distributeItems(columns).map((column, columnIndex) => (
                    <Box
                      className="mansory_item_list"
                      key={columnIndex}
                      sx={{
                        width: `${100 / columns}%`,
                        transition: "width 0.3s ease",
                      }}
                    >
                      {column.map(({ item, index, key }) => (
                        <Box
                          key={key}
                          className="mansory_item"
                          ref={itemRefs[key]}
                          sx={{
                            willChange: transitioning ? "transform" : "auto",
                            transition: transitioning
                              ? "transform 300ms ease"
                              : "none",
                          }}
                        >
                          <>
                            <Box
                              className={`mansory_item_image ${
                                item.isCreateNew ? "is_new_template" : ""
                              }`}
                              sx={{
                                paddingBottom: getItemHeight(index),
                              }}
                            >
                              {!item.isCreateNew ? (
                                item.img ? (
                                  <img
                                    src={item.img}
                                    alt={item.title}
                                    loading="eager"
                                  />
                                ) : (
                                  <Box />
                                )
                              ) : (
                                <AddCircleOutlineIcon />
                              )}
                            </Box>
                            <Box className="mansory_item_title">
                              <Typography variant="h6">{item.title}</Typography>
                            </Box>
                          </>
                        </Box>
                      ))}
                    </Box>
                  ))
                ) : (
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "200px",
                    }}
                  >
                    <Typography variant="h6" color="textSecondary">
                      No templates available
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default EmailTab;
