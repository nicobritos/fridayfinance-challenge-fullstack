<template>
  <AtomRoundedContainer background-color="bg-transparent" class="space-y-4">
    <AtomTitle>Transaction</AtomTitle>
    <div class="flex">
      <MoleculeBackButtonTransactions />
    </div>
    <AtomTransactionIdDate :transaction="transaction" />
    <MoleculeTransactionAmount :transaction="transaction" />
    <MoleculeTransactionReference :transaction="transaction" />
    <MoleculeTransactionCategory :transaction="transaction" />
    <MoleculeConfirmCancelButtons />
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
import AtomTag from '~/components/atoms/AtomTag.vue';
import MoleculeConfirmCancelButtons from '~/components/molecules/MoleculeConfirmCancelButtons.vue';
import AtomButton from '~/components/atoms/button/AtomButton.vue';
import AtomElevatedButton from '~/components/atoms/button/AtomElevatedButton.vue';
import MoleculeBackButtonTransactions from '~/components/molecules/transaction/MoleculeBackButtonTransactions.vue';
import MoleculeTransactionAmount from '~/components/molecules/transaction/MoleculeTransactionAmount.vue';
import MoleculeTransactionReference from '~/components/molecules/transaction/MoleculeTransactionReference.vue';
import MoleculeTransactionCategory from '~/components/molecules/transaction/MoleculeTransactionCategory.vue';
import AtomTransactionIdDate from '~/components/atoms/transaction/AtomTransactionIdDate.vue';

@Component({
  components: {
    AtomTransactionIdDate,
    MoleculeTransactionCategory,
    MoleculeTransactionReference,
    MoleculeTransactionAmount,
    MoleculeBackButtonTransactions,
    AtomElevatedButton,
    AtomButton,
    MoleculeConfirmCancelButtons,
    AtomTag,
    AtomDivider,
    MoleculePagination,
    MoleculeTransactionTable,
    MoleculeTransactionFilter,
    AtomRoundedContainer,
    AtomTitle,
  },
})
export default class OrganismTransaction extends Vue {
  @Prop({ type: Object, required: true })
  private declare readonly transaction: Transaction;
}
</script>

<style scoped></style>
