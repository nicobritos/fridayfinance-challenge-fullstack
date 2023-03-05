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
    <FadeTransition>
      <MoleculeTransactionTable
        v-if="!isLoading"
        :transactions="transactions?.data || null"
        class="mt-3"
      />
      <AtomRoundedContainer
        v-else
        class="flex items-center justify-center h-full w-full"
      >
        <LoadingSpinner />
      </AtomRoundedContainer>
    </FadeTransition>
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
import { Nullable } from '~/logic/models/utils/UtilityTypes';
import MoleculePagination from '~/components/molecules/MoleculePagination.vue';
import AtomDivider from '~/components/atoms/AtomDivider.vue';
import { Account } from '~/logic/models/Account';
import EntityInterface from '~/logic/models/utils/EntityInterface';
import { DateTime } from 'luxon';
import { accountsStore, transactionsStore } from '~/store';
import FadeTransition from '~/components/animations/FadeTransition.vue';
import LoadingSpinner from '~/components/animations/LoadingSpinner.vue';
import { Paginated } from '~/logic/models/utils/Paginated';
import { Transaction } from '~/logic/models/Transaction';

@Component({
  components: {
    LoadingSpinner,
    FadeTransition,
    AtomDivider,
    MoleculePagination,
    MoleculeTransactionTable,
    MoleculeTransactionFilter,
    AtomRoundedContainer,
    AtomTitle,
  },
})
export default class OrganismTransactionList extends Vue {
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

  get transactions(): Nullable<Paginated<Transaction>> {
    return transactionsStore.transactions;
  }

  get isLoading(): boolean {
    return transactionsStore.isLoadingTransactions;
  }

  get accounts(): Account[] {
    return accountsStore.accounts;
  }

  get banks(): string[] {
    return accountsStore.banks;
  }

  get bankName(): Nullable<string> {
    return this.selectedBankId != null ? this.banks[this.selectedBankId] : null;
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

  public destroyed() {
    transactionsStore.setTransactions(null);
  }

  public onPageIndexChange(newIndex: number) {
    this.pageIndex = newIndex;
    transactionsStore.setPageIndex(this.pageIndex);
    this.fetchPage();
  }

  @Watch('search')
  @Watch('selectedAccountId')
  @Watch('selectedBankId')
  @Watch('fromDate')
  @Watch('toDate')
  public onFiltersChange() {
    this.pageIndex = 0;
    transactionsStore.setSearch(this.search);
    transactionsStore.setSelectedAccountId(this.selectedAccountId);
    transactionsStore.setBankName(this.bankName);
    transactionsStore.setDateFrom(this.fromDate);
    transactionsStore.setDateTo(this.toDate);
    transactionsStore.setPageIndex(this.pageIndex);
    this.fetchPage();
  }

  async fetchPage() {
    await transactionsStore.fetchTransactions();
  }

  async fetchAccounts() {
    await accountsStore.fetchAccounts();
  }
}
</script>

<style scoped></style>
