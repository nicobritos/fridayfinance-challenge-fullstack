module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  plugins: ['prettier'],
  extends: ['@nuxtjs/eslint-config-typescript', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
    'arrow-parens': 'error',
  },
};
