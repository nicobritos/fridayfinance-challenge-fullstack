<template>
  <AtomInput
    :type="$attrs.type || 'text'"
    :value.sync="rtValue"
    :placeholder="placeholder"
    :error="error"
    :target-class="targetClass"
    :floating-label="floatingLabel"
    :disabled="disabled"
    :name="name"
    v-bind="$attrs"
  />
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue, Watch } from 'vue-property-decorator';
import AtomInput from '~/components/atoms/inputs/AtomInput.vue';
import { Nullable } from '~/logic/models/utils/UtilityTypes';
import { debounce } from 'throttle-debounce';

@Component({
  components: { AtomInput },
})
export default class AtomTextInput extends Vue {
  @Prop({ type: String, default: '' })
  private declare readonly placeholder: string;
  @Prop({ type: String, default: '' })
  private declare readonly targetClass: string;
  @Prop({ type: Boolean, default: false })
  private declare readonly error: boolean;
  @Prop({ type: Boolean, default: false })
  private declare readonly disabled: boolean;
  @Prop({ type: Boolean, default: true })
  private declare readonly floatingLabel: string;
  @PropSync('value', { required: true })
  private declare valueSync: string | null;
  @Prop({ type: String, default: '' })
  private declare readonly name: string;
  @Prop({ default: null })
  private declare readonly debounce: Nullable<number>;

  private rtValue: string = '';
  private debounceFunction: Nullable<Function> = null;

  public created(): void {
    this.debounceFunction = debounce(this.debounce, () => this.emitNewValue());
  }

  @Watch('rtValue')
  public onRtValueChange(): void {
    if (this.debounce) {
      this.debounceFunction!();
    } else {
      this.emitNewValue();
    }
  }

  private emitNewValue(): void {
    console.log('emitting new value: ' + this.rtValue);
    this.valueSync = this.rtValue;
  }
}
</script>

<style scoped></style>
