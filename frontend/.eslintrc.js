module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  plugins: ['prettier'],
  extends: ['@nuxtjs/eslint-config-typescript', 'prettier'],
  ignorePatterns: ['node_modules/', 'dist/', '*.d.ts'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
    'arrow-parens': 'error',
    'lines-between-class-members': 'off',
  },
};
