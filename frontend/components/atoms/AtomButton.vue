<template>
  <button
    class="text-center block flex-shrink-0 bg-transparent text-black select-none focus:outline-none cursor-pointer transition duration-100"
    :class="disabledClass"
    @click="click"
    :disabled="disabled"
  >
    <span class="px-4 py-2 flex relative" :class="targetClass">
      <slot />
    </span>
  </button>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';

@Component
export default class AtomButton extends Vue {
  @Prop({ default: 'items-center justify-center' })
  private declare readonly targetClass: string;
  @Prop({ type: Boolean, default: false })
  private declare readonly disabled: boolean;
  @Prop({ type: Boolean, default: true })
  private readonly rounded: boolean;

  get disabledClass(): string {
    let c = this.disabled
      ? 'opacity-50 cursor-not-allowed'
      : 'hover:border-transparent';
    if (this.rounded) c += ' rounded-sm';
    return c;
  }

  @Emit()
  click(event?: Event): void {
    event?.stopPropagation();
    event?.preventDefault();
    if (!this.disabled) this.$emit('click');
  }
}
</script>

<style scoped>
.wide-tracking {
  letter-spacing: 0.08em;
}
</style>
