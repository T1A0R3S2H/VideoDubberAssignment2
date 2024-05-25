"use client";
import React, { useState } from "react";
import { Box, Stack, Center } from "@mantine/core";
import "./Navbar.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaSearch } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { DiHtml5Multimedia } from "react-icons/di";
import { MdOutlineAudiotrack } from "react-icons/md";
import { LuSubtitles } from "react-icons/lu";
import { CiText } from "react-icons/ci";
import { LiaElementor } from "react-icons/lia";
import { MdOutlineEmergencyRecording } from "react-icons/md";
import { GoQuestion } from "react-icons/go";
import Card from "./HamburgerCard/Card";

const Navbar = ({ activeCard, setActiveCard }) => {
  const [activeIcon, setActiveIcon] = useState("media");

  const handleIconClick = (icon) => {
    setActiveIcon(icon);
  };

  return (
    <Stack className="navbar">
      <Box className="top">
        <Center className="icon-container" onClick={() => setActiveCard((prev) => !prev)}>
          <RxHamburgerMenu className="icon" />
        </Center>
        <Center className={`icon-container ${activeIcon === "search" ? "active" : ""}`} onClick={() => handleIconClick("search")}>
          <Box className="circle">
            <FaSearch className="icon" />
          </Box>
          <span>Search</span>
        </Center>
        <Center className={`icon-container ${activeIcon === "settings" ? "active" : ""}`} onClick={() => handleIconClick("settings")}>
          <Box className="circle">
            <IoSettingsOutline className="icon" />
          </Box>
          <span>Settings</span>
        </Center>
        <Center className={`icon-container ${activeIcon === "media" ? "active" : ""}`} onClick={() => handleIconClick("media")}>
          <Box className="circle">
            <DiHtml5Multimedia className="icon" />
          </Box>
          <span>Media</span>
        </Center>
        <Center className={`icon-container ${activeIcon === "audio" ? "active" : ""}`} onClick={() => handleIconClick("audio")}>
          <Box className="circle">
            <MdOutlineAudiotrack className="icon" />
          </Box>
          <span>Audio</span>
        </Center>
        <Center className={`icon-container ${activeIcon === "subtitles" ? "active" : ""}`} onClick={() => handleIconClick("subtitles")}>
          <Box className="circle">
            <LuSubtitles className="icon" />
          </Box>
          <span>Subtitles</span>
        </Center>
        <Center className={`icon-container ${activeIcon === "text" ? "active" : ""}`} onClick={() => handleIconClick("text")}>
          <Box className="circle">
            <CiText className="icon" />
          </Box>
          <span>Text</span>
        </Center>
        <Center className={`icon-container ${activeIcon === "elements" ? "active" : ""}`} onClick={() => handleIconClick("elements")}>
          <Box className="circle">
            <LiaElementor className="icon" />
          </Box>
          <span>Elements</span>
        </Center>
        <Center className={`icon-container ${activeIcon === "record" ? "active" : ""}`} onClick={() => handleIconClick("record")}>
          <Box className="circle">
            <MdOutlineEmergencyRecording className="icon" />
          </Box>
          <span>Record</span>
        </Center>
      </Box>
      <Box className="btm">
        <Center className="icon-container">
          <GoQuestion className="icon" />
        </Center>
      </Box>
    </Stack>
  );
};

export default Navbar;
