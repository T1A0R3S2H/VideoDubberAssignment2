"use client";
import { Box, Grid, Group, Slider, Stack } from "@mantine/core";
import Navbar from "../components/navbar/Navbar";
import Card from "../components/navbar/HamburgerCard/Card";
import { useState, useRef } from "react";
import "./globals.css";
import Footer from "../components/footer/Footer";
import Topbar from "../components/topbar/Topbar";
import Buttons from "../components/buttons/Buttons";
import Addfile from "../components/addfile/Addfile";
import Addmedia from "../components/addmedia/Addmedia";
import "@mantine/carousel/styles.css";

// Add this test function after your existing imports
const testVideo = () => {
  const file = new File([''], 'test-video.mp4', { type: 'video/mp4' });
  setFile(file);
  setFileType('video');
};

export default function Home() {
  const [activeCard, setActiveCard] = useState(false);
  const [addFileWindow, setAddFileWindow] = useState(false);
  const [fileType, setFileType] = useState("none");
  const [aspectRatio, setAspectRatio] = useState("16/9");
  const [color, setColor] = useState("#ffffff");
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
            <Addmedia setFileType={setFileType} setFile={setFile} />
          </Box>
          <Box className="video-section">
            <Topbar />
            <Stack className="video-container" align="center">
              <Box className="video" style={{ aspectRatio: aspectRatio, backgroundColor: color }}>
                {fileType === "video" && file && (
                  <video 
                    ref={videoRef} 
                    src={URL.createObjectURL(file)} 
                    controls 
                    style={{ width: "100%", height: "100%" }} 
                  />
                )}
                {fileType === "audio" && file && (
                  <audio 
                    src={URL.createObjectURL(file)} 
                    controls 
                    style={{ width: "100%" }} 
                  />
                )}
                {!file && "Upload a file"}
              </Box>
              <Buttons className="buttons" fileType={fileType} setAspectRatio={setAspectRatio} setColor={setColor} />
            </Stack>
            {/* <button onClick={testVideo} style={{ position: 'absolute', top: '10px', left: '10px' }}>
              Test Drag & Resize
            </button> */}
          </Box>
        </Box>
        <Footer setAddFileWindow={setAddFileWindow} fileType={fileType} videoRef={videoRef} audioUrl={audioUrl} />
      </Box>
    </Group>
  );
}
