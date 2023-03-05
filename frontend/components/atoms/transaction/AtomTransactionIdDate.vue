<template>
  <div class="flex items-center justify-around">
    <span class="text-gray-500"> Transaction ID: {{ transaction.id }} </span>
    <span class="font-bold">-</span>
    <span>Created at {{ transactionDate }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Transaction } from '~/logic/models/Transaction';
import { DateTime } from 'luxon';

@Component
export default class AtomTransactionIdDate extends Vue {
  @Prop({ type: Object, required: true })
  private declare readonly transaction: Transaction;

  get transactionDate(): string {
    return DateTime.fromISO(this.transaction.date!).toLocaleString(
      DateTime.DATETIME_FULL
    );
  }
}
</script>

<style scoped></style>
