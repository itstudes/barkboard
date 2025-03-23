"use client";

import React from "react";
import "./Tiles.css";
import { StackLayout } from "@progress/kendo-react-layout";
import { toProperCase } from "../../../../utils/stringUtils";

interface WeightTileProps {
  weight: number;
  weightCategory: string;
}

const WeightTile: React.FC<WeightTileProps> = ({ weight, weightCategory }) => {
  return (
    <StackLayout orientation="horizontal">
        <div>
            <h1 className="tile-h2-text">{weight}</h1>
            <h5>kg</h5>
        </div>
        <div>
          <h2 className="tile-h2-text">{toProperCase(weightCategory)}</h2>
        </div>
    </StackLayout>
    
  );
};

export default WeightTile;
