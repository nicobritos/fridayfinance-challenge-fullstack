<template>
  <div>
    <p v-if="!!title" class="text-gray-400">{{ title }}</p>
    <div
      class="mt-1 inline-block border border-gray-300 h-6 hover:border-accent-2 focus:border-accent transition duration-300 pl-2 w-full"
    >
      <span
        v-if="showPrepend"
        @click="focusInput"
        ref="prepend"
        class="absolute bottom-0 prepend fill-current input-underline-on-hover cursor-text"
        :class="slotClass"
        :disabled="disabled"
      >
        <slot name="prepend" />
      </span>
      <span
        v-if="showAppend"
        @click="focusInput"
        ref="append"
        class="absolute bottom-0 append right-0 fill-current input-underline-on-hover cursor-text"
        :class="slotClass"
        :disabled="disabled"
      >
        <slot name="append" />
      </span>
      <input
        ref="input"
        class="appearance-none bg-transparent w-full mr-3 py-1 input-with-label focus:outline-none border-none"
        :class="computedClass"
        :placeholder="placeholder"
        :aria-label="placeholder"
        :disabled="disabled"
        v-model="valueSync"
        v-bind="$attrs"
        @keydown="keyPress"
        v-on="$listeners"
        :name="name"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Emit,
  Prop,
  PropSync,
  Ref,
  Vue,
  Watch,
} from 'vue-property-decorator';

@Component
export default class AtomInput extends Vue {
  @Ref('prepend')
  private declare readonly prependEl: HTMLElement;
  @Ref('input')
  private declare readonly inputEl: HTMLElement;
  @Prop({ type: String, default: '' })
  private declare readonly placeholder: string;
  @Prop({ type: String, default: '' })
  private declare readonly targetClass: string;
  @Prop({ type: Boolean, default: false })
  private declare readonly disabled: boolean;
  @Prop({ type: Boolean, default: false })
  private declare readonly error: boolean;
  @PropSync('value', { required: true })
  private declare readonly valueSync: string | null;
  @Prop({ type: String, default: '' })
  private declare readonly name: string;
  @Prop({ type: String, default: '' })
  private declare readonly title: string;

  get outerClass(): string {
    return '';
  }

  get computedClass(): string {
    let clazz =
      (this.error ? 'text-red-700 ' : '') +
      (this.targetClass ? this.targetClass : 'border-b border-black');
    if (this.disabled) clazz += ' text-gray-600';
    else clazz += ' text-black';
    return clazz;
  }

  get showPrepend(): boolean {
    return this.$slots.hasOwnProperty('prepend');
  }

  get showAppend(): boolean {
    return this.$slots.hasOwnProperty('append');
  }

  get slotClass(): string {
    return this.disabled ? 'text-gray-600' : 'text-black';
  }

  public created(): void {
    this.setPrependPadding();
  }

  public mounted(): void {
    this.setPrependPadding();
  }

  public focusInput(): void {
    if (document.activeElement !== this.inputEl) this.inputEl.focus();
  }

  public keyPress(event: KeyboardEvent): void {
    if (
      (event.key != null && event.key.toLowerCase() == 'enter') ||
      (event.keyCode != null && event.keyCode === 13) ||
      (event.which != null && event.which === 13)
    ) {
      event.preventDefault();
      event.stopPropagation();

      this.enter();
    }
  }

  @Emit('enter')
  public enter(): void {}

  @Watch('prependEl', { immediate: true })
  private setPrependPadding(): void {
    this.$nextTick(() => {
      if (!this.prependEl) return;
      let width = getComputedStyle(this.prependEl).width;

      this.inputEl.style.paddingLeft = width;
      getComputedStyle(this.inputEl); // Force redraw
    });
  }
}
</script>

<style scoped>
.append:not([border]),
.prepend:not([border]) {
  margin-bottom: 0.535rem;
}

.append[border],
.prepend[border] {
  margin-bottom: 0.235rem;
}
</style>
