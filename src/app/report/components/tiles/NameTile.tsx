"use client";

import React from "react";
import "./Tiles.css";
import { toProperCase } from "../../../../utils/stringUtils";

interface NameTileProps {
  name: string;
}

const NameTile: React.FC<NameTileProps> = ({ name }) => {
  return (
    <div>
      <h1 className="tile-h1-text">{toProperCase(name)}</h1>
    </div>
  );
};

export default NameTile;
