<template>
  <div class="flex justify-center h-full">
    <FadeTransition>
      <OrganismTransaction
        v-if="!isLoading"
        :transaction="transaction"
        class="flex flex-col h-full w-3/4 text-xs max-h-full"
      />
      <AtomRoundedContainer
        v-else
        class="flex items-center justify-center h-full w-3/4"
      >
        <LoadingSpinner />
      </AtomRoundedContainer>
    </FadeTransition>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import gql from 'graphql-tag';
import { Nullable } from '~/logic/models/utils/UtilityTypes';
import { Transaction } from '~/logic/models/Transaction';
import AtomRoundedContainer from '~/components/atoms/containers/AtomRoundedContainer.vue';
import AtomTitle from '~/components/atoms/AtomTitle.vue';
import OrganismTransaction from '~/components/organisms/OrganismTransaction.vue';
import LoadingSpinner from '~/components/animations/LoadingSpinner.vue';
import FadeTransition from '~/components/animations/FadeTransition.vue';

// TODO: Account in store
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

@Component({
  components: {
    FadeTransition,
    LoadingSpinner,
    OrganismTransaction,
    AtomTitle,
    AtomRoundedContainer,
  },
})
export default class TransactionPage extends Vue {
  private transaction: Nullable<Transaction> = null;
  private showTransaction: boolean = false;

  get transactionId() {
    return this.$route.params.id;
  }

  get isLoading() {
    return this.transaction == null || !this.showTransaction;
  }

  public created() {
    setTimeout(() => {
      this.showTransaction = true;
    }, 500);
  }

  public mounted() {
    this.fetchTransaction();
  }

  async fetchTransaction() {
    this.transaction = (
      await this.$apollo.query({
        query: GET_TRANSACTION,
        variables: {
          id: this.transactionId,
        },
      })
    ).data.getTransaction;
  }
}
</script>
