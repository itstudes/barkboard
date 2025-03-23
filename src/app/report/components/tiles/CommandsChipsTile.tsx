"use client";

import React from "react";
import "./Tiles.css";
import { DogCommand } from "@/types/DogCommand";
import { Chip, ChipList, ChipProps } from "@progress/kendo-react-buttons";

interface CommandChipsTileProps {
  knownCommands: DogCommand[];
}

interface CommandChip {
  text: string;
  value: string;
  icon: string;
  size: "small" | "medium" | "large";
  themeColor: "base" | "error" | "info" | "success" | "warning";
  fillMode: "solid" | "outline";
}

//method to get the color from the command type
// 'obedience'-->'base' | 'behavior'-->'warning' | 'play'-->'success' | 'social'-->'info | 'advanced'-->'error'
const getCommandTypeColor = (type: string) => {
  switch (type) {
    case "obedience":
      return "base";
    case "behavior":
      return "warning";
    case "play":
      return "success";
    case "social":
      return "info";
    case "advanced":
      return "error";
    default:
      return "base"; // default color if type is unknown
  }
};

//method to build CommandChip from the DogCommand object
const buildCommandChip = (command: DogCommand): CommandChip => {
  //set fillMode to 'solid' unless the command type is advanced
  let fillMode = "solid" as CommandChip["fillMode"];
  if (command.type === "advanced") {
    fillMode = "outline";
  }

  return {
    text: command.name,
    value: command.name,
    icon: "",
    size: "medium",
    themeColor: getCommandTypeColor(command.type),
    fillMode: fillMode,
  };
};

const CommandChipsTile: React.FC<CommandChipsTileProps> = ({
  knownCommands,
}) => {
  //build command chips from the known commands
  const commandChips = knownCommands.map((command) =>
    buildCommandChip(command)
  );

  return (
    <ChipList
      data={commandChips}
      selection="multiple"
      chip={(props: ChipProps) => (
        <Chip
          {...props}
          themeColor={props.dataItem.themeColor}
          fillMode={props.dataItem.fillMode}
          size={props.dataItem.size}
        />
      )}
    />
  );
};

export default CommandChipsTile;
