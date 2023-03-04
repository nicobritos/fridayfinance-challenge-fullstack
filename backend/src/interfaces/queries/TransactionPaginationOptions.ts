import { SortOptions } from '@interfaces/queries/SortOptions';
import { ID } from '@models/utils/UtilityTypes';
import { DateRangeOptions } from '@interfaces/queries/FilterOptions';

export enum TransactionPaginationSortField {
  DATE = 'DATE',
  AMOUNT = 'AMOUNT',
  CATEGORY = 'CATEGORY',
  REFERENCE = 'REFERENCE',
}

export interface TransactionPaginationSort {
  readonly field: TransactionPaginationSortField;
  readonly order: SortOptions;
}

export interface TransactionPaginationFilter {
  readonly account?: ID;
  readonly bank?: string;
  readonly date?: DateRangeOptions;
  readonly search?: string;
}

export interface TransactionPaginationOptions {
  readonly first: number;
  readonly offset?: number;
  readonly filter?: TransactionPaginationFilter;
  readonly sort: TransactionPaginationSort;
}
