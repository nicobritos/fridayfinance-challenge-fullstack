import { BaseModel } from './utils/BaseModel';
import { Currency, ID, Nullable } from './utils/UtilityTypes';
import { DateTime } from 'luxon';

export interface Transaction extends BaseModel {
  readonly accountId: ID;
  readonly categoryId: Nullable<ID>;
  readonly reference: Nullable<string>;
  readonly amount: number;
  readonly currency: Currency;
  readonly date: DateTime;
}
