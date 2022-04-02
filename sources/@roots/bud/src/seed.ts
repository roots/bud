import type {Store} from '@roots/bud-framework'
import {prettyFormat, Signale, table} from '@roots/bud-support'
import {cpus} from 'os'

const infrastructureLogger = {
  count: {},
  instance: new Signale({scope: `webpack`}),
}

/**
 * Bud configuration defaults
 *
 * @public
 */
export const seed: Partial<Store.Repository> = {
  /**
   * Feature flags
   *
   * @public
   */
  [`features.cache`]: true,

  /**
   * Clean dist directory prior to compilation
   *
   * @public
   */
  [`features.clean`]: false,

  /**
   * Hash emitted filenames
   *
   * @public
   */
  [`features.hash`]: false,

  /**
   * Emit an html file during compilation
   *
   * @public
   */
  [`features.html`]: false,

  /**
   * Automatically register installed extensions
   *
   * @public
   */
  [`features.inject`]: true,

  /**
   * Log build status informatino to the terminal
   *
   * @public
   */
  [`features.log`]: false,

  /**
   * Emit a manifest.json with references to emitted assets
   *
   * @public
   */
  [`features.manifest`]: true,

  /**
   * @public
   */
  [`features.runtimeChunk`]: false,

  /**
   * Enable code splitting
   *
   * @public
   */
  [`features.splitChunks`]: false,
  /**
   * Filename format for emitted assets when hashing is disabled
   *
   * @public
   */
  fileFormat: `[name]`,

  /**
   * Filename format for emitted assets when hashing is enabled
   *
   * @public
   */
  hashFormat: `[name].[contenthash:6]`,

  /**
   * Regular expression records
   *
   * @public
   */
  patterns: {
    js: /\.(js|jsx)$/,
    ts: /\.(ts|tsx)$/,
    sass: /\.(scss|sass)$/,
    sassModule: /\.module\.(scss|sass)$/,
    css: /\.css$/,
    cssModule: /\.module\.css$/,
    font: /\.(ttf|otf|eot|woff2?|ico)$/,
    html: /\.(html?)$/,
    image: /\.(png|jpe?g|gif)$/,
    modules: /(node_modules|bower_components)/,
    svg: /\.svg$/,
    vue: /\.vue$/,
    md: /\.md$/,
    toml: /\.toml$/,
    webp: /\.webp$/,
    yml: /\.ya?ml$/,
    xml: /\.xml$/,
    csv: /\.(csv|tsv)$/,
    json: /\.json$/,
    json5: /\.json5$/,
  },

  /**
   * Project disk locations
   *
   * @public
   */
  location: {
    '@src': 'src',
    '@dist': 'dist',
    '@modules': 'node_modules',
    '@storage': '.budfiles',
  },

  /**
   * Baseline webpack configuration
   *
   * @public
   */
  [`build.bail`]: app => app.isProduction,
  [`build.context`]: app => app.context.projectDir,
  [`build.infrastructureLogging.level`]: app => `verbose`,
  [`build.infrastructureLogging.console`]: app => ({
    Console: require(`console`),
    assert: (v, m) => v && infrastructureLogger.instance.info(m),
    // eslint-disable-next-line
    clear: () => null,
    count: (label?: string) => {
      infrastructureLogger.count[label] =
        infrastructureLogger.count[label] + 1

      infrastructureLogger.instance.info(
        `${label}: ${infrastructureLogger.count[label]}`,
      )
    },
    countReset: (label?: string) => {
      infrastructureLogger.count[label] = 0
    },
    debug: infrastructureLogger.instance.debug,
    dir: infrastructureLogger.instance.info,
    dirxml: infrastructureLogger.instance.info,
    error: infrastructureLogger.instance.error,
    group: () => null,
    groupCollapsed: () => null,
    groupEnd: () => null,
    info: infrastructureLogger.instance.info,
    log: infrastructureLogger.instance.log,
    table: (tabularData?: any, properties?: string[]) =>
      infrastructureLogger.instance.log(table.table(tabularData)),
    time: infrastructureLogger.instance.time,
    timeEnd: infrastructureLogger.instance.timeEnd,
    timeLog: () => null,
    trace: (message, ...params) =>
      infrastructureLogger.instance.log(
        `Trace: `,
        message ? prettyFormat(message) : ``,
        ...params,
      ),
    warn: infrastructureLogger.instance.warn,
    profile: () => null,
    profileEnd: () => null,
    timeStamp: () => null,
  }),
  [`build.module.noParse`]: app => /jquery|lodash/,
  [`build.module.unsafeCache`]: app => false,
  [`build.node`]: app => false,
  [`build.output.pathinfo`]: app => false,
  [`build.output.publicPath`]: app => ``,
  [`build.optimization.emitOnErrors`]: app => false,
  [`build.optimization.minimize`]: app => false,
  [`build.optimization.minimizer`]: app => [`...`],
  [`build.optimization.removeEmptyChunks`]: app => true,
  [`build.parallelism`]: app => Math.max(cpus().length - 1, 1),
  [`build.performance`]: app => ({hints: false}),
  [`build.resolve.alias`]: app => ({
    '@src': app.path('@src'),
    '@dist': app.path('@dist'),
  }),
  [`build.resolve.extensions`]: app =>
    new Set([
      `.wasm`,
      `.mjs`,
      `.js`,
      `.jsx`,
      `.css`,
      `.json`,
      `.toml`,
      `.yml`,
    ]),
  [`build.module.rules.before`]: app => [
    {
      test: /\.(cjs|mjs|jsx?|tsx?)$/,
      include: [app.path('@src')],
      parser: {requireEnsure: false},
    },
  ],
  [`build.module.rules.after`]: app => [],
  [`build.stats`]: app => `normal`,
}
