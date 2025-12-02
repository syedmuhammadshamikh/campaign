import React, { useState } from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const ActionButton = ({
  label,
  onClick,
  disabled = false,
  loading = false,
  variant = "contained",
  color = "primary",
  className,
  startIcon,
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      onClick={onClick}
      disabled={disabled || loading}
      startIcon={startIcon}
      sx={{
        minWidth: "fit-content",
        display: "flex",
        justifyContent: "center",
      }}
      className={className}
    >
      <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
        {loading && <CircularProgress size={16} sx={{ color: "#fff" }} />}
        {label}
      </Box>
    </Button>
  );
};

// Button action configurations
const buttonConfig = {
  add: {
    label: "Add",
    color: "primary",
    action: (customAction) =>
      customAction || (() => console.log("Add button clicked")),
  },
  create: {
    label: "Create",
    color: "primary",
    action: (customAction) =>
      customAction || (() => console.log("Create button clicked")),
  },
  edit: {
    label: "Edit",
    color: "primary",
    action: (customAction) =>
      customAction || (() => console.log("Edit button clicked")),
  },
  delete: {
    label: "Delete",
    color: "error",
    action: (customAction) =>
      customAction || (() => console.log("Delete button clicked")),
  },
  save: {
    label: "Save Changes",
    color: "primary",
    action: (customAction) =>
      customAction || (() => console.log("Save button clicked")),
    withLoading: true,
  },
  cancel: {
    label: "Cancel",
    color: "secondary",
    variant: "outlined",
    action: (customAction) =>
      customAction || (() => console.log("Cancel button clicked")),
  },
  next: {
    label: "Next",
    color: "primary",
    action: (customAction) =>
      customAction || (() => console.log("Next button clicked")),
    withLoading: true,
  },
  back: {
    label: "Back",
    color: "primary",
    action: (customAction) =>
      customAction || (() => console.log("Back button clicked")),
    withLoading: true,
  },
};

const customButton = (type) => {
  const config = buttonConfig[type];

  if (!config) {
    throw new Error(`Button type '${type}' is not supported`);
  }

  return ({
    label = config.label,
    onClick,
    disabled = false,
    className,
    startIcon,
    variant = config.variant || "contained",
  }) => {
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
      // Use the provided onClick or fallback to default action
      const actionFn = config.action(onClick);

      if (config.withLoading) {
        setLoading(true);
        // Simulate async operation
        setTimeout(() => {
          actionFn();
          setLoading(false);
        }, 2000);
      } else {
        actionFn();
      }
    };

    return (
      <ActionButton
        label={label}
        onClick={handleClick}
        loading={loading}
        disabled={disabled}
        color={config.color}
        variant={variant}
        className={className}
        startIcon={startIcon}
      />
    );
  };
};

// Export button components created by the factory
export const AddButton = customButton("add");
export const CreateButton = customButton("create");
export const EditButton = customButton("edit");
export const DeleteButton = customButton("delete");
export const SaveButton = customButton("save");
export const CancelButton = customButton("cancel");
export const NextButton = customButton("next");
export const BackButton = customButton("back");

export default ActionButton;
