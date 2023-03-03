<template>
  <div class="w-full">
    <AtomDivider class="mb-1" horizontal strong />
    <div class="header">
      <slot name="header" />
    </div>
    <AtomDivider class="mb-1" horizontal strong />

    <div class="w-full" v-for="(item, index) in items" :key="index">
      <slot name="odd" v-if="isOdd(index)" :item="item" :index="index" />
      <slot name="even" v-else :item="item" :index="index" />
      <AtomDivider v-if="index + 1 < items.length" class="my-1" horizontal />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import AtomDivider from '~/components/atoms/AtomDivider.vue';

@Component({
  components: { AtomDivider },
})
export default class AtomTable extends Vue {
  @Prop({ type: Array, required: true })
  private declare readonly items: any[];

  isOdd(index: number): boolean {
    // Index is 0 based, and we naturally start at 1, so that the first
    // row is odd.
    return (index + 1) % 2 === 0;
  }
}
</script>

<style scoped></style>
