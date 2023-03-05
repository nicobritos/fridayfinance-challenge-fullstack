<template>
  <div class="flex items-center justify-end space-x-2">
    <AtomElevatedButton :disabled="disableCancel">
      <span> Cancel </span>
    </AtomElevatedButton>

    <AtomElevatedButton primary :disabled="disableConfirm">
      <span> Confirm </span>
    </AtomElevatedButton>
  </div>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue } from 'vue-property-decorator';
import AtomButton from '~/components/atoms/button/AtomButton.vue';
import AtomElevatedButton from '~/components/atoms/button/AtomElevatedButton.vue';

@Component({
  components: { AtomElevatedButton, AtomButton },
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
