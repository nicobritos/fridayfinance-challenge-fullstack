<template>
  <div class="h-full overflow-y-auto">
    <table class="table-auto w-full border-collapse border-b border-gray-300">
      <thead
        class="header sticky -top-px z-1 backdrop-blur-xl bg-white/30 border-t border-gray-300"
      >
        <slot name="header" />
      </thead>

      <tbody>
        <slot />
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class AtomTable extends Vue {}
</script>

<style scoped></style>
