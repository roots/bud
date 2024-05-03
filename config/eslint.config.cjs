const OFF = 0
const WARN = 1
const ERROR = 2

module.exports = {
  extends: [
    `plugin:react/recommended`,
    `plugin:n/recommended-module`,
    `plugin:perfectionist/recommended-alphabetical`,
    `plugin:sort-class-members/recommended`,
  ],
  ignorePatterns: [
    `**/*.d.ts`,
    `**/*.html`,
    `**/*.json`,
    `**/.storage`,
    `**/compiled`,
    `**/dist`,
    `**/lib`,
    `**/node_modules`,
    `**/vendor`,
    `examples`,
    `sources/@repo/docs/build`,
    `sources/@repo/docs/content/dev/api`,
    `sources/@repo/test-kit/compiled`,
    `sources/create-bud-app/templates`,
    `**/public`,
    `storage`,
    `sources/deprecated`,
  ],
  overrides: [
    {
      files: [
        `**/tests/**`,
        `**/*.test.ts`,
        `**/*.test.tsx`,
        `**/*.test.cts`,
        `**/*.test.mts`,
      ],
      rules: {
        [`n/no-extraneous-import`]: OFF,
        [`n/no-unpublished-import`]: OFF,
      },
    },
  ],
  parser: `@typescript-eslint/parser`,
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 2021,
    sourceType: `module`,
  },
  plugins: [
    `@typescript-eslint`,
    `prettier`,
    `react`,
    `react-hooks`,
    `eslint-plugin-n`,
    `perfectionist`,
    `sort-class-members`,
  ],
  rules: {
    [`@typescript-eslint/ban-types`]: [
      ERROR,
      {
        types: {
          Buffer: {
            message: `Use Uint8Array instead.`,
            suggest: [`Uint8Array`],
          },
        },
      },
    ],
    [`@typescript-eslint/explicit-member-accessibility`]: ERROR,
    [`@typescript-eslint/quotes`]: [
      ERROR,
      `backtick`,
      { avoidEscape: true },
    ],
    [`arrow-body-style`]: OFF,
    [`comma-dangle`]: [
      ERROR,
      {
        arrays: `always-multiline`,
        exports: `always-multiline`,
        functions: `ignore`,
        imports: `always-multiline`,
        objects: `always-multiline`,
      },
    ],
    [`n/callback-return`]: ERROR,
    [`n/no-missing-import`]: OFF,
    [`n/no-missing-import`]: OFF,
    [`n/no-path-concat`]: ERROR,
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
      { ignores: [`modules`], version: `>=16.0.0` },
    ],
    [`n/shebang`]: OFF,
    [`no-console`]: ERROR,
    [`no-extra-semi`]: OFF,
    [`no-restricted-globals`]: [
      ERROR,
      {
        message: `Use Uint8Array instead.`,
        name: `Buffer`,
      },
    ],
    [`perfectionist/sort-classes`]: OFF,
    [`perfectionist/sort-imports`]: [
      ERROR,
      {
        'custom-groups': {
          type: {
            [`node`]: [`node:*`],
          },
          value: {
            [`node`]: [`node:*`],
          },
        },
        groups: [
          [`type`],
          [`node`, `builtin`],
          `external`,
          `internal-type`,
          `internal`,
          [`parent-type`, `sibling-type`, `index-type`],
          [`parent`, `sibling`, `index`],
          `object`,
          `unknown`,
        ],
        order: `asc`,
        type: `natural`,
      },
    ],
    [`react-hooks/exhaustive-deps`]: WARN,
    [`react-hooks/rules-of-hooks`]: ERROR,
    [`react/prop-types`]: OFF,
    [`react/react-in-jsx-scope`]: OFF,
    [`sort-class-members/sort-class-members`]: [
      OFF,
    ],
  },
  settings: {
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
    react: { version: `detect` },
  },
}
