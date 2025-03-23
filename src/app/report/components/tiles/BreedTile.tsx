"use client";

import React from "react";
import "./Tiles.css";
import { StackLayout } from "@progress/kendo-react-layout";
import { toProperCase } from "../../../../utils/stringUtils";

interface BreedTileProps {
  breedName: string;
  flagEmoji?: string;
}

const BreedTile: React.FC<BreedTileProps> = ({ breedName, flagEmoji }) => {

    // default flag emoji if not provided
    const defaultFlagEmoji = "🐶";
    // If flag emoji is not provided, use the default
    const flag = flagEmoji || defaultFlagEmoji;


  return (
    <StackLayout orientation="horizontal">
        <div className="big-emoji-text">
            <h1>{flag}</h1>
        </div>
        <div className="tile-h2-text">
          <h2>{toProperCase(breedName)}</h2>
        </div>
    </StackLayout>
    
  );
};

export default BreedTile;
