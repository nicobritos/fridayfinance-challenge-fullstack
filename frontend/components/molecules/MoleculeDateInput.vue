<template>
  <AtomTextInput
    mask="####-##"
    placeholder="yyyy-mm"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template #append>
      <i class="fas fa-solid fa-calendar-days" />
    </template>
  </AtomTextInput>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AtomTextInput from '~/components/atoms/inputs/AtomTextInput.vue';

@Component({
  components: { AtomTextInput },
})
export default class MoleculeDateInput extends Vue {}
</script>

<style scoped></style>
