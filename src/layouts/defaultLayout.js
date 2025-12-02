import React from "react";
import { Box } from "@mui/material";
import ListCampaigns from "./listCampaigns";
import CreateCampaign from "./createCampaign";

const App = () => {
  return (
    <Box className="inner_wrapper_app">
      <ListCampaigns />
      {/* <CreateCampaign /> */}
    </Box>
  );
};

export default App;
