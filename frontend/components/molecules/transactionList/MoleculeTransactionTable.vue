<template>
  <AtomTable v-if="!!transactions">
    <template #header>
      <MoleculeTransactionHeader />
    </template>

    <MoleculeTransactionRow
      v-for="item in transactions"
      :transaction="item"
      :key="item.id"
    />
  </AtomTable>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import AtomTable from '~/components/atoms/containers/AtomTable.vue';
import { Transaction } from '~/logic/models/Transaction';
import MoleculeTransactionRow from '~/components/molecules/transactionList/MoleculeTransactionRow.vue';
import MoleculeTransactionHeader from '~/components/molecules/transactionList/MoleculeTransactionHeader.vue';
import { Nullable } from '~/logic/models/utils/UtilityTypes';

@Component({
  components: { MoleculeTransactionHeader, MoleculeTransactionRow, AtomTable },
})
export default class MoleculeTransactionTable extends Vue {
  @Prop({ required: true })
  private declare readonly transactions: Nullable<Transaction[]>;
}
</script>

<style scoped></style>
