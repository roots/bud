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
    `**/*.d.ts`,
    `**/*.html`,
    `**/*.json`,
    `**/.budfiles`,
    `*.test.ts`,
    `*.test.tsx`,
    `**/dist`,
    `**/lib`,
    `**/node_modules`,
    `**/vendor`,
    `examples`,
    `sources/@repo/docs/build`,
    `sources/@repo/docs/content/dev/api`,
    `sources/@repo/test-kit/compiled`,
    `sources/create-bud-app/templates`,
    `storage`,
    `sources/deprecated`,
    `tests`,
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
    [`n/no-unpublished-import`]: [
      ERROR,
      {
        /**
         * `@wordpress/*` imports are aliased and resolved by webpack.
         * The dependencies are installed for type checking but they are not published.
         */
        allowModules: [
          `@wordpress/blocks`,
          `@wordpress/components`,
          `@wordpress/data`,
          `@wordpress/hooks`,
          `@wordpress/i18n`,
          `@wordpress/element`,
          `@wordpress/compose`,
          `@wordpress/block-editor`,
          `@wordpress/block-library`,
          `@wordpress/plugins`,
          `@wordpress/rich-text`,
          `type-fest`,
          `@aws-sdk/client-s3`,
        ],
      },
    ],
    [`n/no-unsupported-features/es-syntax`]: [
      ERROR,
      {ignores: [`modules`], version: `>=16.0.0`},
    ],
    [`n/no-missing-import`]: OFF,
    [`n/no-path-concat`]: ERROR,
    [`n/shebang`]: OFF,
    [`react/prop-types`]: OFF,
    [`react/react-in-jsx-scope`]: OFF,
    [`react-hooks/rules-of-hooks`]: ERROR,
    [`react-hooks/exhaustive-deps`]: WARN,
    [`simple-import-sort/imports`]: ERROR,
  },
  overrides: [
    {
      files: [`tests/**/*`, `**/*.spec.ts`, `**/*.test.ts`],
      rules: {
        [`n/no-extraneous-import`]: OFF,
        [`n/no-unpublished-import`]: OFF,
      },
    },
  ],
}
