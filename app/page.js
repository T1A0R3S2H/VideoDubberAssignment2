"use client";
import { Box, Grid, Group, Slider } from "@mantine/core";
import Navbar from "../components/navbar/Navbar";
import Card from "@/components/navbar/HamburgerCard/Card";
import { useState } from "react";
import "./globals.css";
import Footer from "@/components/footer/Footer";
import ReactSlider from "react-slider";

export default function Home() {
  const [activeCard, setActiveCard] = useState(false);
  return (
    <Group className="main-window" gap={0}>
      {activeCard && <Card activeCard={activeCard} setActiveCard={setActiveCard} />}
      <Navbar activeCard={activeCard} setActiveCard={setActiveCard} />
      <Box className="edit-window">
        <Group>
          <Box className="project-settings">Project Settings</Box>
          <Box className="main-window">
            Project Settings
            <ReactSlider className="horizontal-slider" thumbClassName="example-thumb" trackClassName="example-track" renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>} />
            <Slider
              color="blue"
              marks={[
                { value: 20, label: "20%" },
                { value: 50, label: "50%" },
                { value: 80, label: "80%" },
              ]}
            />
          </Box>
        </Group>
        <Footer />
      </Box>
    </Group>
  );
}
