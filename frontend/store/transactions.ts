import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import gql from 'graphql-tag';
import { $apollo } from '~/plugins/ApolloClient';
import { ID, Nullable } from '~/logic/models/utils/UtilityTypes';
import { Paginated } from '~/logic/models/utils/Paginated';
import { Transaction } from '~/logic/models/Transaction';
import { DateTime } from 'luxon';
import { Category } from '~/logic/models/Category';

interface TransactionsState {
  transaction: Nullable<Transaction>;
  isLoadingTransaction: boolean;
  transactions: Nullable<Paginated<Transaction>>;
  isLoadingTransactions: boolean;
  search: Nullable<string>;
  pageIndex: number;
  pageSize: number;
  selectedAccountId: Nullable<ID>;
  bankName: Nullable<string>;
  dateFrom: Nullable<DateTime>;
  dateTo: Nullable<DateTime>;
}

const GET_TRANSACTIONS = gql`
  query getTransactions($pagination: TransactionPaginationOptionsInput!) {
    listTransactions(pagination: $pagination) {
      data {
        id
        date
        amount
        reference
        currency
        category {
          id
          name
          color
        }
      }
      pageInfo {
        hasNext
      }
    }
  }
`;

const GET_TRANSACTION = gql`
  query getTransaction($id: ID!) {
    getTransaction(id: $id) {
      id
      date
      amount
      reference
      currency
      category {
        id
        name
        color
      }
      account {
        id
        name
        bank
      }
    }
  }
`;

const SET_CATEGORY = gql`
  mutation setTransactionCategory($transaction: ID!, $category: ID) {
    setTransactionCategory(transaction: $transaction, category: $category) {
      id
    }
  }
`;

@Module({
  name: 'transactions',
  namespaced: true,
  stateFactory: true,
})
export default class Transactions
  extends VuexModule
  implements TransactionsState
{
  public transaction: Nullable<Transaction> = null;
  public isLoadingTransaction = false;
  public transactions: Nullable<Paginated<Transaction>> = null;
  public isLoadingTransactions = false;
  public isLoadingUpdateTransactionCategory = false;
  public search: Nullable<string> = null;
  public pageIndex = 0;
  public pageSize = 20;
  public selectedAccountId: Nullable<ID> = null;
  public bankName: Nullable<string> = null;
  public dateFrom: Nullable<DateTime> = null;
  public dateTo: Nullable<DateTime> = null;

  @Mutation
  public setTransaction(transaction: Nullable<Transaction>) {
    this.transaction = transaction;
  }

  @Mutation
  public setTransactions(transactions: Nullable<Paginated<Transaction>>) {
    this.transactions = transactions;
  }

  @Mutation
  public setLoadingTransaction(loading: boolean) {
    this.isLoadingTransaction = loading;
  }

  @Mutation
  public setLoadingTransactions(loading: boolean) {
    this.isLoadingTransactions = loading;
  }

  @Mutation
  public setLoadingUpdateTransactionCategory(loading: boolean) {
    this.isLoadingUpdateTransactionCategory = loading;
  }

  @Mutation
  public setSearch(search: Nullable<string>) {
    this.search = search;
  }

  @Mutation
  public setBankName(bankName: Nullable<string>) {
    this.bankName = bankName;
  }

  @Mutation
  public setSelectedAccountId(selectedAccountId: Nullable<ID>) {
    this.selectedAccountId = selectedAccountId;
  }

  @Mutation
  public setPageIndex(pageIndex: number) {
    this.pageIndex = pageIndex;
  }

  @Mutation
  public setDateFrom(dateFrom: Nullable<DateTime>) {
    this.dateFrom = dateFrom;
  }

  @Mutation
  public setDateTo(dateTo: Nullable<DateTime>) {
    this.dateTo = dateTo;
  }

  @Action
  public async fetchTransactions() {
    this.context.commit('setLoadingTransactions', true);
    const date =
      this.dateFrom != null || this.dateTo != null
        ? {
            from: this.dateFrom?.toISODate(),
            to: this.dateTo?.toISODate(),
          }
        : null;
    const transactions = (
      await $apollo.query({
        query: GET_TRANSACTIONS,
        variables: {
          pagination: {
            offset: this.pageIndex * 20,
            first: 20,
            filter: {
              search: this.search || undefined,
              bank: this.bankName || undefined,
              account: this.selectedAccountId || undefined,
              date: date || undefined,
            },
            sort: {
              field: 'DATE',
              order: 'DESC',
            },
          },
        },
      })
    ).data.listTransactions;
    this.context.commit('setTransactions', transactions);
    this.context.commit('setLoadingTransactions', false);
  }

  @Action
  public async fetchTransaction(id: ID) {
    this.context.commit('setLoadingTransaction', true);
    const transaction = (
      await $apollo.query({
        query: GET_TRANSACTION,
        variables: {
          id,
        },
        fetchPolicy: 'no-cache',
      })
    ).data.getTransaction;
    this.context.commit('setTransaction', transaction);
    this.context.commit('setLoadingTransaction', false);
  }

  @Action
  public async updateTransactionCategory(categoryId: Nullable<ID>) {
    this.context.commit('setLoadingUpdateTransactionCategory', true);
    await $apollo.mutate({
      mutation: SET_CATEGORY,
      variables: {
        transaction: this.transaction!.id,
        category: categoryId,
      },
    });
    this.context.commit('setLoadingUpdateTransactionCategory', false);
  }
}
