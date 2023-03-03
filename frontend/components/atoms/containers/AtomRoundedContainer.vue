<template>
  <AtomContainer
    class="rounded"
    :target-class="targetClass"
    :background-color="backgroundColor"
    v-on="$listeners"
    v-bind="$attrs"
  >
    <slot />
  </AtomContainer>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import AtomContainer from '~/components/atoms/containers/AtomContainer.vue';

@Component({
  components: { AtomContainer },
})
export default class AtomRoundedContainer extends Vue {
  @Prop({ type: String, default: 'bg-white' })
  private readonly backgroundColor: string;
  @Prop({ type: String, default: '' })
  private readonly targetClass: string;
}
</script>

<style scoped></style>
