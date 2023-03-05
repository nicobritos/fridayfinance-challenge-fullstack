<template>
  <div
    class="loader ease-linear rounded-full border-gray-500 border-t-accent-4"
    :class="size"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class LoadingSpinner extends Vue {
  @Prop({ type: Boolean, required: false, default: false })
  private declare readonly small;

  get size() {
    return this.small ? 'border-3 h-6 w-6' : 'border-12 h-24 w-24';
  }
}
</script>

<style scoped>
.loader {
  -webkit-animation: spinner 1.5s linear infinite;
  animation: spinner 1.5s linear infinite;
}

@-webkit-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
