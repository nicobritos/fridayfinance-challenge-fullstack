<template>
  <AtomRoundedContainer class="flex flex-col h-full">
    <AtomTitle>Transactions</AtomTitle>
    <MoleculeTransactionFilter
      :selected-account-id.sync="selectedAccountId"
      :selected-bank-id.sync="selectedBankId"
      :to-date.sync="toDate"
      :from-date.sync="fromDate"
      :accounts="accountOptions"
      :banks="bankOptions"
      :search.sync="search"
      class="mt-4"
    />
    <MoleculeTransactionTable
      :transactions="transactions?.data || null"
      class="mt-3"
    />
    <AtomDivider horizontal />
    <MoleculePagination
      @update:page="onPageIndexChange"
      :page="pageIndex"
      :has-next="hasNext"
      :has-previous="hasPrevious"
      class="mt-3"
    />
  </AtomRoundedContainer>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import AtomTitle from '~/components/atoms/AtomTitle.vue';
import AtomRoundedContainer from '~/components/atoms/containers/AtomRoundedContainer.vue';
import MoleculeTransactionFilter from '~/components/molecules/transactionList/MoleculeTransactionFilter.vue';
import MoleculeTransactionTable from '~/components/molecules/transactionList/MoleculeTransactionTable.vue';
import gql from 'graphql-tag';
import { Transaction } from '~/logic/models/Transaction';
import { Paginated } from '~/logic/models/utils/Paginated';
import { Nullable } from '~/logic/models/utils/UtilityTypes';
import MoleculePagination from '~/components/molecules/MoleculePagination.vue';
import AtomDivider from '~/components/atoms/AtomDivider.vue';
import { Account } from '~/logic/models/Account';
import EntityInterface from '~/logic/models/utils/EntityInterface';
import { DateTime } from 'luxon';

const GET_ACCOUNTS = gql`
  query getAccounts {
    listAccounts {
      id
      name
      bank
    }
  }
`;

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

@Component({
  components: {
    AtomDivider,
    MoleculePagination,
    MoleculeTransactionTable,
    MoleculeTransactionFilter,
    AtomRoundedContainer,
    AtomTitle,
  },
})
export default class OrganismTransactionList extends Vue {
  private accounts: Account[] = [];
  private banks: string[] = [];
  private transactions: Nullable<Paginated<Transaction>> = null;
  private pageIndex: number = 0;
  private search: Nullable<string> = null;
  private selectedAccountId: Nullable<string> = null;
  private selectedBankId: Nullable<number> = null;
  private fromDate: Nullable<DateTime> = null;
  private toDate: Nullable<DateTime> = null;

  get hasNext(): boolean {
    return this.transactions?.pageInfo.hasNext ?? false;
  }

  get hasPrevious(): boolean {
    return this.pageIndex >= 1;
  }

  get accountOptions(): EntityInterface[] {
    return this.accounts.map((account) => ({
      name: account.name!,
      id: account.id!,
    }));
  }

  get bankOptions(): EntityInterface[] {
    return this.banks.map((bank, index) => ({
      name: bank!,
      id: index!,
    }));
  }

  public mounted() {
    this.fetchAccounts();
    this.fetchPage();
  }

  public onPageIndexChange(newIndex: number) {
    this.pageIndex = newIndex;
    this.fetchPage();
  }

  @Watch('search')
  @Watch('selectedAccountId')
  @Watch('selectedBankId')
  @Watch('fromDate')
  @Watch('toDate')
  public onFiltersChange() {
    this.pageIndex = 0;
    this.fetchPage();
  }

  async fetchPage() {
    const bankName =
      this.selectedBankId != null ? this.banks[this.selectedBankId] : null;

    const date =
      this.fromDate != null || this.toDate != null
        ? {
            from: this.fromDate?.toISODate(),
            to: this.toDate?.toISODate(),
          }
        : null;

    this.transactions = (
      await this.$apollo.query({
        query: GET_TRANSACTIONS,
        variables: {
          pagination: {
            offset: this.pageIndex * 20,
            first: 20,
            filter: {
              search: this.search || undefined,
              bank: bankName || undefined,
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
  }

  async fetchAccounts() {
    this.accounts = (
      await this.$apollo.query({
        query: GET_ACCOUNTS,
      })
    ).data.listAccounts;

    this.banks = this.accounts!.map((account) => account.bank).filter(
      (value, index, array) => value != null && array.indexOf(value) === index
    ) as string[];
  }
}
</script>

<style scoped></style>
