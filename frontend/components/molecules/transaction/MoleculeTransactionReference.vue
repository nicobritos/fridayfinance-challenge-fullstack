<template>
  <AtomRoundedContainer>
    <div class="flex items-center space-x-4">
      <i class="fas fa-circle-info text-base"></i>
      <span v-if="transaction.reference"
        >Reference: {{ transaction.reference }}</span
      >
      <span v-else class="text-gray-500"
        >No reference provided for this transaction</span
      >
    </div>
  </AtomRoundedContainer>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import AtomRoundedContainer from '~/components/atoms/containers/AtomRoundedContainer.vue';
import { Transaction } from '~/logic/models/Transaction';

@Component({
  components: { AtomRoundedContainer },
})
export default class MoleculeTransactionReference extends Vue {
  @Prop({ type: Object, required: true })
  private declare readonly transaction: Transaction;
}
</script>

<style scoped></style>
