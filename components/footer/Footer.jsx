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

const Footer = ({ setAddFileWindow, fileType, videoRef, audioUrl }) => {
  const [settingClicked, setSettingClicked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);

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
      <Box className="edit-area">
        {fileType === "none" ? (
          <Box className="edit-none" onClick={() => setAddFileWindow((p) => !p)}>
            <FaPlus /> Add Media to this Project
          </Box>
        ) : fileType === "audio" ? (
          // <Box className="edit-audio">audio</Box>
          <Box className="edit-audio" ref={waveformRef}></Box>
        ) : (
          <Box className="edit-video">video</Box>
        )}
      </Box>
    </Stack>
  );
};

export default Footer;
