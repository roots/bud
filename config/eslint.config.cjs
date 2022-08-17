const OFF = 0
const WARN = 1
const ERROR = 2

module.exports = {
  parser: `@typescript-eslint/parser`,
  plugins: [
    `@typescript-eslint`,
    `prettier`,
    `react`,
    `react-hooks`,
    `simple-import-sort`,
    `tsdoc`,
  ],
  parserOptions: {
    ecmaVersion: 2021,
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: `module`,
  },
  settings: {
    react: {
      version: `detect`,
    },
  },
  extends: [`plugin:react/recommended`],
  ignorePatterns: [
    `**/*.json`,
    `**/*.d.ts`,
    `**/lib/**/*`,
    `**/node_modules/**/*`,
    `sources/@repo/docs/build/**/*`,
    `sources/@repo/docs/content/dev/api/**/*`,
    `**/dist`,
    `storage/**/*`,
  ],
  rules: {
    [`@typescript-eslint/explicit-member-accessibility`]: ERROR,
    '@typescript-eslint/quotes': [
      ERROR,
      `backtick`,
      {
        avoidEscape: true,
      },
    ],
    [`arrow-body-style`]: OFF,
    [`comma-dangle`]: [
      ERROR,
      {
        arrays: `always-multiline`,
        objects: `always-multiline`,
        imports: `always-multiline`,
        exports: `always-multiline`,
        functions: `ignore`,
      },
    ],
    [`no-console`]: ERROR,
    [`no-extra-semi`]: OFF,
    [`react/prop-types`]: OFF,
    [`react/react-in-jsx-scope`]: ERROR,
    [`react-hooks/rules-of-hooks`]: ERROR,
    [`react-hooks/exhaustive-deps`]: WARN,
    [`simple-import-sort/imports`]: ERROR,
    [`tsdoc/syntax`]: WARN,
  },
  overrides: [
    {
      files: [`examples/**/*.js`],
      rules: {
        [`tsdoc/syntax`]: `off`,
      },
    },
  ],
}
