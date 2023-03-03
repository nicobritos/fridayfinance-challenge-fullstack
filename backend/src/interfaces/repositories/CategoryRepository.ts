import { ID, Nullable } from '@models/utils/UtilityTypes';
import { Category } from '@models/Category';

export interface CategoryRepository {
  findAll(): Promise<Category[]>;

  find(id: ID): Promise<Nullable<Category>>;
}
