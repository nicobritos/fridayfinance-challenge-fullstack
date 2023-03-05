<template>
  <div class="flex items-center justify-end space-x-2">
    <AtomElevatedButton :disabled="disableCancel" @click="onCancel">
      <span> Cancel </span>
    </AtomElevatedButton>

    <AtomElevatedButton primary :disabled="disableConfirm" @click="onConfirm">
      <span> Confirm </span>
    </AtomElevatedButton>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import AtomButton from '~/components/atoms/button/AtomButton.vue';
import AtomElevatedButton from '~/components/atoms/button/AtomElevatedButton.vue';

@Component({
  components: { AtomElevatedButton, AtomButton },
})
export default class MoleculeConfirmCancelButtons extends Vue {
  @Prop({ type: Boolean, required: false, default: false })
  private declare readonly disableConfirm: boolean;
  @Prop({ type: Boolean, required: false, default: false })
  private declare readonly disableCancel: boolean;

  @Emit()
  public onConfirm() {}

  @Emit()
  public onCancel() {}
}
</script>

<style scoped></style>
