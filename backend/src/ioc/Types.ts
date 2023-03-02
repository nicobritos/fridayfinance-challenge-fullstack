// Contains all registrable types
// All types must be represented by a Symbol and not
// a type to support circular dependencies.
// See more: https://github.com/inversify/InversifyJS/blob/master/wiki/classes_as_id.md#known-limitation-classes-as-identifiers-and-circular-dependencies

import repositoriesTypes from '@interfaces/repositories/repositories.types';
import servicesTypes from '@interfaces/services/services.types';

const TYPES = {
  Repositories: {
    ...repositoriesTypes,
  },
  Services: {
    ...servicesTypes,
  },
  Extra: {
    PrismaClient: Symbol('PrismaClient'),
  },
};

export default TYPES;
