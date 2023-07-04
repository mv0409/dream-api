import { Dream } from './dream.entity';

export enum DREAM_TYPE {
  HAPPY = 'happy',
  SAD = 'sad',
  EXCITING = 'exciting',
  SCARY = 'scary'
}

export type IDream = Omit<Dream, 'id'>;

export interface IMockDream {
  title?: string;
  description?: string;
  date?: Date;
  type?: DREAM_TYPE;
}

export interface IMockDreamRequest{
  title?: string;
  startDate?: string;
  endDate?: string;
  type?: string;
}