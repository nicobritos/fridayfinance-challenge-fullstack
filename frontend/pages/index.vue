<template>
  <Tutorial/>
</template>

<script lang="ts">
import {Tutorial} from '~/components/Tutorial.vue';
import {Component, Vue} from "vue-property-decorator";

@Component({
  components: {
    Tutorial,
  }
})
export default class Index extends Vue {

}
</script>
