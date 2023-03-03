<template>
  <AtomRoundedContainer class="flex flex-col">
    <AtomTitle>Transactions</AtomTitle>
    <MoleculeTransactionFilter />
    <MoleculeTransactionTable class="mt-2" />
  </AtomRoundedContainer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AtomTitle from '~/components/atoms/AtomTitle.vue';
import AtomRoundedContainer from '~/components/atoms/containers/AtomRoundedContainer.vue';
import MoleculeTransactionFilter from '~/components/molecules/transaction/MoleculeTransactionFilter.vue';
import MoleculeTransactionTable from '~/components/molecules/transaction/MoleculeTransactionTable.vue';

@Component({
  components: {
    MoleculeTransactionTable,
    MoleculeTransactionFilter,
    AtomRoundedContainer,
    AtomTitle,
  },
})
export default class OrganismTransactionList extends Vue {
}
</script>

<style scoped></style>
