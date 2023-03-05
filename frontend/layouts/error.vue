<template>
  <div class="bg-light-gray font-inter min-w-full min-h-screen">
    <div
      class="flex items-center justify-center py-4 w-full h-screen overflow-hidden"
    >
      <MoleculeError :error="error" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import AtomRoundedContainer from '~/components/atoms/containers/AtomRoundedContainer.vue';
import { NuxtError } from '@nuxt/types';
import AtomTitle from '~/components/atoms/AtomTitle.vue';
import MoleculeError from '~/components/molecules/MoleculeError.vue';

@Component({
  components: { MoleculeError, AtomTitle, AtomRoundedContainer },
})
export default class Error extends Vue {
  @Prop({ required: true })
  private declare readonly error: NuxtError;
}
</script>
