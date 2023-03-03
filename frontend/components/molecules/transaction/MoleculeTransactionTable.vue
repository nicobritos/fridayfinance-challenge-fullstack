<template>
  <div class="flex items-end space-x-4">
    <AtomTable :items="transactions">
      <template #header>
        <MoleculeTransactionHeader />
      </template>

      <template #odd="{ item, index }">
        <MoleculeTransactionRow :transaction="item" odd />
      </template>

      <template #even="{ item, index }">
        <MoleculeTransactionRow :transaction="item" even />
      </template>
    </AtomTable>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AtomTable from '~/components/atoms/containers/AtomTable.vue';
import { Transaction } from '~/logic/models/Transaction';
import { DateTime } from 'luxon';
import { Category } from '~/logic/models/Category';
import MoleculeTransactionRow from '~/components/molecules/transaction/MoleculeTransactionRow.vue';
import MoleculeTransactionHeader from '~/components/molecules/transaction/MoleculeTransactionHeader.vue';

@Component({
  components: { MoleculeTransactionHeader, MoleculeTransactionRow, AtomTable },
})
export default class MoleculeTransactionTable extends Vue {
  get transactions(): Transaction[] {
    return [
      {
        id: '1',
        category: {
          id: '1',
          color: '#7048a3',
        },
        reference: 'Reference',
        amount: 1,
        date: DateTime.now(),
        currency: 'GBP',
      },
      {
        id: '2',
        reference: 'Reference',
        amount: 1,
        date: DateTime.now(),
        currency: 'GBP',
      },
      {
        id: '3',
        amount: 1,
        date: DateTime.now(),
        currency: 'GBP',
      },
      {
        id: '3',
        amount: 1,
        date: DateTime.now(),
        currency: 'GBP',
      },
      {
        id: '3',
        amount: 1,
        date: DateTime.now(),
        currency: 'GBP',
      },
    ];
  }

  public categoryColor(category?: Category) {
    return category?.color ?? '#b6b6b6';
  }
}
</script>

<style scoped></style>
