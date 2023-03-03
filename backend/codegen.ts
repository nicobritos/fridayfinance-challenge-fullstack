import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: ['./src/controllers/resolvers/definitions/**/*.graphql'],
  generates: {
    './src/controllers/resolvers/generated/generated.d.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        useIndexSignature: true,
      },
    },
  },
};

export default config;
