import { Base2Entity } from './Base2Entity';

export interface DogQuirk extends Base2Entity {
  name: string;
  description: string;
  type: 'appearance' | 'medical' | 'general behavior' | 'animal interaction' | 'human interaction' | 'play' ;
  iconName: string;
}