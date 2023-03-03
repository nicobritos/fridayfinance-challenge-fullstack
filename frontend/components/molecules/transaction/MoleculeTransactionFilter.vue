<template>
  <div class="flex items-end space-x-4">
    <AtomTextInput
      title="Search"
      value=""
      placeholder="Search by bank, account, reference, category, date, amount, currency..."
      target-class="w-full"
      class="flex-grow flex-shrink-0"
    />
    <AtomTextInput
      title="Bank"
      value=""
      placeholder="No filter applied"
      target-class="w-full"
      class="flex-grow-0 flex-shrink max-w-8"
    />
    <AtomTextInput
      title="Account"
      value=""
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
import { Component, Vue } from 'vue-property-decorator';
import AtomTextInput from '~/components/atoms/inputs/AtomTextInput.vue';
import AtomInput from '~/components/atoms/inputs/AtomInput.vue';

@Component({
  components: { AtomInput, AtomTextInput },
})
export default class MoleculeTransactionFilter extends Vue {}
</script>

<style scoped></style>
