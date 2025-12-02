import React from "react";
import PropTypes from "prop-types";
import { Box, Button, Typography, Grid, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  AddButton,
  EditButton,
  DeleteButton,
  SaveButton,
  CancelButton,
  CreateButton,
  NextButton,
  BackButton,
} from "../components/actionButton.js";
import DottedMenuButton from "../components/menubtn.js";

// Button configuration type mapping
const buttonComponents = {
  add: AddButton,
  edit: EditButton,
  delete: DeleteButton,
  save: SaveButton,
  cancel: CancelButton,
  create: CreateButton,
  next: NextButton,
  back: BackButton,
};

const DEFAULT_BUTTON_ORDER = [
  "cancel",
  "delete",
  "edit",
  "add",
  "create",
  "save",
  "next",
  "back",
];

/**
 * Renders a button based on its configuration
 */
const RenderButton = ({ config, type }) => {
  if (!config?.enable) return null;

  const ButtonComponent = buttonComponents[type];
  if (!ButtonComponent) return null;

  return (
    <ButtonComponent
      label={config.label}
      onClick={config.onClick}
      className={config.className}
      disabled={config.disabled}
      startIcon={config.startIcon}
    />
  );
};

/**
 * Header component with configurable buttons and responsive layout
 */
const Header = ({
  title,
  description,
  hideDescription = false,
  buttons = {},
  buttonOrder = DEFAULT_BUTTON_ORDER,
  dottedMenuButton,
  menuItems,
  showIcon,
  onBackButtonClick,
  className = "", // Accept className prop for the entire Header
}) => {
  // Use the provided button order or fall back to default
  const orderedButtonTypes = buttonOrder.filter(
    (type) => buttonComponents[type]
  );

  return (
    <Grid
      container
      rowSpacing={2}
      columnSpacing={{ xs: 1, sm: 2, md: 5 }}
      className={className} // Apply the className here
    >
      {" "}
      <Grid size={{ xl: 6, lg: 6, md: 6, sm: 4, xs: 12 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box>
            <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
              {onBackButtonClick && (
                <IconButton onClick={onBackButtonClick} size="small">
                  <ArrowBackIcon />
                </IconButton>
              )}
              <strong>{title}</strong>
            </Typography>
            {!hideDescription && (
              <Typography sx={{ mb: 2, display: { xs: "none", md: "block" } }}>
                {description}
              </Typography>
            )}
          </Box>
        </Box>
      </Grid>
      <Grid size={{ xl: 6, lg: 6, md: 6, sm: 8, xs: 12 }}>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            justifyContent: "flex-end",
            flexWrap: "wrap",
            mb: { xs: 2 },
          }}
        >
          {/* Render buttons according to the order specified */}
          {orderedButtonTypes.map((type) => (
            <RenderButton key={type} config={buttons[type]} type={type} />
          ))}

          {dottedMenuButton?.enable && (
            <DottedMenuButton menuItems={menuItems} showIcon={showIcon} />
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

// Define shape for button config
const buttonConfigShape = PropTypes.shape({
  label: PropTypes.string,
  enable: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  startIcon: PropTypes.node,
});

// Prop Types
Header.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  buttons: PropTypes.shape({
    save: buttonConfigShape,
    add: buttonConfigShape,
    edit: buttonConfigShape,
    delete: buttonConfigShape,
    cancel: buttonConfigShape,
    create: buttonConfigShape,
    next: buttonConfigShape,
    back: buttonConfigShape,
  }),
  buttonOrder: PropTypes.arrayOf(PropTypes.string), // New prop for button order
  dottedMenuButton: PropTypes.shape({
    enable: PropTypes.bool,
  }),
  menuItems: PropTypes.arrayOf(PropTypes.object),
  showIcon: PropTypes.bool,
  onBackButtonClick: PropTypes.func,
  className: PropTypes.string, // Add className to PropTypes
  hideDescription: PropTypes.bool,
};

export default Header;
