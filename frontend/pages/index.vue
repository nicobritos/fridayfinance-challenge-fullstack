<template>
  <div class="flex justify-center h-full">
    <OrganismTransactionList class="w-3/4 text-xs max-h-full" />
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
