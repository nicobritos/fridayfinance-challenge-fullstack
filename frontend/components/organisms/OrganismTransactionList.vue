<template>
  <AtomRoundedContainer class="flex flex-col h-full">
    <AtomTitle>Transactions</AtomTitle>
    <MoleculeTransactionFilter :search.sync="search" class="mt-4" />
    <MoleculeTransactionTable
      :transactions="transactions?.data || null"
      class="mt-3"
    />
    <AtomDivider horizontal />
    <MoleculePagination
      :page.sync="pageIndex"
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
import MoleculeTransactionFilter from '~/components/molecules/transaction/MoleculeTransactionFilter.vue';
import MoleculeTransactionTable from '~/components/molecules/transaction/MoleculeTransactionTable.vue';
import gql from 'graphql-tag';
import { Transaction } from '~/logic/models/Transaction';
import { Paginated } from '~/logic/models/utils/Paginated';
import { Nullable } from '~/logic/models/utils/UtilityTypes';
import MoleculePagination from '~/components/molecules/MoleculePagination.vue';
import AtomDivider from '~/components/atoms/AtomDivider.vue';

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
  private transactions: Nullable<Paginated<Transaction>> = null;
  private pageIndex: number = 0;
  private search: Nullable<string> = null;

  get hasNext(): boolean {
    return this.transactions?.pageInfo.hasNext ?? false;
  }

  get hasPrevious(): boolean {
    return this.pageIndex >= 1;
  }

  public mounted() {
    this.fetchPage();
  }

  @Watch('pageIndex')
  @Watch('search')
  async fetchPage() {
    this.transactions = (
      await this.$apollo.query({
        query: GET_TRANSACTIONS,
        variables: {
          pagination: {
            offset: this.pageIndex * 20,
            first: 20,
            filter: {
              search: this.search || undefined,
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
}
</script>

<style scoped></style>
