<template>
  <div :class="dividerClass" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class AtomDivider extends Vue {
  @Prop({ type: Boolean, default: true })
  private declare readonly horizontal: boolean;
  @Prop({ type: Boolean, default: false })
  private declare readonly vertical: boolean;
  @Prop({ type: Boolean, default: false })
  private declare readonly strong: boolean;

  get dividerClass(): string {
    let orientation =
      this.vertical || !this.horizontal ? 'vertical' : 'horizontal';
    let strength = this.strong ? 'strong' : '';
    return `${orientation} ${strength}`;
  }
}
</script>

<style scoped>
.vertical,
.horizontal {
  background-color: #a0aec0;
}
.vertical.strong,
.horizontal.strong {
  background-color: #909cab;
}

.horizontal {
  height: 1px;
  width: 100%;
}

.vertical {
  width: 1px;
  height: 100%;
}
</style>
