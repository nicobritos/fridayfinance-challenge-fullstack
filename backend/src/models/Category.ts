import { BaseModel } from './utils/BaseModel';
import { Nullable } from './utils/UtilityTypes';

export interface Category extends BaseModel {
  readonly name: string;
  readonly color: Nullable<string>;
}
