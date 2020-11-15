module.exports = {
  env: {
    node: true,
    es2021: true
  },
  extends: [
    'standard',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint',
    'prettier'
  ],
  rules: {
    'no-redeclare': 0,
    'prettier/prettier': 'error'
  }
}
