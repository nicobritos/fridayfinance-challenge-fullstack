<template>
  <div
    class="flex items-center justify-center py-1.5 px-2 rounded-md"
    :style="colorStyle"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class AtomTag extends Vue {
  @Prop({ type: String, required: true })
  private declare readonly color: string;

  get colorStyle(): string {
    return `background-color: ${this.color};`;
  }
}
</script>

<style scoped></style>
