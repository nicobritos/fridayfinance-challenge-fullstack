<template>
  <AtomInput
    :type="$attrs.type || 'text'"
    :value.sync="valueSync"
    :placeholder="placeholder"
    :error="error"
    :target-class="targetClass"
    :floating-label="floatingLabel"
    :disabled="disabled"
    v-on="$listeners"
    :name="name"
    v-bind="$attrs"
  />
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue } from 'vue-property-decorator';
import AtomInput from '~/components/atoms/inputs/AtomInput.vue';

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
  private declare readonly valueSync: string | null;
  @Prop({ type: String, default: '' })
  private declare readonly name: string;
}
</script>

<style scoped></style>
