import accountResolverImpl from './resolvers/AccountResolverImpl';

import isoDateResolver from './resolvers/ISODate'
import { Resolvers } from './resolvers/generated'

const resolvers: Resolvers = {
    ...isoDateResolver,
    ...accountResolverImpl,
};

export default resolvers;
