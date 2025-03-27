"use client";
import { useState, useEffect, useRef } from "react";
import { Stack, Box, Slider } from "@mantine/core";
import "./Footer.css";
import { FiScissors } from "react-icons/fi";
import { CiMicrophoneOn } from "react-icons/ci";
import { FaForward, FaPlus, FaBackward, FaPlay, FaPause } from "react-icons/fa";
import { FaMagnifyingGlassPlus, FaMagnifyingGlassMinus } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import Card from "./settingCard/Card";
import WaveSurfer from "wavesurfer.js";
import { Resizable } from 'react-resizable-box';


const Footer = ({ setAddFileWindow, fileType, videoRef, audioUrl }) => {
  const [settingClicked, setSettingClicked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: '100%', height: '100%' });
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);

  // Add drag functionality
  const handleDragStart = (e) => {
    const target = e.target;
    target.style.cursor = 'move';
  };

  const handleDrag = (e) => {
    if (e.clientX && e.clientY) {
      setPosition({
        x: e.clientX - e.target.offsetWidth / 2,
        y: e.clientY - e.target.offsetHeight / 2
      });
    }
  };

  const handleDragEnd = (e) => {
    e.target.style.cursor = 'default';
  };

  // Handle resize
  const handleResize = (direction, delta, position) => {
    setSize({
      width: `${position.width}px`,
      height: `${position.height}px`
    });
  };

  // Modify the video/audio rendering in the return statement
  const renderMedia = () => {
    console.log("fileType:", fileType, "videoRef:", videoRef, "audioUrl:", audioUrl);
    if (fileType === "video" && videoRef.current) {
      return (
        <Resizable
          size={size}
          onResizeStop={handleResize}
          enable={{
            top: true,
            right: true,
            bottom: true,
            left: true,
            topRight: true,
            bottomRight: true,
            bottomLeft: true,
            topLeft: true,
          }}
          style={{
            position: "relative",
            left: position.x,
            top: position.y,
          }}
        >
          <div
            draggable
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
          >
            <video ref={videoRef} style={{ width: "100%", height: "100%" }} />
          </div>
        </Resizable>
      );
    } else if (fileType === "audio") {
      return <Box className="edit-audio" ref={waveformRef}></Box>;
    }
    return null;
  };

  useEffect(() => {
    const video = videoRef.current;
    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);

    if (video) {
      updateDuration();
      video.addEventListener("timeupdate", updateTime);
      video.addEventListener("durationchange", updateDuration);

      return () => {
        video.removeEventListener("timeupdate", updateTime);
        video.removeEventListener("durationchange", updateDuration);
      };
    }
  }, [videoRef]);

  useEffect(() => {
    if (fileType === "audio" && waveformRef.current && audioUrl) {
      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "violet",
        progressColor: "purple",
        backend: "MediaElement",
      });
      wavesurferRef.current.load(audioUrl);

      wavesurferRef.current.on("ready", () => {
        setDuration(wavesurferRef.current.getDuration());
      });

      wavesurferRef.current.on("audioprocess", () => {
        setCurrentTime(wavesurferRef.current.getCurrentTime());
      });

      wavesurferRef.current.on("seek", () => {
        setCurrentTime(wavesurferRef.current.getCurrentTime());
      });

      return () => {
        if (wavesurferRef.current) {
          wavesurferRef.current.destroy();
        }
      };
    }
  }, [fileType, audioUrl]);

  const handlePlayPause = () => {
    console.log("videoRef:", videoRef, "isPlaying:", isPlaying);
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 10;
    }
  };

  const handleBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 10;
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const handleSliderChange = (value) => {
    const newTime = (value / 100) * duration;
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
    if (wavesurferRef.current) {
      wavesurferRef.current.seekTo(newTime / duration);
    }
    setCurrentTime(newTime);
  };

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
            <FaBackward onClick={handleBackward} className="play" />
            {isPlaying ? <FaPause onClick={handlePlayPause} className="play" /> : <FaPlay onClick={handlePlayPause} className="play" />}
            <FaForward onClick={handleForward} className="play" />
          </Box>
          <Box>
            {formatTime(currentTime)} / {formatTime(duration)}
          </Box>
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
      {/* <Box className="edit-area">
        {fileType === "none" ? (
          <Box className="edit-none" onClick={() => setAddFileWindow((p) => !p)}>
            <FaPlus /> Add Media to this Project
          </Box>
        ) : fileType === "audio" ? (
          // <Box className="edit-audio">audio</Box>
          <Box className="edit-audio" ref={waveformRef}></Box>
        ) : (
          <Box className="edit-video">video 2</Box>
        )}
      </Box> */}

      <Box className="edit-area">
        {fileType === "none" ? (
          <Box className="edit-none" onClick={() => setAddFileWindow((p) => !p)}>
            <FaPlus /> Add Media to this Project
          </Box>
        ) : (
          renderMedia()
        )}
      </Box>
    </Stack>
  );
};

export default Footer;
