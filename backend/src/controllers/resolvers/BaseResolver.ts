import { Resolvers } from '@controllers/resolvers/generated/generated';

export interface BaseResolver {
  resolvers(): Resolvers;
}
