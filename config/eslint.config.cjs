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
    `eslint-plugin-n`,
  ],
  parserOptions: {
    ecmaVersion: 2021,
    ecmaFeatures: {jsx: true},
    sourceType: `module`,
  },
  settings: {
    react: {version: `detect`},
    n: {
      convertPath: {
        [`sources/@roots/**/*.ts`]: [`^./(.+?).js$`, `./$1.ts`],
      },
      tryExtensions: [
        `.ts`,
        `.tsx`,
        `.cts`,
        `.mts`,
        `.js`,
        `.jsx`,
        `.cjs`,
        `.mjs`,
      ],
    },
  },
  extends: [`plugin:react/recommended`, `plugin:n/recommended-module`],
  ignorePatterns: [
    `**/*.json`,
    `**/*.d.ts`,
    `**/lib/**/*`,
    `**/node_modules/**/*`,
    `examples/**/*`,
    `sources/@repo/docs/build/**/*`,
    `sources/deprecated/**/*`,
    `sources/@repo/docs/content/dev/api/**/*`,
    `tests/util/**/*`,
    `**/dist`,
    `storage/**/*`,
    `**/*.html`,
  ],
  rules: {
    [`@typescript-eslint/explicit-member-accessibility`]: ERROR,
    [`@typescript-eslint/quotes`]: [
      ERROR,
      `backtick`,
      {avoidEscape: true},
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
    [`n/callback-return`]: ERROR,
    [`n/no-missing-import`]: OFF,
    [`n/no-process-env`]: ERROR,
    [`n/no-unsupported-features/es-syntax`]: [
      ERROR,
      {ignores: [`modules`], version: `>=16.0.0`},
    ],
    [`n/no-missing-import`]: OFF,
    [`n/no-path-concat`]: ERROR,
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
      rules: {[`tsdoc/syntax`]: OFF},
    },
    {
      files: [`tests/**/*`, `**/*.spec.ts`, `**/*.test.ts`],
      rules: {
        [`n/no-extraneous-import`]: OFF,
        [`n/no-unpublished-import`]: OFF,
      },
    },
  ],
}
