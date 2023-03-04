<template>
  <div class='flex items-center justify-center'>
    <div class="flex justify-center items-center space-x-1 bg-gray-200 rounded">
      <AtomButton
        :disabled="!hasPrevious"
        rounded
        @click="previousPage"
      >
        <i class="fas fa-chevron-left mr-1" />
        <span>
        Previous
      </span>
      </AtomButton>

      <span>
      {{ displayPage }}
    </span>

      <AtomButton
        :disabled="!hasNext"
        @click="nextPage"
      >
      <span>
        Next
      </span>
        <i class="fas fa-chevron-right ml-1" />
      </AtomButton>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue } from 'vue-property-decorator';
import AtomButton from '~/components/atoms/AtomButton.vue'

@Component({
  components: { AtomButton }
})
export default class MoleculePagination extends Vue {
  @PropSync('page', { required: true })
  private declare pageSync: number;
  @Prop({ required: true })
  private declare readonly hasNext: boolean;
  @Prop({ required: true })
  private declare readonly hasPrevious: boolean;

  get displayPage(): number {
    return this.pageSync + 1;
  }

  public nextPage(): void {
    this.pageSync++;
  }

  public previousPage(): void {
    this.pageSync--;
  }
}
</script>

<style scoped></style>
