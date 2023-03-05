<template>
  <div class="bg-light-gray font-inter min-w-full min-h-screen">
    <div class="py-4 w-full h-screen overflow-hidden">
      <Nuxt />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Default extends Vue {}
</script>

<style scoped></style>
