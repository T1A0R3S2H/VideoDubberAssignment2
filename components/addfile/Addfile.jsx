import { IoCloseSharp } from "react-icons/io5";
import "./Addfile.css";
import { Box, Group, Button } from "@mantine/core";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { IoCloudUploadOutline } from "react-icons/io5";

const Addfile = ({ setAddFileWindow, setFileType }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        if (file.type.startsWith("audio")) {
          setFileType("audio");
        } else if (file.type.startsWith("video")) {
          setFileType("video");
        }
      }
    },
    [setFileType]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <Box className="addfile">
      <Box className="close-btn" onClick={() => setAddFileWindow((p) => !p)}>
        <IoCloseSharp />
      </Box>
      <h1>Let&apos;s Make a Video!</h1>
      <Box className="filebox" {...getRootProps()}>
        <input {...getInputProps()} />
        <Box className="upload-icon">
          <IoCloudUploadOutline />
        </Box>
        <p>Upload Files</p>
        <a>
          Choose Files <span>or drag them here</span>
        </a>
      </Box>
      <Group className="addfile-buttons" grow>
        <Box className="addfile-btn">Start by recording</Box>
        <Box className="addfile-btn">Start with AI</Box>
      </Group>
    </Box>
  );
};

export default Addfile;
