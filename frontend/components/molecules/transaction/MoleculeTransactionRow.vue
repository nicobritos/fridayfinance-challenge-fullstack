<template>
  <tr class="hover:bg-light-gray cursor-pointer transition-colors duration-300">
    <AtomRowItem>{{ transaction.reference }}</AtomRowItem>
    <AtomRowItem>
      <AtomTag :color="categoryColor">
        {{ categoryName }}
      </AtomTag>
    </AtomRowItem>
    <AtomRowItem>{{ transactionDate }}</AtomRowItem>
    <AtomRowItem>{{ transaction.amount }}</AtomRowItem>
  </tr>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Transaction } from '~/logic/models/Transaction';
import AtomRowItem from '~/components/atoms/containers/AtomRowItem.vue';
import AtomTag from '~/components/atoms/AtomTag.vue';
import { DateTime } from 'luxon'

@Component({
  components: { AtomTag, AtomRowItem },
})
export default class MoleculeTransactionRow extends Vue {
  @Prop({ type: Object, required: true })
  private declare readonly transaction: Transaction;

  get categoryColor(): string {
    return `#${this.transaction.category?.color ?? "b6b6b6"}`;
  }

  get categoryName(): string {
    return this.transaction.category?.name ?? 'Uncategorized';
  }

  get transactionDate(): string {
    if (!this.transaction.date) return 'N/A';
    return DateTime.fromISO(this.transaction.date).toFormat('dd/MM/yy');
  }
}
</script>

<style scoped></style>
