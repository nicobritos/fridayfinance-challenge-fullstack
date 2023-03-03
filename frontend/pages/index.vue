<template>
  <div class="flex justify-center py-4 w-full">
    <OrganismTransactionList class="w-3/4 text-xs" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import OrganismTransactionList from '~/components/organisms/OrganismTransactionList.vue';

@Component({
  components: { OrganismTransactionList },
})
export default class Index extends Vue {}
</script>
