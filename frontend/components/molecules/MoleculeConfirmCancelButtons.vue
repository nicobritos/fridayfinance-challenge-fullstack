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
import { Component, Prop, Vue } from 'vue-property-decorator';
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
}
</script>

<style scoped></style>
