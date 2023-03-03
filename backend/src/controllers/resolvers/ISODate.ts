import { GraphQLScalarType } from 'graphql';

import { DateTime } from 'luxon';
import { ISODate } from '@models/utils/UtilityTypes';
import { Resolvers } from './generated/generated';

const isoDateResolver: Resolvers = {
  ISODate: new GraphQLScalarType({
    name: 'ISODate',
    description: 'ISO8601 datetime',
    serialize(value: DateTime | ISODate) {
      return typeof value === 'string' ? value : value.toISO();
    },
  }),
};

export default isoDateResolver;
