<template>
  <table class="table-auto w-full border-collapse border-y border-gray-300">
    <thead class="header">
      <slot name="header" />
    </thead>

    <tbody>
      <slot/>
    </tbody>
  </table>
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
}
</script>

<style scoped></style>
