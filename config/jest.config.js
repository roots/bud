/* eslint-disable tsdoc/syntax */
import {paths} from '@repo/constants'

/**
 * Base jest configuration
 * @type {import('@jest/types').Config.InitialOptions} base
 */
const base = {
  coverageProvider: `v8`,
  extensionsToTreatAsEsm: [`.ts`, `.tsx`],
  moduleDirectories: [`node_modules`],
  moduleNameMapper: {
    /**
     * Jest doesn't understand .js extension with es modules
     */
    '^(\\.{1,2}/.*)\\.js$': `$1`,

    /**
     * Jest doesn't understand # in import maps
     */
    '#ansi-styles': `<rootDir>/node_modules/chalk/source/vendor/ansi-styles/index.js`,
    '#supports-color': `<rootDir>/node_modules/chalk/source/vendor/supports-color/index.js`,

    /**
     * Packages
     */
    '@roots/bud$': `<rootDir>/sources/@roots/bud/src/index.ts`,
    '@roots/bud/bud$': `<rootDir>/sources/@roots/bud/src/bud.ts`,
    '@roots/bud/cli$': `<rootDir>/sources/@roots/bud/src/cli/index.ts`,
    '@roots/bud/factory$': `<rootDir>/sources/@roots/bud/src/factory/index.ts`,
    '@roots/bud/services/env': `<rootDir>/sources/@roots/bud/src/services/env/index.ts`,
    '@roots/bud/services/project': `<rootDir>/sources/@roots/bud/src/services/project/index.ts`,
    '@roots/bud-api$': `<rootDir>/sources/@roots/bud-api/src/index.ts`,
    '@roots/bud-api/methods$': `<rootDir>/sources/@roots/bud-api/src/methods/index.ts`,
    '@roots/bud-babel$': `<rootDir>/sources/@roots/bud-babel/src/index.ts`,
    '@roots/bud-build$': `<rootDir>/sources/@roots/bud-build/src/index.ts`,
    '@roots/bud-build/loader$': `<rootDir>/sources/@roots/bud-build/src/loader/index.ts`,
    '@roots/bud-build/item$': `<rootDir>/sources/@roots/bud-build/src/loader/item.ts`,
    '@roots/bud-build/rule$': `<rootDir>/sources/@roots/bud-build/src/loader/rule.ts`,
    '@roots/bud-cache$': `<rootDir>/sources/@roots/bud-cache/src/index.ts`,
    '@roots/bud-client$': `<rootDir>/sources/@roots/bud-client/src/index.ts`,
    '@roots/bud-compiler$': `<rootDir>/sources/@roots/bud-compiler/src/index.ts`,
    '@roots/bud-compress$': `<rootDir>/sources/@roots/bud-compress/src/index.ts`,
    '@roots/bud-criticalcss$': `<rootDir>/sources/@roots/bud-criticalcss/src/index.ts`,
    '@roots/bud-dashboard$': `<rootDir>/sources/@roots/bud-dashboard/src/index.ts`,
    '@roots/bud-emotion$': `<rootDir>/sources/@roots/bud-emotion/src/index.ts`,
    '@roots/bud-entrypoints$': `<rootDir>/sources/@roots/bud-entrypoints/src/index.ts`,
    '@roots/bud-esbuild$': `<rootDir>/sources/@roots/bud-esbuild/src/index.ts`,
    '@roots/bud-eslint$': `<rootDir>/sources/@roots/bud-eslint/src/index.ts`,
    '@roots/bud-extensions$': `<rootDir>/sources/@roots/bud-extensions/src/index.ts`,
    '@roots/bud-extensions/cdn$': `<rootDir>/sources/@roots/bud-extensions/src/extensions/cdn/index.ts`,
    '@roots/bud-extensions/esm$': `<rootDir>/sources/@roots/bud-extensions/src/extensions/esm/index.ts`,
    '@roots/bud-extensions/copy-webpack-plugin$': `<rootDir>/sources/@roots/bud-extensions/src/extensions/copy-webpack-plugin/index.ts`,
    '@roots/bud-extensions/fix-style-only-entrypoints$': `<rootDir>/sources/@roots/bud-extensions/src/extensions/fix-style-only-entrypoints/index.ts`,
    '@roots/bud-extensions/html-webpack-plugin$': `<rootDir>/sources/@roots/bud-extensions/src/extensions/html-webpack-plugin/index.ts`,
    '@roots/bud-extensions/interpolate-html-webpack-plugin$': `<rootDir>/sources/@roots/bud-extensions/src/extensions/interpolate-html-webpack-plugin/index.ts`,
    '@roots/bud-extensions/mini-css-extract-plugin$': `<rootDir>/sources/@roots/bud-extensions/src/extensions/mini-css-extract-plugin/index.ts`,
    '@roots/bud-extensions/webpack-define-plugin$': `<rootDir>/sources/@roots/bud-extensions/src/extensions/webpack-define-plugin/index.ts`,
    '@roots/bud-extensions/webpack-hot-module-replacement-plugin$': `<rootDir>/sources/@roots/bud-extensions/src/extensions/webpack-hot-module-replacement-plugin/index.ts`,
    '@roots/bud-extensions/webpack-provide-plugin$': `<rootDir>/sources/@roots/bud-extensions/src/extensions/webpack-provide-plugin/index.ts`,
    '@roots/bud-extensions/webpack-manifest-plugin$': `<rootDir>/sources/@roots/bud-extensions/src/extensions/webpack-manifest-plugin/index.ts`,
    '@roots/bud-framework$': `<rootDir>/sources/@roots/bud-framework/src/index.ts`,
    '@roots/bud-framewor/bud$': `<rootDir>/sources/@roots/bud-framework/src/bud.ts`,
    '@roots/bud-framework/extension$': `<rootDir>/sources/@roots/bud-framework/src/extension/index.ts`,
    '@roots/bud-framework/extension/decorators$': `<rootDir>/sources/@roots/bud-framework/src/extension/decorators/index.ts`,
    '@roots/bud-framework/extension/decorators/(.*)$': `<rootDir>/sources/@roots/bud-framework/src/extension/decorators/$1.ts`,
    '@roots/bud-framework/methods$': `<rootDir>/sources/@roots/bud-framework/src/methods/index.ts`,
    '@roots/bud-framework/service$': `<rootDir>/sources/@roots/bud-framework/src/service.ts`,
    '@roots/bud-framework/services$': `<rootDir>/sources/@roots/bud-framework/src/services/index.ts`,
    '@roots/bud-framework/services/api$': `<rootDir>/sources/@roots/bud-framework/src/services/api.ts`,
    '@roots/bud-framework/services/console$': `<rootDir>/sources/@roots/bud-framework/src/services/console.ts`,
    '@roots/bud-framework/services/extensions$': `<rootDir>/sources/@roots/bud-framework/src/services/extensions.ts`,
    '@roots/bud-framework/services/fs$': `<rootDir>/sources/@roots/bud-framework/src/services/fs.ts`,
    '@roots/bud-hooks$': `<rootDir>/sources/@roots/bud-hooks/src/index.ts`,
    '@roots/bud-imagemin$': `<rootDir>/sources/@roots/bud-imagemin/src/index.ts`,
    '@roots/bud-mdx$': `<rootDir>/sources/@roots/bud-mdx/src/index.ts`,
    '@roots/bud-postcss$': `<rootDir>/sources/@roots/bud-postcss/src/index.ts`,
    '@roots/bud-preset-recommend$': `<rootDir>/sources/@roots/bud-preset-recommend/src/index.ts`,
    '@roots/bud-preset-wordpress$': `<rootDir>/sources/@roots/bud-preset-wordpress/src/index.ts`,
    '@roots/bud-prettier$': `<rootDir>/sources/@roots/bud-prettier/src/index.ts`,
    '@roots/bud-purgecss$': `<rootDir>/sources/@roots/bud-purgecss/src/index.ts`,
    '@roots/bud-react$': `<rootDir>/sources/@roots/bud-react/src/index.ts`,
    '@roots/bud-sass$': `<rootDir>/sources/@roots/bud-sass/src/index.ts`,
    '@roots/bud-server$': `<rootDir>/sources/@roots/bud-server/src/index.ts`,
    '@roots/bud-server/service$': `<rootDir>/sources/@roots/bud-server/src/service/service.ts`,
    '@roots/sage$': `<rootDir>/sources/@roots/sage/src/sage/index.ts`,
    '@roots/sage/client$': `<rootDir>/sources/@roots/sage/src/client/index.ts`,
    '@roots/sage/acorn$': `<rootDir>/sources/@roots/sage/src/acorn/index.ts`,
    '@roots/sage/wp-theme-json$': `<rootDir>/sources/@roots/sage/src/wp-theme-json/index.ts`,
    '@roots/bud-solid$': `<rootDir>/sources/@roots/bud-solid/src/index.ts`,
    '@roots/bud-stylelint$': `<rootDir>/sources/@roots/bud-stylelint/src/index.ts`,
    '@roots/bud-terser$': `<rootDir>/sources/@roots/bud-terser/src/index.ts`,
    '@roots/bud-typescript$': `<rootDir>/sources/@roots/bud-typescript/src/index.ts`,
    '@roots/bud-wordpress-dependencies$': `<rootDir>/sources/@roots/bud-wordpress-dependencies/src/index.ts`,
    '@roots/bud-wordpress-externals$': `<rootDir>/sources/@roots/bud-wordpress-externals/src/index.ts`,
    '@roots/bud-wordpress-manifests$': `<rootDir>/sources/@roots/bud-wordpress-manifests/src/index.ts`,
    '@roots/container$': `<rootDir>/sources/@roots/container/src/index.ts`,
    '@roots/critical-css-webpack-plugin$': `<rootDir>/sources/@roots/critical-css-webpack-plugin/src/index.ts`,
    '@roots/merged-manifest-webpack-plugin$': `<rootDir>/sources/@roots/merged-manifest-webpack-plugin/src/index.ts`,
    '@roots/filesystem$': `<rootDir>/sources/@roots/filesystem/src/index.ts`,
  },
  modulePathIgnorePatterns: [`<rootDir>/.yarn`, `<rootDir>/storage`],
  reporters: [`default`, `github-actions`],
  rootDir: paths.root,
  testEnvironment: `node`,
  testPathIgnorePatterns: [
    `<rootDir>/build/`,
    `<rootDir>/node_modules/`,
    `<rootDir>/tests/__mocks__`,
    `<rootDir>/storage/`,
  ],
  collectCoverageFrom: [
    `**/sources/@roots/*/src/*.{ts,tsx}`,
    `**/sources/@roots/*/src/*.*.{ts,tsx}`,
    `**/sources/@roots/*/src/**/*.{ts,tsx}`,
    `**/sources/@roots/*/src/**/*.*.{ts,tsx}`,
    `!**/sources/@roots/**/*.test.{ts,tsx}`,
  ],
  coveragePathIgnorePatterns: [
    `/node_modules/`,
    `/__snapshots__/`,
    `/vendor/`,
    `/lib/`,
    `/@repo/`,
    `/tests/`,
    `/__mocks__/`,
    `.js$`,
    `spec.ts$`,
    `types.ts$`,
    `.d.ts$`,
    `interface.ts$`,
    `env.ts$`,
    `/types/`,
    `/deprecated/`,
    `/@roots/bud-support/`,
    `/@roots/dependencies/`,
    /**
     * Currently problematic to unit test these.
     * October 9, 2022
     */
    `/@roots/bud/src/cli/`,
    `/src/bud/commands/`,
  ],
  slowTestThreshold: 10,
  testTimeout: 60 * 1000,

  /**
   * `@swc/jest` transformer
   *
   * @see {@link https://swc.rs/docs/usage/jest}
   */
  transform: {
    '.+\\.(c|m)?(t|j)sx?$': [
      `@swc/jest`,
      {
        jsc: {
          parser: {
            syntax: `typescript`,
            jsx: true,
            dynamicImport: true,
            optionalChaining: true,
            decorators: true,
            importMeta: true,
          },
          target: `es2021`,
        },
        sourceMaps: true,
      },
    ],
  },
  verbose: true,
}

/**
 * Jest configuration
 * @type {() => Promise<import('@jest/types').Config.InitialOptions>}
 */
export default async () => ({
  ...base,
  projects: [
    {
      ...base,
      displayName: `e2e`,
      testMatch: [`**/tests/e2e/**/*.test.ts`],
    },
    {
      ...base,
      displayName: `integration`,
      testMatch: [`**/tests/integration/**/*.test.ts`],
    },
    {
      ...base,
      displayName: `unit:node`,
      collectCoverage: true,
      testMatch: [
        `**/sources/@roots/*/src/*.test.{ts,tsx}`,
        `**/sources/@roots/*/src/**/*.test.{ts,tsx}`,
        `!**/sources/@roots/bud-client/src/**/*.test.{ts,tsx}`,
      ],
    },
    {
      ...base,
      displayName: `unit:dom`,
      collectCoverage: true,
      testEnvironment: `jsdom`,
      testMatch: [`**/sources/@roots/bud-client/src/**/*.test.{ts,tsx}`],
    },
  ],
})
