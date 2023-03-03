<template>
  <div class="grid grid-cols-12 w-full" :class="rowClass">
    <AtomRowItem class="col-span-5">{{ transaction.reference }}</AtomRowItem>
    <AtomRowItem class="col-span-3">
      <AtomTag :color="categoryColor">
        {{ categoryName }}
      </AtomTag>
    </AtomRowItem>
    <AtomRowItem class="col-span-2">{{ transactionDate }}</AtomRowItem>
    <AtomRowItem class="col-span-2">{{ transaction.amount }}</AtomRowItem>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Transaction } from '~/logic/models/Transaction';
import AtomRowItem from '~/components/atoms/containers/AtomRowItem.vue';
import AtomTag from '~/components/atoms/AtomTag.vue';

@Component({
  components: { AtomTag, AtomRowItem },
})
export default class MoleculeTransactionRow extends Vue {
  @Prop({ type: Object, required: true })
  private declare readonly transaction: Transaction;
  @Prop({ type: Boolean, default: false })
  private declare readonly odd: boolean;
  @Prop({ type: Boolean, default: false })
  private declare readonly even: boolean;

  get isOdd(): boolean {
    return this.odd || !this.even;
  }

  get rowClass(): string {
    return this.isOdd ? 'bg-accent-2' : 'bg-light-gray';
  }

  get categoryColor(): string {
    return this.transaction.category?.color ?? '#b6b6b6';
  }

  get categoryName(): string {
    return this.transaction.category?.name ?? 'Uncategorized';
  }

  get transactionDate(): string {
    return this.transaction.date?.toFormat('dd/MM/yy') ?? 'N/A';
  }
}
</script>

<style scoped></style>
