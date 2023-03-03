<template>
  <div class="bg-accent-2 grid grid-cols-12 w-full">
    <AtomRowItem class="col-span-5">Reference</AtomRowItem>
    <AtomRowItem class="col-span-3">Category</AtomRowItem>
    <AtomRowItem class="col-span-2">Date</AtomRowItem>
    <AtomRowItem class="col-span-2">Amount</AtomRowItem>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AtomRowItem from '~/components/atoms/containers/AtomRowItem.vue';
import AtomTag from '~/components/atoms/AtomTag.vue';

@Component({
  components: { AtomTag, AtomRowItem },
})
export default class MoleculeTransactionHeader extends Vue {}
</script>

<style scoped></style>
