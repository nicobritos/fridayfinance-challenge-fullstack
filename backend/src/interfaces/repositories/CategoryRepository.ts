import { ID, Nullable } from '@models/utils/UtilityTypes';
import { Category } from '@models/Category';

export interface CategoryRepository {
  findAll(params?: Nullable<{ ids: ID[] }>): Promise<Category[]>;
}
