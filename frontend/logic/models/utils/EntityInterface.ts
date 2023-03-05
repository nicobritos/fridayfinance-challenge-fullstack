import { ID } from '~/logic/models/utils/UtilityTypes';

export default interface EntityInterface {
  readonly name: string;
  readonly id: ID | number;
}
