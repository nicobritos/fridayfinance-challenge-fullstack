<template>
  <AtomRoundedContainer background-color="bg-transparent" class="space-y-4">
    <AtomTitle>Transaction</AtomTitle>
    <div class="flex">
      <MoleculeBackButtonTransactions />
    </div>
    <AtomTransactionIdDate :transaction="transaction" />
    <MoleculeTransactionAmount :transaction="transaction" />
    <MoleculeTransactionReference :transaction="transaction" />
    <MoleculeTransactionCategory
      :transaction="transaction"
      :categories="categories"
      :new-category.sync="newCategory"
      :unselect-category.sync="unselectCategory"
    />
    <MoleculeConfirmCancelButtons
      :disable-cancel="disableButtons"
      :disable-confirm="disableButtons"
      @on-cancel="resetCategory"
      @on-confirm="confirm"
    />
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
import { Category } from '~/logic/models/Category';
import { Nullable } from '~/logic/models/utils/UtilityTypes';
import gql from 'graphql-tag';

const SET_CATEGORY = gql`
  mutation setTransactionCategory($transaction: ID!, $category: ID) {
    setTransactionCategory(transaction: $transaction, category: $category) {
      id
    }
  }
`;

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
  @Prop({ type: Array, required: true })
  private declare readonly categories: Category[];

  private newCategory: Nullable<Category> = null;
  private unselectCategory: boolean = false;
  private loading: boolean = false;

  get disableButtons(): boolean {
    return !this.hasChangedCategory || this.loading;
  }

  get hasChangedCategory(): boolean {
    return (
      (this.newCategory &&
        this.newCategory?.id !== this.transaction.category?.id) ||
      this.unselectCategory
    );
  }

  public resetCategory(): void {
    this.newCategory = null;
    this.unselectCategory = false;
  }

  public async confirm(): Promise<void> {
    if (this.hasChangedCategory) {
      this.loading = true;
      await this.$apollo.mutate({
        mutation: SET_CATEGORY,
        variables: {
          transaction: this.transaction.id,
          category: this.newCategory?.id,
        },
      });
      setTimeout(() => {
        this.loading = false;
      }, 200);
    }
  }
}
</script>

<style scoped></style>
