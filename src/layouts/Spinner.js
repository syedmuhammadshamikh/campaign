import { CircularProgress, Box } from "@mui/material";

const Spinner = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100px",
    }}
  >
    <CircularProgress />
  </Box>
);

export default Spinner;
