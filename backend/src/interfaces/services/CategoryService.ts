import { ID, Nullable } from '@models/utils/UtilityTypes';
import { Category } from '@models/Category';

export interface CategoryService {
  findAll(params?: Nullable<{ ids: ID[] }>): Promise<Category[]>;
}
