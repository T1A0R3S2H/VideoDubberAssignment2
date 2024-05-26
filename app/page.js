"use client";
import { Box, Grid, Group, Slider, Stack } from "@mantine/core";
import Navbar from "../components/navbar/Navbar";
import Card from "@/components/navbar/HamburgerCard/Card";
import { useState, useRef } from "react";
import "./globals.css";
import Footer from "@/components/footer/Footer";
import Topbar from "@/components/topbar/Topbar";
import Buttons from "@/components/buttons/Buttons";
import Addfile from "@/components/addfile/Addfile";
import Addmedia from "@/components/addmedia/Addmedia";
import "@mantine/carousel/styles.css";

export default function Home() {
  const [activeCard, setActiveCard] = useState(false);
  const [addFileWindow, setAddFileWindow] = useState(false);
  const [fileType, setFileType] = useState("none");
  const [aspectRatio, setAspectRatio] = useState("16/9");
  const [color, setColor] = useState("#000000");
  const [file, setFile] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const videoRef = useRef(null);

  // console.log(color);
  // console.log(aspectRatio);
  console.log("file type is:", fileType);
  return (
    <Group className="main-window" gap="0">
      {addFileWindow && <Addfile setAddFileWindow={setAddFileWindow} setFileType={setFileType} setFile={setFile} setAudioUrl={setAudioUrl} />}
      {activeCard && <Card activeCard={activeCard} setActiveCard={setActiveCard} />}
      <Navbar activeCard={activeCard} setActiveCard={setActiveCard} />
      <Box className="edit-window">
        <Box className="edit-grp" gap="0">
          <Box className="add-media">
            <Addmedia />
          </Box>
          <Box className="video-section">
            <Topbar />
            <Stack className="video-container" align="center">
              <Box className="video" style={{ aspectRatio: aspectRatio, backgroundColor: color }}>
                {fileType === "video" && file && <video ref={videoRef} src={URL.createObjectURL(file)} controls style={{ width: "100%", height: "100%" }} />}
                {!file && "Video"}
              </Box>
              <Buttons className="buttons" fileType={fileType} setAspectRatio={setAspectRatio} setColor={setColor} />
            </Stack>
          </Box>
        </Box>
        <Footer setAddFileWindow={setAddFileWindow} fileType={fileType} videoRef={videoRef} audioUrl={audioUrl} />
      </Box>
    </Group>
  );
}
