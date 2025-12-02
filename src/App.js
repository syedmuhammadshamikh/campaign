import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Box, MenuItem, Select } from "@mui/material";
import DefaultLayout from "./layouts/defaultLayout";
import { themes, themeNames } from "./themeConfig";
import "./main.scss";
export default function App() {
  const [selectedTheme, setSelectedTheme] = useState("classic");
  const theme = themes[selectedTheme];
  const [themeClass, setThemeClass] = useState("theme-classic");
  const handleThemeChange = (event) => {
    const newTheme = event.target.value;
    if (themes[newTheme]) {
      setSelectedTheme(newTheme);
      setThemeClass(`theme-${newTheme}`);
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Box
        className={`main_wrapper_app ${themeClass}`}
        sx={{ bgcolor: theme.palette.background.default }}
      >
        {/* Theme Change Dropdown  */}
        {/* <Select value={selectedTheme} onChange={handleThemeChange}>
          {Object.entries(themeNames).map(([key, label]) => (
            <MenuItem key={key} value={key}>{label}</MenuItem>
          ))}
        </Select>   */}
        <DefaultLayout />
      </Box>
    </ThemeProvider>
  );
}
