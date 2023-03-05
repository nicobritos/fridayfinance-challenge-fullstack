import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { Category } from '~/logic/models/Category';
import gql from 'graphql-tag';
import { $apollo } from '~/plugins/ApolloClient';

interface CategoriesState {
  categories: Category[];
  isLoading: boolean;
}

const GET_CATEGORIES = gql`
  query listCategories {
    listCategories {
      id
      name
      color
    }
  }
`;

@Module({
  name: 'categories',
  namespaced: true,
  stateFactory: true,
})
export default class Categories extends VuexModule implements CategoriesState {
  public categories: Category[] = [];
  public isLoading = false;

  @Mutation
  public setCategories(categories: Category[]) {
    this.categories = categories;
  }

  @Mutation
  public setLoading(loading: boolean) {
    this.isLoading = loading;
  }

  @Action
  public async fetchCategories() {
    this.context.commit('setLoading', true);
    const categories = (
      await $apollo.query({
        query: GET_CATEGORIES,
      })
    ).data.listCategories;
    this.context.commit('setCategories', categories);
    this.context.commit('setLoading', false);
  }
}
