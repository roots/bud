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
    '@roots/bud/services/env': `<rootDir>/sources/@roots/bud/src/services/env/index.ts`,
    '@roots/bud/services/project': `<rootDir>/sources/@roots/bud/src/services/project/index.ts`,
    '@roots/bud/bud$': `<rootDir>/sources/@roots/bud/src/bud.ts`,
    '@roots/bud/extensions/fix-style-only-entrypoints': `<rootDir>/sources/@roots/bud/src/extensions/fix-style-only-entrypoints/index.ts`,
    '@roots/bud-api$': `<rootDir>/sources/@roots/bud-api/src/index.ts`,
    '@roots/bud-api/methods$': `<rootDir>/sources/@roots/bud-api/src/methods/index.ts`,
    '@roots/bud-babel$': `<rootDir>/sources/@roots/bud-babel/src/index.ts`,
    '@roots/bud-build$': `<rootDir>/sources/@roots/bud-build/src/index.ts`,
    '@roots/bud-build/loader$': `<rootDir>/sources/@roots/bud-build/src/loader/loader.ts`,
    '@roots/bud-build/item$': `<rootDir>/sources/@roots/bud-build/src/item/item.ts`,
    '@roots/bud-build/rule$': `<rootDir>/sources/@roots/bud-build/src/rule/rule.ts`,
    '@roots/bud-cache$': `<rootDir>/sources/@roots/bud-cache/src/index.ts`,
    '@roots/bud-client$': `<rootDir>/sources/@roots/bud-client/src/index.ts`,
    '@roots/bud-compiler$': `<rootDir>/sources/@roots/bud-compiler/src/index.ts`,
    '@roots/bud-compress$': `<rootDir>/sources/@roots/bud-compress/src/index.ts`,
    '@roots/bud-criticalcss$': `<rootDir>/sources/@roots/bud-criticalcss/src/index.ts`,
    '@roots/bud-dashboard$': `<rootDir>/sources/@roots/bud-dashboard/src/index.ts`,
    '@roots/bud-entrypoints$': `<rootDir>/sources/@roots/bud-entrypoints/src/index.ts`,
    '@roots/bud-esbuild$': `<rootDir>/sources/@roots/bud-esbuild/src/index.ts`,
    '@roots/bud-eslint$': `<rootDir>/sources/@roots/bud-eslint/src/index.ts`,
    '@roots/bud-extensions$': `<rootDir>/sources/@roots/bud-extensions/src/index.ts`,
    '@roots/bud-framework$': `<rootDir>/sources/@roots/bud-framework/src/index.ts`,
    '@roots/bud-framework/extension$': `<rootDir>/sources/@roots/bud-framework/src/extension/index.ts`,
    '@roots/bud-framework/extension/decorators$': `<rootDir>/sources/@roots/bud-framework/src/extension/decorators/index.ts`,
    '@roots/bud-framework/extension/decorators/(.*)$': `<rootDir>/sources/@roots/bud-framework/src/extension/decorators/$1.ts`,
    '@roots/bud-framework/methods$': `<rootDir>/sources/@roots/bud-framework/src/methods/index.ts`,
    '@roots/bud-framework/methods/(.*)$': `<rootDir>/sources/@roots/bud-framework/src/methods/$1.ts`,
    '@roots/bud-framework/services$': `<rootDir>/sources/@roots/bud-framework/src/services/index.ts`,
    '@roots/bud-framework/services/api$': `<rootDir>/sources/@roots/bud-framework/src/services/api.ts`,
    '@roots/bud-framework/services/console$': `<rootDir>/sources/@roots/bud-framework/src/services/console.ts`,
    '@roots/bud-framework/services/extensions$': `<rootDir>/sources/@roots/bud-framework/src/services/extensions.ts`,
    '@roots/bud-framework/services/fs$': `<rootDir>/sources/@roots/bud-framework/src/services/fs.ts`,
    '@roots/bud-hooks$': `<rootDir>/sources/@roots/bud-hooks/src/index.ts`,
    '@roots/bud-postcss$': `<rootDir>/sources/@roots/bud-postcss/src/index.ts`,
    '@roots/bud-preset-recommend': `<rootDir>/sources/@roots/bud-preset-recommend/src/index.ts`,
    '@roots/bud-preset-wordpress': `<rootDir>/sources/@roots/bud-preset-wordpress/src/index.ts`,
    '@roots/bud-react$': `<rootDir>/sources/@roots/bud-react/src/index.ts`,
    '@roots/bud-react/babel-refresh$': `<rootDir>/sources/@roots/bud-react/src/babel-refresh/index.ts`,
    '@roots/bud-react/react-refresh$': `<rootDir>/sources/@roots/bud-react/src/react-refresh/index.ts`,
    '@roots/bud-react/swc-refresh$': `<rootDir>/sources/@roots/bud-react/src/swc-refresh/index.ts`,
    '@roots/bud-react/typescript-refresh$': `<rootDir>/sources/@roots/bud-react/src/typescript-refresh/index.ts`,
    '@roots/sage$': `<rootDir>/sources/@roots/sage/src/index.ts`,
    '@roots/sage/client$': `<rootDir>/sources/@roots/sage/src/client/index.ts`,
    '@roots/sage/acorn$': `<rootDir>/sources/@roots/sage/src/acorn/extension.ts`,
    '@roots/sage/wp-theme-json$': `<rootDir>/sources/@roots/sage/src/wp-theme-json/extension.ts`,
    '@roots/bud-purgecss': `<rootDir>/sources/@roots/bud-purgecss/src/index.ts`,
    '@roots/bud-sass$': `<rootDir>/sources/@roots/bud-sass/src/index.ts`,
    '@roots/bud-server$': `<rootDir>/sources/@roots/bud-server/src/index.ts`,
    '@roots/bud-server/service$': `<rootDir>/sources/@roots/bud-server/src/service/service.ts`,
    '@roots/bud-support/lodash-es': `<rootDir>/sources/@roots/bud-support/src/dependencies/lodash-es/index.ts`,
    '@roots/bud-terser$': `<rootDir>/sources/@roots/bud-terser/src/index.ts`,
    '@roots/bud-wordpress-dependencies$': `<rootDir>/sources/@roots/bud-wordpress-dependencies/src/index.ts`,
    '@roots/bud-wordpress-externals$': `<rootDir>/sources/@roots/bud-wordpress-externals/src/index.ts`,
    '@roots/bud-wordpress-manifests$': `<rootDir>/sources/@roots/bud-wordpress-manifests/src/index.ts`,
    '@roots/container$': `<rootDir>/sources/@roots/container/src/index.ts`,
    '@roots/critical-css-webpack-plugin': `<rootDir>/sources/@roots/critical-css-webpack-plugin/src/index.ts`,
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
    '^.+\\.(c|m)?(t|j)sx?$': [
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
