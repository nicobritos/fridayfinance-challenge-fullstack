<template>
  <AtomRoundedContainer class="flex flex-col space-y-4">
    <AtomTitle class="text-xl">An error has occurred:</AtomTitle>
    <AtomTitle class="text-lg">{{ error.statusCode }}</AtomTitle>
    <p>{{ error.message }}</p>
    <div class="flex items-center justify-center">
      <AtomElevatedButton>
        <NuxtLink to="/">Back to home</NuxtLink>
      </AtomElevatedButton>
    </div>
  </AtomRoundedContainer>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import AtomRoundedContainer from '~/components/atoms/containers/AtomRoundedContainer.vue';
import { NuxtError } from '@nuxt/types';
import AtomTitle from '~/components/atoms/AtomTitle.vue';
import AtomElevatedButton from '~/components/atoms/button/AtomElevatedButton.vue';

@Component({
  components: { AtomElevatedButton, AtomTitle, AtomRoundedContainer },
})
export default class MoleculeError extends Vue {
  @Prop({ required: true })
  private declare readonly error: NuxtError;
}
</script>
