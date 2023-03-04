<template>
  <tr class="hover:bg-light-gray cursor-pointer transition-colors duration-300">
    <AtomRowItem class='pl-2' :class='referenceTextClass'>{{ transactionReference }}</AtomRowItem>
    <AtomRowItem>
      <AtomTag :color="categoryColor">
        {{ categoryName }}
      </AtomTag>
    </AtomRowItem>
    <AtomRowItem>{{ transactionDate }}</AtomRowItem>
    <AtomRowItem class='pr-2' target-class='justify-end'>
      <span>{{ transaction.amount.toFixed(2) }}</span>
      <span class="ml-2 uppercase font-medium text-gray-400">{{ transaction.currency }}</span>
    </AtomRowItem>
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

  get hasReference(): boolean {
    return !!this.transaction.reference;
  }

  get transactionReference(): string {
    return this.hasReference ? this.transaction.reference! : 'Reference not provided';
  }

  get referenceTextClass(): string {
    return this.hasReference ? '' : 'text-gray-400';
  }

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
