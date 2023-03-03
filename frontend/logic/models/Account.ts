import { BaseModel } from './utils/BaseModel';

export interface Account extends BaseModel {
  readonly name?: string;
  readonly bank?: string;
}
