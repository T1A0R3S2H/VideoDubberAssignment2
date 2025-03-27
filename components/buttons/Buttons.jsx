"use client";
import { Box, Button, Autocomplete, Group, ColorInput } from "@mantine/core";
import "./Buttons.css";
import { BsThreeDots } from "react-icons/bs";
import { FaVolumeDown } from "react-icons/fa";
import { RiSpeedUpLine } from "react-icons/ri";
import { MdAnimation } from "react-icons/md";
import { TbTransitionRightFilled } from "react-icons/tb";
import { SiCodemagic } from "react-icons/si";
import { useState } from "react";
import PropTypes from 'prop-types';

const ASPECT_RATIO_OPTIONS = [
  "YouTube (16:9)",
  "YouTube Short (9:16)",
  "TikTok (9:16)",
  "Instagram Post (1:1)",
  "Instagram Story (9:16)",
  "Instagram Reel (9:16)",
  "LinkedIn (1:1)",
  "X (Twitter) (1:1)",
  "Facebook Post (1:1)",
  "Facebook Story (9:16)",
  "Facebook Video (1:1)",
  "Snapchat (9:16)",
  "Tall Portrait (9:16)",
  "Portrait (4:5)",
  "Square (1:1)",
  "Landscape (5:4)",
  "Wide Landscape (16:9)",
];

const Buttons = ({ setAspectRatio, setColor, fileType }) => {
  const [selectedOption, setSelectedOption] = useState(ASPECT_RATIO_OPTIONS[0]);

  const handleOptionChange = (option) => {
    if (!option) return;

    setSelectedOption(option);
    const match = option.match(/\((\d+):(\d+)\)/);

    if (match) {
      const [_, a, b] = match;
      if ((+a > 1 && +b > 1) || (+a === 1 && +b === 1)) {
        setAspectRatio(`${a}/${b}`);
      }
    }
  };

  return (
    <Box className="buttons">
      {fileType === "none" ? (
        <Box className="none">
          <Box className="none-btn">
            <Autocomplete
              className="autocomplete"
              placeholder="Select video aspect ratio"
              data={ASPECT_RATIO_OPTIONS}
              withScrollArea={false}
              styles={{
                dropdown: { 
                  maxHeight: 200,
                  overflowY: "auto",
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                },
                input: {
                  width: '100%',
                  minWidth: '200px'
                }
              }}
              comboboxProps={{ 
                dropdownPadding: 10,
                withinPortal: true
              }}
              value={selectedOption}
              onChange={handleOptionChange}
            />
          </Box>
          <Box className="none-btn">
            <ColorInput placeholder="Background" onChangeEnd={setColor} />
          </Box>
        </Box>
      ) : (
        <Box className="audio">
          <Box className="magictools">
            <SiCodemagic /> Magic Tools
          </Box>
          <Group gap="0" className="at">
            <Box className="animations">
              <MdAnimation /> Animations
            </Box>
            <Box className="transitions">
              <TbTransitionRightFilled /> Transitions
            </Box>
          </Group>
          <Group gap="0">
            <Box className="vol">
              <FaVolumeDown /> Volume
            </Box>
            <Box className="speed">
              <RiSpeedUpLine /> Speed
            </Box>
          </Group>
          <Box className="audio-dots">
            <BsThreeDots className="dots" />
          </Box>
        </Box>
      )}
    </Box>
  );
};

Buttons.propTypes = {
  setAspectRatio: PropTypes.func.isRequired,
  setColor: PropTypes.func.isRequired,
  fileType: PropTypes.string.isRequired
};

export default Buttons;
