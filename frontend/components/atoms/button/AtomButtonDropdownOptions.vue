<template>
  <ul class="border border-gray-300 h-40 overflow-y-auto select-none">
    <li
      v-for="option in options"
      @click.self="selected($event, option.id)"
      :key="option.id"
      class="cursor-pointer py-2 px-3 text-gray-600 hover:text-black hover:bg-gray-200 duration-300 transition-all"
    >
      {{ option.name }}
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import EntityInterface from '~/logic/models/utils/EntityInterface';

@Component
export default class AtomButtonDropdownOptions extends Vue {
  @Prop({ type: Array, required: true })
  private declare readonly options: EntityInterface[];

  @Emit()
  selected(event: Event, id: EntityInterface['id']): void {
    event?.preventDefault();
    event?.stopPropagation();
    this.$emit('selected', id);
  }
}
</script>

<style scoped>
.wide-tracking {
  letter-spacing: 0.08em;
}
</style>
