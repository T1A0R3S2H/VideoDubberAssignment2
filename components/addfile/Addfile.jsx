import { IoCloseSharp } from "react-icons/io5";
import "./Addfile.css";
import { Box, Group } from "@mantine/core";

const Addfile = ({ setAddFileWindow, setFileType }) => {
  return (
    <Box className="addfile">
      <Box className="close-btn" onClick={() => setAddFileWindow((p) => !p)}>
        <IoCloseSharp />
      </Box>
      <h1>Let's Make a Video!</h1>
      <Box className="filebox">kuchbhi bhai</Box>
      <Group className="addfile-buttons" grow>
        <Box className="addfile-btn">Start by recording</Box>
        <Box className="addfile-btn">Start with AI</Box>
      </Group>
    </Box>
  );
};

export default Addfile;
