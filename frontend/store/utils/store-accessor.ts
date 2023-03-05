/* eslint-disable import/no-mutable-exports */

import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';
import Categories from '~/store/categories';
import Accounts from '~/store/accounts';
import Transactions from '~/store/transactions';

let accountsStore: Accounts;
let categoriesStore: Categories;
let transactionsStore: Transactions;

function initialiseStores(store: Store<any>): void {
  accountsStore = getModule(Accounts, store);
  categoriesStore = getModule(Categories, store);
  transactionsStore = getModule(Transactions, store);
}

export { initialiseStores, accountsStore, categoriesStore, transactionsStore };
