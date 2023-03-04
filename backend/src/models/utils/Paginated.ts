export interface Paginated<T> {
  readonly data: T[];
  readonly pageInfo: {
    readonly hasNext: boolean;
  };
}
