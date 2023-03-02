import { BaseModel } from './utils/BaseModel';
import { JSONSerializableKeys } from './utils/JSONSerializable';
import { Currency, ID } from './utils/UtilityTypes';
import { DateTime } from 'luxon';

export class Transaction extends BaseModel<Transaction> {
  public readonly accountId: ID;
  public readonly categoryId?: ID;
  public readonly reference?: string;
  public readonly amount: number;
  public readonly currency: Currency;
  public readonly date: DateTime;

  public constructor({
    id,
    accountId,
    categoryId,
    reference,
    amount,
    currency,
    date,
  }: {
    id: ID;
    accountId: ID;
    categoryId?: ID;
    reference?: string;
    amount: number;
    currency: Currency;
    date: DateTime;
  }) {
    super({ id });
    this.accountId = accountId;
    this.categoryId = categoryId;
    this.reference = reference;
    this.amount = amount;
    this.currency = currency;
    this.date = date;
  }

  public toJSON(): JSONSerializableKeys<Transaction> {
    return {
      id: this.id,
      accountId: this.accountId,
      categoryId: this.categoryId,
      reference: this.reference,
      amount: this.amount,
      currency: this.currency,
      date: this.date,
    };
  }
}
