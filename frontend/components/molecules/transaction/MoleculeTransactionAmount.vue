<template>
  <AtomRoundedContainer>
    <div class="flex items-center space-x-4 text-base font-bold">
      <i class="fas fa-dollar-sign"></i>
      <span>Transaction amount</span>
      <div class="flex-grow"></div>
      <div class="flex items-center space-x-2">
        <span>$ {{ transactionAmount }}</span>
        <span class="text-gray-500">{{ transaction.currency }}</span>
      </div>
    </div>
  </AtomRoundedContainer>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import AtomRoundedContainer from '~/components/atoms/containers/AtomRoundedContainer.vue';
import { Transaction } from '~/logic/models/Transaction';

@Component({
  components: { AtomRoundedContainer },
})
export default class MoleculeTransactionAmount extends Vue {
  @Prop({ type: Object, required: true })
  private declare readonly transaction: Transaction;

  get transactionAmount(): string {
    return this.transaction.amount!.toFixed(2);
  }
}
</script>

<style scoped></style>
