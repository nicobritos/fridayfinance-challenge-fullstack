<template>
  <div class="flex items-end space-x-4">
    <AtomTextInput
      title="Search"
      :value.sync="searchSync"
      :debounce="200"
      placeholder="Search by reference, date, amount, currency..."
      target-class="w-full"
      class="flex-grow flex-shrink-0"
    />
    <AtomDropdown
      title="Bank"
      :options="banks"
      :selected-option-id.sync="selectedBankIdSync"
      placeholder="No filter applied"
      target-class="w-full"
      class="flex-grow-0 flex-shrink max-w-8"
    />
    <AtomDropdown
      title="Account"
      :options="accounts"
      :selected-option-id.sync="selectedAccountIdSync"
      placeholder="No filter applied"
      target-class="w-full"
      class="flex-grow-0 flex-shrink max-w-8"
    />
    <MoleculeDateInput
      title="From"
      :value="fromDateString"
      :debounce="200"
      @update:value="onUpdateFromDate"
      target-class="w-full"
      class="flex-grow-0 flex-shrink max-w-8"
    />
    <MoleculeDateInput
      title="To"
      :value.sync="toDateString"
      :debounce="200"
      @update:value="onUpdateToDate"
      target-class="w-full"
      class="flex-grow-0 flex-shrink max-w-8"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue, Watch } from 'vue-property-decorator';
import AtomTextInput from '~/components/atoms/inputs/AtomTextInput.vue';
import AtomInput from '~/components/atoms/inputs/AtomInput.vue';
import AtomDropdown from '~/components/atoms/inputs/AtomDropdown.vue';
import { ID, Nullable } from '~/logic/models/utils/UtilityTypes';
import { DateTime } from 'luxon';
import MoleculeDateInput from '~/components/molecules/MoleculeDateInput.vue';
import { accountsStore, transactionsStore } from '~/store';
import { Account } from '~/logic/models/Account';

@Component({
  components: { MoleculeDateInput, AtomDropdown, AtomInput, AtomTextInput },
})
export default class MoleculeTransactionFilter extends Vue {
  @PropSync('search', { required: true })
  private declare searchSync: Nullable<string>;
  @PropSync('fromDate', { required: true })
  private declare fromDateSync: Nullable<DateTime>;
  @PropSync('toDate', { required: true })
  private declare toDateSync: Nullable<DateTime>;
  @PropSync('selectedBankId', { required: true })
  private declare selectedBankIdSync: Nullable<number>;
  @PropSync('selectedAccountId', { required: true })
  private declare selectedAccountIdSync: Nullable<string>;
  @Prop({ type: Array, required: true })
  private declare readonly accounts: Account[];
  @Prop({ type: Array, required: true })
  private declare readonly banks: string[];

  private toDateString: Nullable<string> = null;
  private fromDateString: Nullable<string> = null;

  public created(): void {
    this.updateToDateString();
    this.updateFromDateString();
  }

  @Watch('toDateSync')
  public updateToDateString() {
    this.toDateString = this.toDateSync?.toFormat('yyyy-MM') || null;
  }

  @Watch('fromDateSync')
  public updateFromDateString() {
    this.fromDateString = this.fromDateSync?.toFormat('yyyy-MM') || null;
  }

  public onUpdateToDate(newDate: string) {
    this.toDateString = newDate;
    this.updateToDate();
  }

  public onUpdateFromDate(newDate: string) {
    this.fromDateString = newDate;
    this.updateFromDate();
  }

  public updateToDate() {
    const newDate = this.toDateString
      ? DateTime.fromFormat(this.toDateString, 'yyyy-MM')
      : null;
    if (newDate?.isValid) {
      this.toDateSync = newDate.endOf('month');
    } else {
      this.toDateSync = null;
    }
  }

  public updateFromDate() {
    const newDate = this.fromDateString
      ? DateTime.fromFormat(this.fromDateString, 'yyyy-MM')
      : null;
    if (newDate?.isValid) {
      this.fromDateSync = newDate;
    } else {
      this.fromDateSync = null;
    }
  }
}
</script>

<style scoped></style>
