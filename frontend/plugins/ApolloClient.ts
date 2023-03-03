import { InMemoryCache } from 'apollo-cache-inmemory';
import { Context } from '@nuxt/types';

export default (_: Context) => {
  return {
    httpEndpoint: 'http://localhost:8000/graphql',
    cache: new InMemoryCache(),
  };
};
