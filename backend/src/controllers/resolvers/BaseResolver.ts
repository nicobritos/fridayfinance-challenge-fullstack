import { Resolvers } from '@controllers/resolvers/generated';

export interface BaseResolver {
  resolvers(): Resolvers;
}
