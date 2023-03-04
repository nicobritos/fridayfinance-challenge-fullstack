<template>
  <div class="w-full">
    <p v-if="!!title" class="text-gray-400">{{ title }}</p>
    <select
      v-model="selectedOptionIdSync"
      class="outline-0 border border-gray-300 hover:border-accent-2 focus:border-accent transition duration-300 h-6 whitespace-no-wrap select-none w-full"
      :class="textColor"
    >
      <option v-if="placeholder" :value="null" selected>
        {{ placeholder }}
      </option>
      <option v-for="option in options" :key="option.id" :value="option.id">
        {{ option.name }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue } from 'vue-property-decorator';
import EntityInterface from '~/logic/models/utils/EntityInterface';
import { ID, Nullable } from '~/logic/models/utils/UtilityTypes';

@Component
export default class AtomDropdown extends Vue {
  @Prop({ type: Array, required: true })
  private declare readonly options: Array<EntityInterface>;
  @Prop({ type: String, default: '' })
  private declare readonly title: string;
  @Prop({ type: String, default: null })
  private declare readonly placeholder: Nullable<string>;
  @PropSync('selectedOptionId', { default: null })
  private declare selectedOptionIdSync: Nullable<ID>;

  get textColor(): string {
    return this.selectedOptionIdSync != null ? 'text-black' : 'text-gray-400';
  }
}
</script>

<style scoped></style>
