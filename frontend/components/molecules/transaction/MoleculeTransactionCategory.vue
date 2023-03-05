<template>
  <AtomRoundedContainer>
    <div class="flex items-center space-x-4">
      <i class="fas fa-table-cells-large text-base"></i>
      <span class="font-bold">Category:</span>
      <div class="relative">
        <AtomTag
          :color="categoryColor"
          class="cursor-pointer"
          @click="openCategories"
        >
          <span class="select-none">
            {{ categoryName }}
          </span>
        </AtomTag>
        <AtomButtonDropdownOptions
          v-if="showCategories"
          class="absolute top-7 w-56"
          :options="categoryOptions"
          @selected="setCategory"
        />
      </div>
    </div>
  </AtomRoundedContainer>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue } from 'vue-property-decorator';
import AtomRoundedContainer from '~/components/atoms/containers/AtomRoundedContainer.vue';
import { Transaction } from '~/logic/models/Transaction';
import AtomTag from '~/components/atoms/AtomTag.vue';
import AtomModal from '~/components/atoms/containers/AtomModal.vue';
import AtomTitle from '~/components/atoms/AtomTitle.vue';
import { Category } from '~/logic/models/Category';
import AtomButtonDropdownOptions from '~/components/atoms/button/AtomButtonDropdownOptions.vue';
import EntityInterface from '~/logic/models/utils/EntityInterface';
import { Nullable } from '~/logic/models/utils/UtilityTypes';

@Component({
  components: {
    AtomButtonDropdownOptions,
    AtomTitle,
    AtomModal,
    AtomRoundedContainer,
    AtomTag,
  },
})
export default class MoleculeTransactionCategory extends Vue {
  @Prop({ type: Object, required: true })
  private declare readonly transaction: Transaction;
  @Prop({ type: Array, required: true })
  private declare readonly categories: Category[];
  @PropSync('newCategory', { required: true })
  private declare newCategorySync: Nullable<Category>;
  @PropSync('unselectCategory', { required: true })
  private declare unselectCategorySync: boolean;

  private removeCategoryOption: EntityInterface = {
    id: 'remove',
    name: 'Uncategorized',
  };
  private showCategories: boolean = false;

  private handleOutsideClickBound: Function =
    this.handleOutsideClick.bind(this);

  get categoryOptions(): EntityInterface[] {
    return [
      this.removeCategoryOption,
      ...this.categories.map((category) => ({
        id: category.id!,
        name: category.name!,
      })),
    ];
  }

  get categoryColor(): string {
    if (this.unselectCategorySync) {
      return '#b6b6b6';
    }

    return `#${
      this.newCategorySync?.color ??
      this.transaction.category?.color ??
      'b6b6b6'
    }`;
  }

  get categoryName(): string {
    if (this.unselectCategorySync) {
      return 'Uncategorized';
    }

    return (
      this.newCategorySync?.name ??
      this.transaction.category?.name ??
      'Uncategorized'
    );
  }

  private handleOutsideClick(event: Event): void {
    if (!this.$el.contains(event.target)) {
      this.closeCategories();
    }
  }

  public created() {
    window.addEventListener('click', this.handleOutsideClickBound);
  }

  public destroyed() {
    window.removeEventListener('click', this.handleOutsideClickBound);
  }

  public openCategories(): void {
    this.showCategories = true;
  }

  public closeCategories(): void {
    this.showCategories = false;
  }

  public setCategory(id: EntityInterface['id'] | Event): void {
    if (id instanceof Event) {
      return;
    }

    this.showCategories = false;
    const newCategory =
      this.categories.find((category) => category.id === id) || null;
    if (newCategory != null) {
      this.newCategorySync = newCategory;
      this.unselectCategorySync = false;
    } else {
      this.unselectCategorySync = true;
      this.newCategorySync = null;
    }
  }
}
</script>

<style scoped></style>
