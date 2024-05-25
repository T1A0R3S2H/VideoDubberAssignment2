import { Box, Stack } from "@mantine/core";
import "./Card.css";
import { RxHamburgerMenu } from "react-icons/rx";

const Card = ({ activeCard, setActiveCard }) => {
  return (
    <Box className={`cardbox ${activeCard ? "activeCard" : ""}`} onClick={() => setActiveCard((prev) => !prev)}>
      <Box className="cardtop">
        <RxHamburgerMenu className="icon" />
        <p>Close Panel</p>
      </Box>
      <h1>VEED</h1>
      <Stack className="card-options">
        <Box className="optn">Help</Box>
        <Box className="optn">
          Language <span>&gt;</span>
        </Box>
        <Box className="optn">keyboard Shortcuts</Box>
      </Stack>
    </Box>
  );
};

export default Card;
