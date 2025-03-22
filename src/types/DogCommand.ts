export interface DogCommand {
  base2Id: number;                  // Must be a power of 2.
  name: string;                     // The name of the command (e.g., "Sit", "Stay", etc.)
  expectation: string;              // What the dog is expected to do (e.g., "Sit in the same place calmly.", etc.)
  similarToCommandsBitMap: number;  // Default value: 0.
}