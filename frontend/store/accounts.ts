import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import gql from 'graphql-tag';
import { $apollo } from '~/plugins/ApolloClient';
import { Account } from '~/logic/models/Account';

interface AccountsState {
  accounts: Account[];
  isLoading: boolean;
}

const GET_ACCOUNTS = gql`
  query getAccounts {
    listAccounts {
      id
      name
      bank
    }
  }
`;

@Module({
  name: 'accounts',
  namespaced: true,
  stateFactory: true,
})
export default class Accounts extends VuexModule implements AccountsState {
  public accounts: Account[] = [];
  public isLoading = false;

  get banks(): string[] {
    return this.accounts
      .map((account) => account.bank)
      .filter(
        (value, index, self) => value != null && self.indexOf(value) === index
      ) as string[];
  }

  @Mutation
  public setAccounts(accounts: Account[]) {
    this.accounts = accounts;
  }

  @Mutation
  public setLoading(loading: boolean) {
    this.isLoading = loading;
  }

  @Action
  public async fetchAccounts() {
    this.context.commit('setLoading', true);
    const accounts = (
      await $apollo.query({
        query: GET_ACCOUNTS,
      })
    ).data.listAccounts;
    this.context.commit('setAccounts', accounts);
    this.context.commit('setLoading', false);
  }
}
