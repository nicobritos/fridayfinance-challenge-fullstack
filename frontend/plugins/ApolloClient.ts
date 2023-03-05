import { InMemoryCache } from 'apollo-cache-inmemory';
import { Context, Plugin } from '@nuxt/types';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';

// eslint-disable-next-line import/no-mutable-exports
let $apollo: ApolloClient<any>;

const apolloClientPlugin: Plugin = async (context: Context, inject) => {
  const apolloClient = new ApolloClient({
    // @ts-ignore: They are the same type
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: 'http://localhost:5000/graphql',
    }),
  });
  inject('apollo', apolloClient);
  context.$apollo = apolloClient;
  $apollo = apolloClient;
};

export { $apollo };

export default apolloClientPlugin;
