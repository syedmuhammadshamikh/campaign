import React from "react";
import { Typography, Select, MenuItem, Box } from "@mui/material";

const DropdownSelect = ({
  label,
  value,
  onChange,
  options,
  required = true,
}) => {
  return (
    <Box
      className="ns_field_style"
      sx={{
        width: "100%",
      }}
    >
      {label && (
        <Typography variant="body1" component="label" gutterBottom>
          {label} {required && <span style={{ color: "red" }}>*</span>}
        </Typography>
      )}
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={value}
        onChange={onChange}
        fullWidth
        size="small"
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default DropdownSelect;
