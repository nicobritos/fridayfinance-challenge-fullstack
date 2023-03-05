<template>
  <AtomElevatedButton target-class="items-center space-x-1" @click="onClick">
    <i class="fas fa-arrow-left"></i>
    <span>Back to transactions</span>
  </AtomElevatedButton>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AtomElevatedButton from '~/components/atoms/button/AtomElevatedButton.vue'

@Component({
  components: {
    AtomElevatedButton,
  },
})
export default class MoleculeBackButtonTransactions extends Vue {
  public onClick(event?: Event): void {
    event?.stopPropagation();
    event?.preventDefault();
    this.$router.push('/');
  }
}
</script>

<style scoped></style>
