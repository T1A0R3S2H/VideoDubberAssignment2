import React from "react";
import "./Card.css";
import { Box, Switch, Select } from "@mantine/core";

const Card = () => {
  return (
    <Box className="settingCard">
      <Box className="settingCard-option">
        <span>Show Comments</span>
        <Switch />
      </Box>
      <Box className="settingCard-option">
        <span>Show Soundwaves</span>
        <Switch />
      </Box>
      <Box className="settingCard-option">
        <span>Frames Per Second</span>
        <Select className="select" placeholder="30" data={["60", "50", "30", "25", "24", "10"]} />
      </Box>
    </Box>
  );
};

export default Card;
