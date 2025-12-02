// themeConfig.js
import { createTheme } from "@mui/material/styles";

// Define themes
export const themes = {
  classic: createTheme({
    typography: {
      fontFamily: '"Avenir", "Helvetica", "Arial", sans-serif',
    },
    palette: {
      mode: "light",
      primary: { main: "#1976d2" },
      background: { default: "#F5F5F7" },
    },
  }),
  midnight: createTheme({
    typography: {
      fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    },
    palette: {
      mode: "dark",
      primary: { main: "#90caf9" },
      background: { default: "#121212" },
    },
  }),
  ocean: createTheme({
    typography: {
      fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
    },
    palette: {
      mode: "light",
      primary: { main: "#2196f3" },
      background: { default: "#e5f2ff" },
    },
  }),
};


// Custom theme names for dropdown
export const themeNames = {
  classic: "Classic Light",
  midnight: "Midnight Dark",
  ocean: "Ocean Blue",
};
