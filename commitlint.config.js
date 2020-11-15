module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-max-line-length': [0, 'always', 100], // 0 = disable this rule
    'header-max-length': [0, 'always', 100], // 0 = disable this rule
  },
}
