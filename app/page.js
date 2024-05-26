"use client";
import { Box, Grid, Group, Slider, Stack } from "@mantine/core";
import Navbar from "../components/navbar/Navbar";
import Card from "@/components/navbar/HamburgerCard/Card";
import { useState } from "react";
import "./globals.css";
import Footer from "@/components/footer/Footer";
import ReactSlider from "react-slider";
import Topbar from "@/components/topbar/Topbar";
import Buttons from "@/components/buttons/Buttons";
import Addfile from "@/components/addfile/Addfile";

export default function Home() {
  const [activeCard, setActiveCard] = useState(false);
  const [addFileWindow, setAddFileWindow] = useState(false);
  const [fileType, setFileType] = useState("none");
  return (
    <Group className="main-window" gap="0">
      {addFileWindow && <Addfile setAddFileWindow={setAddFileWindow} seFileType={setFileType} />}
      {activeCard && <Card activeCard={activeCard} setActiveCard={setActiveCard} />}
      <Navbar activeCard={activeCard} setActiveCard={setActiveCard} />
      <Box className="edit-window">
        <Group gap="0">
          <Box className="project-settings">Project Settings</Box>
          <Box className="video-section">
            <Topbar />
            <Stack className="video-container" align="center">
              <Box className="video">Video</Box>
              <Buttons className="buttons" />
            </Stack>
          </Box>
        </Group>
        <Footer setAddFileWindow={setAddFileWindow} />
      </Box>
    </Group>
  );
}
