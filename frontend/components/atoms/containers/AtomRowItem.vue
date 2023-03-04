<template>
  <component
    :is="rowTag"
    class="p-0 border-y border-gray-100 overflow-hidden overflow-x-clip h-12 whitespace-nowrap"
  >
    <div class="flex items-center" :class="targetClass">
      <slot />
    </div>
  </component>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class AtomRowItem extends Vue {
  @Prop({ type: String, default: () => '' })
  private declare readonly targetClass: string;
  @Prop({ type: Boolean, default: () => false })
  private declare readonly header: boolean;

  get rowTag(): string {
    return this.header ? 'th' : 'td';
  }
}
</script>

<style scoped></style>
