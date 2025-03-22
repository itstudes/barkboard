export interface DogQuirk {
  base2Id: number;         // Must be a power of 2 (e.g., 1, 2, 4, 8, etc.) for bit mapping.
  name: string;
  description: string;
  iconName: string;
}