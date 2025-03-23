import { Base2Entity } from './Base2Entity';

export interface DogCommand extends Base2Entity {
  name: string;                     // The name of the command (e.g., "Sit", "Stay", etc.)
  expectation: string;              // What the dog is expected to do (e.g., "Sit in the same place calmly.", etc.)
  type: 'obedience' | 'behavior' | 'play' | 'social' | 'advanced' ;
  similarToCommandsBitMap: number;  // Default value: 0.
}