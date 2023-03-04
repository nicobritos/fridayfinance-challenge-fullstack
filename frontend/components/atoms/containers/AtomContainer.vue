<template>
  <div :class="classString">
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class AtomContainer extends Vue {
  @Prop({ type: String, default: 'bg-white' })
  private declare readonly backgroundColor: string;
  @Prop({ type: String, default: '' })
  private declare readonly targetClass: string;

  get classString(): string {
    return `p-4 ${this.backgroundColor}`;
  }
}
</script>

<style scoped></style>
