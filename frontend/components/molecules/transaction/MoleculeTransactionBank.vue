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
import AtomRoundedContainer from '~/components/atoms/containers/AtomRoundedContainer.vue';
import { Transaction } from '~/logic/models/Transaction';

@Component({
  components: { AtomRoundedContainer },
})
export default class MoleculeTransactionBank extends Vue {
  @Prop({ type: Object, required: true })
  private declare readonly transaction: Transaction;
}
</script>

<style scoped></style>
