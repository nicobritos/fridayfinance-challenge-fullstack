<template>
  <div class="flex items-end space-x-4">
    <AtomTextInput
      title="Search"
      :value.sync="searchSync"
      :debounce="200"
      placeholder="Search by bank, account, reference, category, date, amount, currency..."
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
    <AtomTextInput
      title="Starting month"
      value=""
      placeholder="No filter applied"
      target-class="w-full"
      class="flex-grow-0 flex-shrink max-w-8"
    />
    <AtomTextInput
      title="Ending month"
      value=""
      placeholder="No filter applied"
      target-class="w-full"
      class="flex-grow-0 flex-shrink max-w-8"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue } from 'vue-property-decorator';
import AtomTextInput from '~/components/atoms/inputs/AtomTextInput.vue';
import AtomInput from '~/components/atoms/inputs/AtomInput.vue';
import AtomDropdown from '~/components/atoms/inputs/AtomDropdown.vue';
import { Nullable } from '~/logic/models/utils/UtilityTypes';
import { Account } from '~/logic/models/Account';

@Component({
  components: { AtomDropdown, AtomInput, AtomTextInput },
})
export default class MoleculeTransactionFilter extends Vue {
  @PropSync('search', { required: true })
  private declare readonly searchSync: Nullable<string>;
  @PropSync('selectedBankId', { required: true })
  private declare readonly selectedBankIdSync: Nullable<string>;
  @PropSync('selectedAccountId', { required: true })
  private declare readonly selectedAccountIdSync: Nullable<string>;
  @Prop({ type: Array, required: true })
  private declare readonly accounts: Account[];
  @Prop({ type: Array, required: true })
  private declare readonly banks: string[];
}
</script>

<style scoped></style>
