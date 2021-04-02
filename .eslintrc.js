const rules = {
  'consistent-return': 0,
  'func-names': 0,
  'no-console': 0,
  'no-new': 0,
  'no-restricted-globals': 0,
  'no-underscore-dangle': 0,
  'no-use-before-define': 0,
  'import/prefer-default-export': 0,
  '@typescript-eslint/no-use-before-define': 0,
};

module.exports = {
  overrides: [
    {
      files: [
        '**/*.js',
      ],
      extends: [
        'airbnb-base',
      ],
      rules,
    },
    {
      files: [
        'client/**/*.ts',
        'client/**/*.vue',
      ],
      extends: [
        'airbnb-typescript/base',
        'plugin:vue/vue3-recommended',
      ],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        project: './client/tsconfig.json',
        extraFileExtensions: ['.vue'],
      },
      rules,
    },
  ],
};
