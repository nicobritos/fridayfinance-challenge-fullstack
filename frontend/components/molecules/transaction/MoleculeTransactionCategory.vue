<template>
  <AtomRoundedContainer>
    <div class="flex items-center space-x-4">
      <i class="fas fa-table-cells-large text-base"></i>
      <span class="font-bold">Category:</span>
      <AtomTag
        :color="categoryColor"
        class="select-none cursor-pointer"
        @click="openCategoryModal"
      >
        {{ categoryName }}
      </AtomTag>
    </div>
  </AtomRoundedContainer>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import AtomTitle from '~/components/atoms/AtomTitle.vue';
import AtomRoundedContainer from '~/components/atoms/containers/AtomRoundedContainer.vue';
import MoleculeTransactionFilter from '~/components/molecules/transactionList/MoleculeTransactionFilter.vue';
import MoleculeTransactionTable from '~/components/molecules/transactionList/MoleculeTransactionTable.vue';
import MoleculePagination from '~/components/molecules/MoleculePagination.vue';
import AtomDivider from '~/components/atoms/AtomDivider.vue';
import { Transaction } from '~/logic/models/Transaction';
import { DateTime } from 'luxon';
import AtomTag from '~/components/atoms/AtomTag.vue';
import MoleculeConfirmCancelButtons from '~/components/molecules/MoleculeConfirmCancelButtons.vue';
import AtomButton from '~/components/atoms/button/AtomButton.vue';
import AtomElevatedButton from '~/components/atoms/button/AtomElevatedButton.vue';
import MoleculeBackButtonTransactions from '~/components/molecules/transaction/MoleculeBackButtonTransactions.vue';

@Component({
  components: { AtomRoundedContainer, AtomTag },
})
export default class MoleculeTransactionCategory extends Vue {
  @Prop({ type: Object, required: true })
  private declare readonly transaction: Transaction;

  get categoryColor(): string {
    return `#${this.transaction.category?.color ?? 'b6b6b6'}`;
  }

  get categoryName(): string {
    return this.transaction.category?.name ?? 'Uncategorized';
  }
}
</script>

<style scoped></style>
