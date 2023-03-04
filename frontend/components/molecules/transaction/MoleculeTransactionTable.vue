<template>
  <div class="flex items-end space-x-4">
    <AtomTable v-if='!!transactions' >
      <template #header>
        <MoleculeTransactionHeader />
      </template>

      <MoleculeTransactionRow v-for='item in transactions' :transaction="item" :key='item.id' />
    </AtomTable>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import AtomTable from '~/components/atoms/containers/AtomTable.vue';
import { Transaction } from '~/logic/models/Transaction';
import MoleculeTransactionRow from '~/components/molecules/transaction/MoleculeTransactionRow.vue';
import MoleculeTransactionHeader from '~/components/molecules/transaction/MoleculeTransactionHeader.vue';
import { Nullable } from '~/logic/models/utils/UtilityTypes'

@Component({
  components: { MoleculeTransactionHeader, MoleculeTransactionRow, AtomTable },
})
export default class MoleculeTransactionTable extends Vue {
  @Prop({ required: true })
  private declare readonly transactions: Nullable<Transaction[]>
}
</script>

<style scoped></style>
