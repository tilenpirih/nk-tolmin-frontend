module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'plugin:vue/recommended',
    'plugin:prettier/recommended',
    'eslint:recommended',
    'prettier',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    semi: 'off',
    'import/extensions': 'off',
    'no-console': 'warn',
    'no-debugger': 'off',
    'object-curly-newline': 'off',
    'import/no-extraneous-dependencies': 'off',
    'operator-linebreak': 'off',
    'implicit-arrow-linebreak': 'off',
    'no-unused-vars': 'warn',
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    'arrow-parens': 'off',
    'no-undef': 'off',
    'no-unused-expressions': 'off',
  },
}
