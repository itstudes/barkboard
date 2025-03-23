"use client";

import React, { useState } from "react";
import {
  CardTitle,
  TileLayout,
  TileLayoutRepositionEvent,
} from "@progress/kendo-react-layout";
import {
  daysTillBirthday,
  getWeightCategory,
  getAgeCategory,
} from "@/utils/dogUtils";
import { Dog } from "@/types/Dog";
import NameTile from "./tiles/NameTile";
import BreedTile from "./tiles/BreedTile";
import { toProperCase } from "@/utils/stringUtils";
import GenderTile from "./tiles/GenderTile";
import WeightTile from "./tiles/WeightTile";
import CommandChipsTile from "./tiles/CommandsChipsTile";
import QuirksTabbedTile from "./tiles/QuirksTabbedTile";
import AgeTile from "./tiles/AgeTile";

interface DogReportProps {
  dog: Dog;
}

const DogReport: React.FC<DogReportProps> = ({ dog }) => {
  // Utility function values
  const daysUntilBirthday = daysTillBirthday(dog);
  const weightCategory = getWeightCategory(dog);
  const ageCategory = getAgeCategory(dog);

  // Split quirks by type
  const appearanceQuirks = dog.physicalQuirks.filter(
    (q) => q.type === "appearance"
  );
  const medicalQuirks = dog.physicalQuirks.filter((q) => q.type === "medical");

  const generalAndPlay = dog.behaviorQuirks.filter(
    (q) => q.type === "general behavior" || q.type === "play"
  );
  const interactionQuirks = dog.behaviorQuirks.filter(
    (q) => q.type === "animal interaction" || q.type === "human interaction"
  );

  // Define initial tile positions
  const tilePositions = [
    { col: 1, colSpan: 5, row: 1, rowSpan: 2 }, // Name
    { col: 6, colSpan: 3, row: 1 },            // Breed
    { col: 9, colSpan: 2, row: 1 },            // Gender
    { col: 6, colSpan: 3, row: 2 },            // Age
    { col: 9, colSpan: 2, row: 2 },            // Weight
    { col: 1, colSpan: 10, row: 3, rowSpan: 3 }, // Quirks
    { col: 1, colSpan: 10, row: 6 }            // Commands
  ];

  // Define the tiles to render
  const tiles = [
    {
      header: <CardTitle>My name is:</CardTitle>,
      body: <NameTile name={dog.name} />,
    },
    {
      header: <CardTitle>I'm a {dog.breedInfo.size} breed.</CardTitle>,
      body: <BreedTile breedName={dog.breedInfo.name} />,
    },
    {
      header: <CardTitle>{toProperCase(dog.gender)}</CardTitle>,
      body: <GenderTile gender={dog.gender} />,
    },
    {
      header: <CardTitle>{toProperCase(getAgeCategory(dog))}</CardTitle>,
      body: (
        <AgeTile
          birthday={dog.birthday}
          birthdayTicks={dog.birthdayTicks}
          age={dog.age}
        />
      ),
    },
    {
      header: <CardTitle>Weight</CardTitle>,
      body: (
        <WeightTile
          weight={dog.weightKg}
          weightCategory={getWeightCategory(dog)}
        />
      ),
    },
    {
      header: <CardTitle>A bit about me:</CardTitle>,
      body: (
        <QuirksTabbedTile
          behaviorQuirks={dog.behaviorQuirks}
          physicalQuirks={dog.physicalQuirks}
        />
      ),
    },
    {
      header: <CardTitle>Words I know:</CardTitle>,
      body: <CommandChipsTile knownCommands={dog.knownCommands} />,
    },
  ];

  return (
    <TileLayout
      columns={10}
      rowHeight={140}
      positions={tilePositions}
      gap={{ rows: 15, columns: 25 }}
      items={tiles}
    />
  );
};

export default DogReport;
