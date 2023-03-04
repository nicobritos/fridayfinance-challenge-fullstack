<template>
  <AtomRoundedContainer class="flex flex-col">
    <AtomTitle>Transactions</AtomTitle>
    <MoleculeTransactionFilter class='mt-4' />
    <MoleculeTransactionTable :transactions='transactions?.data || null' class="mt-3" />
  </AtomRoundedContainer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AtomTitle from '~/components/atoms/AtomTitle.vue';
import AtomRoundedContainer from '~/components/atoms/containers/AtomRoundedContainer.vue';
import MoleculeTransactionFilter from '~/components/molecules/transaction/MoleculeTransactionFilter.vue';
import MoleculeTransactionTable from '~/components/molecules/transaction/MoleculeTransactionTable.vue';
import gql from 'graphql-tag';
import { Transaction } from '~/logic/models/Transaction'
import { Paginated } from '~/logic/models/utils/Paginated'
import { Nullable } from '~/logic/models/utils/UtilityTypes'

const GET_TRANSACTIONS = gql`
  query getTransactions {
    listTransactions(pagination: { first: 50, offset: 0, sort: { field: DATE, order: DESC }}) {
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
    MoleculeTransactionTable,
    MoleculeTransactionFilter,
    AtomRoundedContainer,
    AtomTitle,
  },
})
export default class OrganismTransactionList extends Vue {
  private transactions: Nullable<Paginated<Transaction>> = null;

  public async mounted() {
    this.transactions = (await this.$apollo
      .query({
        query: GET_TRANSACTIONS,
      })).data.listTransactions;
  }
}
</script>

<style scoped></style>
