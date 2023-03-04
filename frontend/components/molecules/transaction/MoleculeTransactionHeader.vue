<template>
  <tr>
    <AtomRowItem header class='border-gray-300' target-class='font-normal text-gray-400'>Reference</AtomRowItem>
    <AtomRowItem header class='border-gray-300' target-class='font-normal text-gray-400'>Category</AtomRowItem>
    <AtomRowItem header class='border-gray-300' target-class='font-normal text-gray-400'>Date</AtomRowItem>
    <AtomRowItem header class='border-gray-300' target-class='font-normal text-gray-400 justify-end'>Amount</AtomRowItem>
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
