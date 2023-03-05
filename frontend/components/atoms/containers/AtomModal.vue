<template>
  <Transition name="fade">
    <div
      class="z-50 fixed inset-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-75"
      v-if="showingSync"
      @click.self="dismissOutside"
    >
      <AtomRoundedContainer
        bg-color-class="bg-light-gray"
        class="modal-body m-8 flex flex-col justify-center"
        :class="containerClass"
      >
        <div class="flex items-center mr-2 space-x-2">
          <slot name="title" />
          <div class="flex-grow" />
          <i
            class="cursor-pointer fill-current fas fa-times text-black text-2xl"
            @click="dismiss"
          />
        </div>
        <div class="flex w-full py-4 px-8">
          <slot />
        </div>
      </AtomRoundedContainer>
    </div>
  </Transition>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue, Watch } from 'vue-property-decorator';
import AtomRoundedContainer from '~/components/atoms/containers/AtomRoundedContainer.vue';

@Component({
  components: { AtomRoundedContainer },
})
export default class AtomModal extends Vue {
  @PropSync('showing', { type: Boolean, required: true })
  private declare showingSync: boolean;
  @Prop({ type: String, default: 'max-w-6xl' })
  private declare readonly containerClass: string;
  @Prop({ type: Boolean, default: true })
  private declare readonly dismissible: boolean;

  public dismissOutside(): void {
    if (this.dismissible) this.showingSync = false;
  }

  public dismiss(): void {
    this.showingSync = false;
  }

  @Watch('showingSync')
  private toggleScroll(value: boolean): void {
    if (value) document.querySelector('body')?.classList.add('overflow-hidden');
    else document.querySelector('body')?.classList.remove('overflow-hidden');
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.modal-body {
  transition: max-width 0.3s ease;
}
</style>
