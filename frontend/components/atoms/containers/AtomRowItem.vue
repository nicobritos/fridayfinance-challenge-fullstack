<template>
  <div
    class="overflow-hidden overflow-x-clip h-12 whitespace-nowrap flex items-center"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class AtomRowItem extends Vue {}
</script>

<style scoped></style>
