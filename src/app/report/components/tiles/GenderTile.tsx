"use client";

import React from "react";
import "./Tiles.css";

interface GenderTileProps {
  gender: string;
}

const MALE_EMOJI = "♂️";
const FEMALE_EMOJI = "♀️";
const UNKNOWN_EMOJI = "❓";
const MALE_EMOJI_CUT = "✂️♂️";
const FEMALE_EMOJI_CUT = "✂️♀️";

const GenderTile: React.FC<GenderTileProps> = ({ gender }) => {

  // Determine the flag emoji based on whether gender is 'male' | 'male_neutered' | 'female' | 'female_spayed'
  let flagEmoji: string;
  switch (gender) {
    case "male":
      flagEmoji = MALE_EMOJI;
      break;
    case "male_neutered":
      flagEmoji = MALE_EMOJI_CUT;
      break;
    case "female":
      flagEmoji = FEMALE_EMOJI;
      break;
    case "female_spayed":
      flagEmoji = FEMALE_EMOJI_CUT;
      break;
    default:
      flagEmoji = UNKNOWN_EMOJI;
      break;
  }

  return (
    <h1 className="big-emoji-text">{flagEmoji}</h1>
  );
};

export default GenderTile;
