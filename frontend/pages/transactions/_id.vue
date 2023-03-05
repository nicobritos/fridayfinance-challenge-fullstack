<template>
  <div class="flex justify-center h-full">
    <FadeTransition>
      <OrganismTransaction
        v-if="!isLoading && !!transaction"
        :transaction="transaction"
        :categories="categories"
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
import { Nullable } from '~/logic/models/utils/UtilityTypes';
import { Transaction } from '~/logic/models/Transaction';
import AtomRoundedContainer from '~/components/atoms/containers/AtomRoundedContainer.vue';
import AtomTitle from '~/components/atoms/AtomTitle.vue';
import OrganismTransaction from '~/components/organisms/OrganismTransaction.vue';
import LoadingSpinner from '~/components/animations/LoadingSpinner.vue';
import FadeTransition from '~/components/animations/FadeTransition.vue';
import { Category } from '~/logic/models/Category';
import { categoriesStore, transactionsStore } from '~/store';

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
  get transaction(): Nullable<Transaction> {
    return transactionsStore.transaction;
  }

  get transactionLoading(): boolean {
    return transactionsStore.isLoadingTransaction;
  }

  get categories(): Category[] {
    return categoriesStore.categories;
  }

  get categoriesLoading(): boolean {
    return categoriesStore.isLoading;
  }

  get transactionId() {
    return this.$route.params.id;
  }

  get isLoading() {
    return this.transactionLoading || this.categoriesLoading;
  }

  public mounted() {
    this.fetchTransaction();
    this.fetchCategories();
  }

  public destroyed() {
    transactionsStore.setTransaction(null);
  }

  async fetchTransaction() {
    await transactionsStore.fetchTransaction(this.transactionId);
  }

  async fetchCategories() {
    await categoriesStore.fetchCategories();
  }
}
</script>
