import type {Registry} from '@roots/bud-framework'
import {prettyFormat, Signale, table} from '@roots/bud-support'
import { cpus } from 'os'

const infrastructureLogger = {
  count: {},
  instance: new Signale({scope: `webpack`}),
}

/**
 * Bud configuration defaults
 *
 * @public
 */
export const seed: Partial<Registry.RegistryStore> = {
  /**
   * Feature flags
   *
   * @public
   */
  'feature.cache': [true],

  /**
   * Clean dist directory prior to compilation
   *
   * @public
   */
  'feature.clean': [false],

  /**
   * Hash emitted filenames
   *
   * @public
   */
  'feature.hash': [false],

  /**
   * Emit an html file during compilation
   *
   * @public
   */
  'feature.html': [false],

  /**
   * Automatically register installed extensions
   *
   * @public
   */
  'feature.inject': [true],

  /**
   * Log build status informatino to the terminal
   *
   * @public
   */
  'feature.log': [false],

  /**
   * Emit a manifest.json with references to emitted assets
   *
   * @public
   */
  'feature.manifest': [true],

  /**
   * @public
   */
  'feature.runtimeChunk': [false],

  /**
   * Enable code splitting
   *
   * @public
   */
  'feature.splitChunks': [false],

  /**
   * Filename format for emitted assets when hashing is disabled
   *
   * @public
   */
  'value.fileFormat': ['[name]'],

  /**
   * Filename format for emitted assets when hashing is enabled
   *
   * @public
   */
  'value.hashFormat': ['[name].[contenthash:6]'],

  /**
   * Regular expression records
   *
   * @public
   */
  'pattern.js': [/\.(cjs|mjs|jsx?)$/],
  'pattern.ts': [/\.(tsx?)$/],
  'pattern.sass': [/\.(scss|sass)$/],
  'pattern.sassModule': [/\.module\.(scss|sass)$/],
  'pattern.css': [/\.css$/],
  'pattern.cssModule': [/\.module\.css$/],
  'pattern.font': [/\.(ttf|otf|eot|woff2?|ico)$/],
  'pattern.html': [/\.(html?)$/],
  'pattern.image': [/\.(png|jpe?g|gif)$/],
  'pattern.modules': [/(node_modules|bower_components)/],
  'pattern.svg': [/\.svg$/],
  'pattern.vue': [/\.vue$/],
  'pattern.md': [/\.md$/],
  'pattern.toml': [/\.toml$/],
  'pattern.webp': [/\.webp$/],
  'pattern.yml': [/\.ya?ml$/],
  'pattern.xml': [/\.xml$/],
  'pattern.csv': [/\.(csv|tsv)$/],
  'pattern.json': [/\.json$/],
  'pattern.json5': [/\.json5$/],

  'location.@src': ['src'],
  'location.@dist': ['dist'],
  'location.@modules': ['node_modules'],
  'location.@storage': ['.budfiles'],

  'build.infrastructureLogging.level': ['error'],
  'build.infrastructureLogging.console': [{
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
    table: (tabularData?: any) =>
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
  }],
  'build.module.noParse': [/jquery|lodash/],
  'build.module.unsafeCache': [false],
  'build.node': [false],
  'build.output.pathinfo': [false],
  'build.output.publicPath': [''],
  'build.optimization.emitOnErrors': [false],
  'build.optimization.minimize': [false],
  'build.optimization.minimizer': [['...']],
  'build.optimization.removeEmptyChunks': [true],
  'build.parallelism': [Math.max(cpus().length - 1, 1)],
  'build.performance': [{hints: false}],
  'build.resolve.extensions': [new Set([
    '.mjs',
    '.cjs',
    '.js',
    '.jsx',
    '.css',
    '.json',
    '.wasm',
    '.yml',
    '.toml',
  ])],
  'build.module.rules.before': [[
    {
      test: /\.(cjs|mjs|jsx?)$/,
      exclude: [/node_modules/],
      parser: {requireEnsure: false},
    },
  ]],
  'build.module.rules.after': [[]],
  'build.stats': [false],

  'dev.middleware.enabled': [['dev', 'hot']],
  'dev.url': [new URL('http://0.0.0.0:3000')],
}
