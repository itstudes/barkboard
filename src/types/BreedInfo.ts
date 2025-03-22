export interface BreedInfo {
    id: number;              // Simple integer Id (e.g., 1, 2, 3, etc.)

    //basic info
    name: string;
    originCountry: string;
    size: 'giant' | 'large' | 'medium' | 'small';
    maxAge: number;

    // to categorize the dog by weight
    overWeightKg: number;
    veryOverWeightKg: number;
    underWeightKg: number;
    veryUnderWeightKg: number;
  }