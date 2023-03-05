<template>
  <AtomRoundedContainer>
    <div class="flex items-center space-x-4">
      <i class="fas fa-building-columns text-base"></i>
      <div class="flex flex-col space-y-1">
        <div class="flex items-center space-x-1">
          <span class="font-bold">Account:</span>
          <span>{{ transaction.account.bank }}</span>
        </div>
        <div class="flex items-center space-x-1">
          <span class="font-bold">Bank:</span>
          <span>{{ transaction.account.bank }}</span>
        </div>
      </div>
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
  components: { AtomRoundedContainer },
})
export default class MoleculeTransactionBank extends Vue {
  @Prop({ type: Object, required: true })
  private declare readonly transaction: Transaction;
}
</script>

<style scoped></style>
