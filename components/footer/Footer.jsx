"use client";
import { useState } from "react";
import { Stack, Box, Slider, Switch } from "@mantine/core";
import "./Footer.css";
import { FiScissors } from "react-icons/fi";
import { CiMicrophoneOn } from "react-icons/ci";
import { FaForward, FaPlus } from "react-icons/fa";
import { FaBackward } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { FaMagnifyingGlassPlus } from "react-icons/fa6";
import { FaMagnifyingGlassMinus } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import Card from "./settingCard/Card";

const Footer = ({ setAddFileWindow }) => {
  const [settingClicked, setSettingClicked] = useState(false);
  const [editSetting, setEditSetting] = useState("none");

  return (
    <Stack className="footer" justify="flex-start" gap="0">
      {settingClicked && <Card />}
      <Box className="edit-controls fx">
        <Box className="edit-buttons fx">
          <Box className="fx">
            <FiScissors />
            <span>Split</span>
          </Box>
          <Box className="fx">
            <CiMicrophoneOn />
            <span>Voiceover</span>
          </Box>
        </Box>
        <Box className="playAndPause fx">
          <Box className="fx">
            <FaBackward />
            <FaPlay />
            <FaForward />
          </Box>
          <Box>00:00.0 / 01:00.0</Box>
        </Box>
        <Box className="view-controls fx">
          <Box className="slider">
            <FaMagnifyingGlassMinus className="minus-btn" />
            <Slider className="sld" color="blue" size="sm" />
            <FaMagnifyingGlassPlus className="plus-btn" />
          </Box>
          <Box className="fit">
            <Box className="fit-text">Fit</Box>
            <IoSettingsOutline className="setting-icon" onClick={() => setSettingClicked((p) => !p)} />
          </Box>
        </Box>
      </Box>
      <Box className="edit-area">
        {editSetting === "none" ? (
          <Box className="edit-none" onClick={() => setAddFileWindow((p) => !p)}>
            <FaPlus /> Add Media to this Project
          </Box>
        ) : editSetting === "audio" ? (
          <Box className="edit-audio">audio</Box>
        ) : (
          <Box className="edit-video"></Box>
        )}
      </Box>
    </Stack>
  );
};

export default Footer;
