import { BaseModel } from './utils/BaseModel';
import { Currency, ISODate, Nullable } from './utils/UtilityTypes';
// import { DateTime } from 'luxon';
import { Category } from '~/logic/models/Category';
import { Account } from '~/logic/models/Account';

export interface Transaction extends BaseModel {
  readonly account?: Account;
  readonly category?: Nullable<Category>;
  readonly reference?: Nullable<string>;
  readonly amount?: number;
  readonly currency?: Currency;
  readonly date?: ISODate;
}
