"use client";

import React, { useState } from "react";
import { CardTitle, TileLayout, TileLayoutRepositionEvent } from "@progress/kendo-react-layout";
import { daysTillBirthday, getWeightCategory, getAgeCategory } from "@/utils/dogUtils";
import { Dog } from "@/types/Dog";
import NameTile  from './tiles/NameTile';
import BreedTile from "./tiles/BreedTile";
import { toProperCase } from "@/utils/stringUtils";
import GenderTile from "./tiles/GenderTile";
import WeightTile from "./tiles/WeightTile";
import CommandChipsTile from "./tiles/CommandsChipsTile";
import QuirksTabbedTile from "./tiles/QuirksTabbedTile";

interface DogReportProps {
  dog: Dog;
}

const DogReport: React.FC<DogReportProps> = ({ dog }) => {
  // Utility function values
  const daysUntilBirthday = daysTillBirthday(dog);
  const weightCategory = getWeightCategory(dog);
  const ageCategory = getAgeCategory(dog);

  // Split quirks by type
  const appearanceQuirks = dog.physicalQuirks.filter(q => q.type === "appearance");
  const medicalQuirks = dog.physicalQuirks.filter(q => q.type === "medical");

  const generalAndPlay = dog.behaviorQuirks.filter(q => q.type === "general behavior" || q.type === "play");
  const interactionQuirks = dog.behaviorQuirks.filter(q => q.type === "animal interaction" || q.type === "human interaction");

  // Define initial tile positions
  const tilePositions = 
  [
    { col:1, colSpan: 4, rowSpan: 2}, // Name
    { col: 5, colSpan: 4}, // Breed
    { col:9, colSpan: 2}, // Gender
    { col:5, colSpan: 2}, // Age
    { col:7, colSpan: 4}, // Weight
    { col:1, colSpan: 10, rowSpan: 3}, // Quirks
    { col:1, colSpan: 10} // Commands
  ];

  // Define the tiles to render
  const tiles = [
    {
      header: <CardTitle>My name is</CardTitle>,
      body: (
        <NameTile name={dog.name} />
      )
    },
    {
      header: <h3>{toProperCase(dog.breedInfo.size)} Breed</h3>,
      body: (
        <BreedTile breedName={dog.breedInfo.name} />
      )
    },
    {
      header: <h3>{toProperCase(dog.gender)}</h3>,
      body: (
        <GenderTile gender={dog.gender} />
      )
    },
    {
      header: <h3>{toProperCase(dog.gender)}</h3>,
      body: (
        <GenderTile gender={dog.gender} />
      )
    },
    {
      header: <h3>Weight</h3>,
      body: (
        <WeightTile weight={dog.weightKg} weightCategory={getWeightCategory(dog)} />
      )
    },
    {
      header: <h3>My quirks</h3>,
      body: (
        <QuirksTabbedTile behaviorQuirks={dog.behaviorQuirks} physicalQuirks={dog.physicalQuirks} />
      )
    },
    {
      header: <h3>My dictionary</h3>,
      body: (
        <CommandChipsTile knownCommands={dog.knownCommands} />
      )
    },
    // {
    //   header: <h3>Stats & Fun Facts 🎉</h3>,
    //   body: (
    //     <div>
    //       <h4>Age: {dog.age} years ({ageCategory})</h4>
    //       <h4>Weight: {dog.weightKg} kg ({weightCategory})</h4>
    //       <h4>
    //         Birthday: {new Date(dog.birthday).toLocaleDateString()} 🎂{" "}
    //         {daysUntilBirthday < 100 && (
    //           <span>- Only {daysUntilBirthday} days until birthday!</span>
    //         )}
    //       </h4>
    //     </div>
    //   )
    // },
    // {
    //   header: <h3>Physical Quirks</h3>,
    //   body: (
    //     <div className="row">
    //       <div className="col-md-6">
    //         <h4>Appearance</h4>
    //         {appearanceQuirks.length > 0 ? (
    //           <ul>
    //             {appearanceQuirks.map(quirk => (
    //               <li key={quirk.base2Id}>
    //                 {quirk.iconName && <i className={quirk.iconName}></i>} {quirk.name}
    //               </li>
    //             ))}
    //           </ul>
    //         ) : (
    //           <p>No appearance quirks.</p>
    //         )}
    //       </div>
    //       <div className="col-md-6">
    //         <h4>Medical</h4>
    //         {medicalQuirks.length > 0 ? (
    //           <ul>
    //             {medicalQuirks.map(quirk => (
    //               <li key={quirk.base2Id}>
    //                 {quirk.iconName && <i className={quirk.iconName}></i>} {quirk.name}
    //               </li>
    //             ))}
    //           </ul>
    //         ) : (
    //           <p>No medical quirks.</p>
    //         )}
    //       </div>
    //     </div>
    //   )
    // },
    // {
    //   header: <h3>Behavior & Play 😎</h3>,
    //   body: (
    //     <div>
    //       {generalAndPlay.length > 0 ? (
    //         <ul>
    //           {generalAndPlay.map(quirk => (
    //             <li key={quirk.base2Id}>
    //               {quirk.iconName && <i className={quirk.iconName}></i>} {quirk.name}
    //             </li>
    //           ))}
    //         </ul>
    //       ) : (
    //         <p>No general or play quirks.</p>
    //       )}
    //     </div>
    //   )
    // },
    // {
    //   header: <h3>Interactions 🐾</h3>,
    //   body: (
    //     <div>
    //       {interactionQuirks.length > 0 ? (
    //         <ul>
    //           {interactionQuirks.map(quirk => (
    //             <li key={quirk.base2Id}>
    //               {quirk.iconName && <i className={quirk.iconName}></i>} {quirk.name}
    //             </li>
    //           ))}
    //         </ul>
    //       ) : (
    //         <p>No interaction quirks.</p>
    //       )}
    //     </div>
    //   )
    // },
    // {
    //   header: <h3>Commands & Radar Chart</h3>,
    //   body: (
    //     <div>
    //       <ul>
    //         {dog.knownCommands.map(command => (
    //           <li key={command.base2Id}>
    //             {command.name} – {command.expectation}
    //           </li>
    //         ))}
    //       </ul>
    //       <div
    //         style={{
    //           height: "200px",
    //           border: "2px dashed #ccc",
    //           borderRadius: "8px",
    //           display: "flex",
    //           justifyContent: "center",
    //           alignItems: "center",
    //           marginTop: "1rem",
    //         }}
    //       >
    //         Radar Chart Coming Soon!
    //       </div>
    //     </div>
    //   )
    // }
  ];

  return (
    <TileLayout
      columns={10}
      rowHeight={160}
      positions={tilePositions}
      gap={{ rows: 15, columns: 25 }}
      items={tiles}
    />
  );
};

export default DogReport;
