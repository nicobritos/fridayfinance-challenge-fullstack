<template>
  <Transition
    name="fade"
    :enter-active-class="'overflow-hidden transition-active ' + durationClass"
    :leave-active-class="'overflow-hidden transition-active ' + durationClass"
    mode="out-in"
  >
    <slot />
  </Transition>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class FadeTransition extends Vue {
  @Prop({ type: String, default: 'duration-300' })
  private declare readonly durationClass: string;
}
</script>

<style scoped>
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-timing-function: ease-in-out;
}
</style>
