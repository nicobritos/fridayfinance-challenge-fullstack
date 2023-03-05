<template>
  <div class="transition-colors duration-300 rounded" :class="colorClass">
    <AtomButton
      :targetClass="targetClass"
      :disabled="disabled"
      :rounded="rounded"
      @click="click"
    >
      <slot />
    </AtomButton>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import AtomButton from '~/components/atoms/button/AtomButton.vue';

@Component({
  components: { AtomButton },
})
export default class AtomElevatedButton extends Vue {
  @Prop({ default: 'items-center justify-center' })
  private declare readonly targetClass: string;
  @Prop({ type: Boolean, default: false })
  private declare readonly disabled: boolean;
  @Prop({ type: Boolean, default: true })
  private declare readonly rounded: boolean;
  @Prop({ type: Boolean, default: false })
  private declare readonly primary: boolean;

  get colorClass(): string {
    if (this.primary) return 'bg-accent hover:bg-accent-3 active:bg-accent-4';
    return 'bg-gray-200 hover:bg-gray-300 active:bg-gray-400';
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
