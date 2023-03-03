import { BaseModel } from '@models/utils/BaseModel';

export interface Account extends BaseModel {
  readonly name: string;
  readonly bank: string;
}
