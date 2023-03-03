<template>
  <h3 class="font-bold"><slot /></h3>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class AtomTitle extends Vue {}
</script>

<style scoped></style>
