import { styled, Switch } from "@mui/material";

const CampaignSwitch = styled(Switch)(
  ({ theme, thumbColor, trackColor, checkedColor }) => ({
    width: 27,
    height: 14,
    padding: 0,
    display: "flex",
    alignItems: "center",

    "& .MuiSwitch-switchBase": {
      padding: 0,
      top: "50%",
      transform: "translateX(4px) translateY(-50%)",
      transition: theme.transitions.create(["transform"], {
        duration: 200,
      }),
      "&.Mui-checked": {
        transform: "translateX(16px) translateY(-50%)",
        color: checkedColor || "#fff",
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor: "#006BFF",
          borderColor: "#006BFF",
        },
        "& .MuiSwitch-thumb": {
          backgroundColor: thumbColor || "#fff",
        },
      },
    },

    "& .MuiSwitch-thumb": {
      width: 8,
      height: 8,
      borderRadius: "50%",
      backgroundColor: thumbColor || "#AFB5C4",
      boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    },

    "& .MuiSwitch-track": {
      borderRadius: 8,
      opacity: 1,
      backgroundColor: "#fff",
      borderWidth: 2,
      borderColor: "#AFB5C4",
      borderStyle: "solid",
      boxSizing: "border-box",
      transition: theme.transitions.create(
        ["background-color", "border-color"],
        {
          duration: 200,
        }
      ),
    },
  })
);

export default CampaignSwitch;
