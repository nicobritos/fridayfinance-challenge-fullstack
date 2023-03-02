import { BaseModel } from './utils/BaseModel';
import { JSONSerializableKeys } from './utils/JSONSerializable';
import { ID } from './utils/UtilityTypes';

export class Account extends BaseModel<Account> {
  public readonly name: string;
  public readonly bank: string;

  public constructor({
    id,
    name,
    bank,
  }: {
    id: ID;
    name: string;
    bank: string;
  }) {
    super({ id });
    this.name = name;
    this.bank = bank;
  }

  public toJSON(): JSONSerializableKeys<Account> {
    return {
      id: this.id,
      name: this.name,
      bank: this.bank,
    };
  }
}
