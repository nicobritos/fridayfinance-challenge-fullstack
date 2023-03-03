import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  ISODate: any;
};

export type Account = Node & {
  __typename?: 'Account';
  bank: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Category = Node & {
  __typename?: 'Category';
  color?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type DateRangeInput = {
  from?: InputMaybe<Scalars['ISODate']>;
  to?: InputMaybe<Scalars['ISODate']>;
};

export type Node = {
  id: Scalars['ID'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  hasNext: Scalars['Boolean'];
};

export type Pagination = {
  data: Array<Node>;
  pageInfo: PageInfo;
};

export type Query = {
  __typename?: 'Query';
  listAccounts: Array<Account>;
  listCategories: Array<Category>;
  listTransactions: TransactionPage;
};


export type QueryListTransactionsArgs = {
  pagination: TransactionPaginationOptionsInput;
};

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Transaction = Node & {
  __typename?: 'Transaction';
  account: Account;
  amount: Scalars['Float'];
  category?: Maybe<Category>;
  currency: Scalars['String'];
  date: Scalars['ISODate'];
  id: Scalars['ID'];
  reference?: Maybe<Scalars['String']>;
};

export type TransactionPage = Pagination & {
  __typename?: 'TransactionPage';
  data: Array<Transaction>;
  pageInfo: PageInfo;
};

export type TransactionPaginationFilterInput = {
  account?: InputMaybe<Scalars['ID']>;
  category?: InputMaybe<Scalars['ID']>;
  date?: InputMaybe<DateRangeInput>;
  search?: InputMaybe<Scalars['String']>;
};

export type TransactionPaginationOptionsInput = {
  filter?: InputMaybe<TransactionPaginationFilterInput>;
  first: Scalars['Int'];
  offset?: InputMaybe<Scalars['Int']>;
  sort: TransactionPaginationSortInput;
};

export enum TransactionPaginationSortField {
  Amount = 'AMOUNT',
  Category = 'CATEGORY',
  Date = 'DATE',
  Reference = 'REFERENCE'
}

export type TransactionPaginationSortInput = {
  field: TransactionPaginationSortField;
  order: SortOrder;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Account: ResolverTypeWrapper<Account>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Category: ResolverTypeWrapper<Category>;
  DateRangeInput: DateRangeInput;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  ISODate: ResolverTypeWrapper<Scalars['ISODate']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Node: ResolversTypes['Account'] | ResolversTypes['Category'] | ResolversTypes['Transaction'];
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Pagination: ResolversTypes['TransactionPage'];
  Query: ResolverTypeWrapper<{}>;
  SortOrder: SortOrder;
  String: ResolverTypeWrapper<Scalars['String']>;
  Transaction: ResolverTypeWrapper<Transaction>;
  TransactionPage: ResolverTypeWrapper<TransactionPage>;
  TransactionPaginationFilterInput: TransactionPaginationFilterInput;
  TransactionPaginationOptionsInput: TransactionPaginationOptionsInput;
  TransactionPaginationSortField: TransactionPaginationSortField;
  TransactionPaginationSortInput: TransactionPaginationSortInput;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Account: Account;
  Boolean: Scalars['Boolean'];
  Category: Category;
  DateRangeInput: DateRangeInput;
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  ISODate: Scalars['ISODate'];
  Int: Scalars['Int'];
  Node: ResolversParentTypes['Account'] | ResolversParentTypes['Category'] | ResolversParentTypes['Transaction'];
  PageInfo: PageInfo;
  Pagination: ResolversParentTypes['TransactionPage'];
  Query: {};
  String: Scalars['String'];
  Transaction: Transaction;
  TransactionPage: TransactionPage;
  TransactionPaginationFilterInput: TransactionPaginationFilterInput;
  TransactionPaginationOptionsInput: TransactionPaginationOptionsInput;
  TransactionPaginationSortInput: TransactionPaginationSortInput;
}>;

export type AccountResolvers<ContextType = any, ParentType extends ResolversParentTypes['Account'] = ResolversParentTypes['Account']> = ResolversObject<{
  bank?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = ResolversObject<{
  color?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface IsoDateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ISODate'], any> {
  name: 'ISODate';
}

export type NodeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Account' | 'Category' | 'Transaction', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
}>;

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = ResolversObject<{
  hasNext?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PaginationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Pagination'] = ResolversParentTypes['Pagination']> = ResolversObject<{
  __resolveType: TypeResolveFn<'TransactionPage', ParentType, ContextType>;
  data?: Resolver<Array<ResolversTypes['Node']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  listAccounts?: Resolver<Array<ResolversTypes['Account']>, ParentType, ContextType>;
  listCategories?: Resolver<Array<ResolversTypes['Category']>, ParentType, ContextType>;
  listTransactions?: Resolver<ResolversTypes['TransactionPage'], ParentType, ContextType, RequireFields<QueryListTransactionsArgs, 'pagination'>>;
}>;

export type TransactionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Transaction'] = ResolversParentTypes['Transaction']> = ResolversObject<{
  account?: Resolver<ResolversTypes['Account'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  category?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType>;
  currency?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['ISODate'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  reference?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TransactionPageResolvers<ContextType = any, ParentType extends ResolversParentTypes['TransactionPage'] = ResolversParentTypes['TransactionPage']> = ResolversObject<{
  data?: Resolver<Array<ResolversTypes['Transaction']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Account?: AccountResolvers<ContextType>;
  Category?: CategoryResolvers<ContextType>;
  ISODate?: GraphQLScalarType;
  Node?: NodeResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  Pagination?: PaginationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Transaction?: TransactionResolvers<ContextType>;
  TransactionPage?: TransactionPageResolvers<ContextType>;
}>;

