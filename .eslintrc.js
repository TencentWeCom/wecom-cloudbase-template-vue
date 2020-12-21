module.exports = {
  extends: [
    '@tencent/eslint-config-tencent',
    'plugin:vue/vue3-recommended',
  ],
  overrides: [
    {
      files: [
        'client/**/*.ts',
        'client/**/*.vue',
      ],
      extends: [
        '@tencent/eslint-config-tencent/ts',
      ],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        project: './client/tsconfig.json',
        extraFileExtensions: ['.vue'],
      },
    },
    {
      files: [
        'functions/**/*',
      ],
      extends: [
        '@tencent/eslint-config-tencent',
      ],
    },
  ],
};
