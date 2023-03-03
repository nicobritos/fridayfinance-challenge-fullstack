import { BaseModel } from './utils/BaseModel';
import { Currency } from './utils/UtilityTypes';
import { DateTime } from 'luxon';
import { Category } from '~/logic/models/Category';
import { Account } from '~/logic/models/Account';

export interface Transaction extends BaseModel {
  readonly account?: Account;
  readonly category?: Category;
  readonly reference?: string;
  readonly amount?: number;
  readonly currency?: Currency;
  readonly date?: DateTime;
}
