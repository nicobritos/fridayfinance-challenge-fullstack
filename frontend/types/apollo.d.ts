import { ApolloClient } from 'apollo-client';

declare module 'vue/types/vue' {
  interface Vue {
    $apollo: ApolloClient<any>;
  }
}

declare module '@nuxt/types' {
  interface Context {
    $apollo: ApolloClient<any>;
  }
}
