<template>
  <tr>
    <AtomRowItem header>Reference</AtomRowItem>
    <AtomRowItem header>Category</AtomRowItem>
    <AtomRowItem header>Date</AtomRowItem>
    <AtomRowItem header>Amount</AtomRowItem>
  </tr>
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
