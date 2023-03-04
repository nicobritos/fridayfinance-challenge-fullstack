import accountResolverImpl from './resolvers/AccountResolverImpl';
import _ from 'lodash';

import isoDateResolver from './resolvers/ISODate';
import { Resolvers } from './resolvers/generated/generated';
import transactionResolverImpl from '@controllers/resolvers/TransactionResolverImpl';
import categoryResolverImpl from '@controllers/resolvers/CategoryResolverImpl';

const resolvers: Resolvers = _.merge(
  isoDateResolver,
  accountResolverImpl,
  categoryResolverImpl,
  transactionResolverImpl
);

export default resolvers;
