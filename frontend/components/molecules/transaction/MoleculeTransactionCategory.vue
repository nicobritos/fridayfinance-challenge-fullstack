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
          :options="categories"
          @selected="setCategory"
        />
      </div>
    </div>
  </AtomRoundedContainer>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
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

  private newCategory: Nullable<Category> = null;
  private showCategories: boolean = false;

  private handleOutsideClickBound: Function =
    this.handleOutsideClick.bind(this);

  get categoryColor(): string {
    return `#${
      this.newCategory?.color ?? this.transaction.category?.color ?? 'b6b6b6'
    }`;
  }

  get categoryName(): string {
    return (
      this.newCategory?.name ??
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

  public setCategory(id: EntityInterface['id']): void {
    this.showCategories = false;
    const newCategory =
      this.categories.find((category) => category.id === id) || null;
    if (newCategory != null) {
      this.newCategory = newCategory;
      this.onCategorySelected(newCategory);
    }
  }

  @Emit()
  public onCategorySelected(category: Category): void {}
}
</script>

<style scoped></style>
