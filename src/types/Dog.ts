import { DogCommand } from './DogCommand';
import { DogQuirk } from './DogQuirk';
import { BreedInfo } from './BreedInfo';

// Dog interface represents the complete profile.
export interface Dog {

    // Core properties
    name: string;
    breedInfo: BreedInfo; // All breed-related info is derived from this object.

    // Info properties
    birthday: Date;          // The dog's birthday (with a -20 year limit).
    birthdayTicks: number;   // Timestamp representation of the birthday.
    age: number;             // Computed from birthday (do not store; calculate on demand).
    weightKg: number;        // Dog's weight in kilograms (1–110).
    languageCode: string;    // The language the dog "speaks" (optional for now).

    // Multi-select properties (stored as arrays but represented as bitmaps in URLs)
    physicalQuirks: DogQuirk[];
    behaviorQuirks: DogQuirk[];
    knownCommands: DogCommand[];
  }