import accountResolverImpl from './resolvers/AccountResolverImpl';

import isoDateResolver from './resolvers/ISODate';
import { Resolvers } from './resolvers/generated/generated';
import transactionResolverImpl from '@controllers/resolvers/TransactionResolverImpl';

const resolvers: Resolvers = {
  ...isoDateResolver,
  ...accountResolverImpl,
  ...transactionResolverImpl,
};

export default resolvers;
