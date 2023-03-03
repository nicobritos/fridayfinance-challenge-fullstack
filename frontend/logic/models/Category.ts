import { BaseModel } from './utils/BaseModel';

export interface Category extends BaseModel {
  readonly name?: string;
  readonly color?: string;
}
