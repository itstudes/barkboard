"use client";

import React from "react";
import "./Tiles.css";

interface AgeTileProps {
  birthday?: Date | null;
  birthdayTicks?: number | null;
  age?: number | null;
}

const AgeTile: React.FC<AgeTileProps> = ({
  birthday = null,
  birthdayTicks = null,
  age = null,
}) => {
  let computedAgeInYears: number;

  // Use the provided age if available. Otherwise, derive it from birthdayTicks or birthday.
  if (age !== null && age !== undefined) {
    computedAgeInYears = age;
  } else {
    let birthdayDate: Date;
    if (birthdayTicks !== null && birthdayTicks !== undefined) {
      birthdayDate = new Date(birthdayTicks);
    } else if (birthday !== null && birthday !== undefined) {
      birthdayDate = birthday;
    } else {
      // Default to Unix epoch if no value provided
      birthdayDate = new Date(0);
    }
    const now = new Date();
    const diffMs = now.getTime() - birthdayDate.getTime();
    computedAgeInYears = diffMs / (1000 * 60 * 60 * 24 * 365.25);
  }

  // If the dog is less than 2 years old, display age in months; otherwise, in years.
  let displayNumber: number;
  let displayUnit: string;

  if (computedAgeInYears < 2) {
    displayNumber = Math.floor(computedAgeInYears * 12);
    displayUnit = "months";
  } else {
    displayNumber = Math.floor(computedAgeInYears);
    displayUnit = "years";
  }

  return (
    <div>
      <div className="k-tile-number">{displayNumber}</div>
      <div className="k-tile-subtitle">{displayUnit}</div>
    </div>
  );
};

export default AgeTile;
