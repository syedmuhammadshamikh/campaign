import React, { useState } from "react";
import { Box, Checkbox, Typography, Icon } from "@mui/material";
import { campaignSlots } from "../data/menuItems";

const CampaignSlot = ({
  icon,
  title,
  description,
  colorClass,
  emailcount,
  checked,
  onChange,
  smscount,
}) => (
  <Box display="flex" alignItems="center" className="create_campaign_slots">
    <Checkbox checked={checked} onChange={onChange} />
    <Box className={`icons ${colorClass}`}>
      <Icon sx={{ width: 32, height: 32 }}>
        <Box component="img" src={icon} alt={`${title} icon`} />
      </Icon>
    </Box>
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography component="strong" sx={{ display: "block", mb: 1 }}>
          <strong>{title}</strong>
        </Typography>
        {title === "Email Campaign" && emailcount !== "0" && (
          <Box className="email_remaining_txt" sx={{ ml: "auto" }}>
            <small>{emailcount} emails remaining</small>
          </Box>
        )}
        {title === "SMS Campaign" && smscount !== "0" && (
          <Box className="email_remaining_txt" sx={{ ml: "auto" }}>
            <small>{smscount} SMS remaining</small>
          </Box>
        )}
      </Box>
      <Typography variant="body2">{description}</Typography>
    </Box>
  </Box>
);

const CampaignSlots = ({ onSelectionChange }) => {
  const [checkedSlots, setCheckedSlots] = useState({});

  const handleCheckboxChange = (id) => {
    const newCheckedState = {
      ...checkedSlots,
      [id]: !checkedSlots[id],
    };

    setCheckedSlots(newCheckedState);

    // Call the callback with updated selections
    if (onSelectionChange) {
      onSelectionChange(newCheckedState);
    }
  };

  return (
    <Box>
      {campaignSlots.map((slot) => (
        <CampaignSlot
          key={slot.id}
          icon={slot.icon}
          title={slot.title}
          description={slot.description}
          colorClass={slot.colorClass}
          emailcount={slot.emailcount}
          smscount={slot.smscount}
          checked={!!checkedSlots[slot.id]}
          onChange={() => handleCheckboxChange(slot.id)}
        />
      ))}
    </Box>
  );
};

export default CampaignSlots;
