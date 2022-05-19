import type {Config} from '@roots/bud-framework'
import {prettyFormat, Signale, table} from '@roots/bud-support'
import {cpus} from 'os'

/**
 * Bud configuration defaults
 *
 * @public
 */
export const seed: Config.Options['seed'] = {
  'feature.cache': [() => true],
  'feature.clean': [() => false],
  'feature.hash': [() => false],
  'feature.html': [() => false],
  'feature.inject': [() => true],
  'feature.log': [() => false],
  'feature.manifest': [() => true],
  'feature.runtimeChunk': [() => false],
  'feature.splitChunks': [() => false],

  'value.fileFormat': [() => '[name]'],
  'value.hashFormat': [() => '[name].[contenthash:6]'],

  'pattern.js': [() => /\.(cjs|mjs|jsx?)$/],
  'pattern.ts': [() => /\.(tsx?)$/],
  'pattern.sass': [() => /\.(scss|sass)$/],
  'pattern.sassModule': [() => /\.module\.(scss|sass)$/],
  'pattern.css': [() => /\.css$/],
  'pattern.cssModule': [() => /\.module\.css$/],
  'pattern.font': [() => /\.(ttf|otf|eot|woff2?|ico)$/],
  'pattern.html': [() => /\.(html?)$/],
  'pattern.image': [() => /\.(png|jpe?g|gif|webp)$/],
  'pattern.modules': [() => /(node_modules|bower_components)/],
  'pattern.svg': [() => /\.svg$/],
  'pattern.vue': [() => /\.vue$/],
  'pattern.md': [() => /\.md$/],
  'pattern.toml': [() => /\.toml$/],
  'pattern.webp': [() => /\.webp$/],
  'pattern.yml': [() => /\.ya?ml$/],
  'pattern.xml': [() => /\.xml$/],
  'pattern.csv': [() => /\.(csv|tsv)$/],
  'pattern.json': [() => /\.json$/],
  'pattern.json5': [() => /\.json5$/],

  'location.@src': [() => 'src'],
  'location.@dist': [() => 'dist'],
  'location.@modules': [() => 'node_modules'],
  'location.@storage': [() => '.budfiles'],

  'build.infrastructureLogging.level': [(): 'none' => 'none'],
  'build.infrastructureLogging.console': [
    () => {
      const infrastructureLogger = {
        count: {},
        instance: new Signale().scope('webpack'),
      }

      return {
        Console: require('console'),
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
        info: () => null,
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
      }
    },
  ],
  'build.module.noParse': [() => /jquery|lodash/],
  'build.module.unsafeCache': [() => false],
  'build.node': [() => false],
  'build.output.pathinfo': [() => false],
  'build.output.publicPath': [() => '/'],
  'build.optimization.emitOnErrors': [() => false],
  'build.optimization.minimize': [() => false],
  'build.optimization.minimizer': [() => ['...']],
  'build.optimization.removeEmptyChunks': [() => true],
  'build.parallelism': [() => Math.max(cpus().length - 1, 1)],
  'build.performance': [() => ({hints: false})],
  'build.resolve.extensions': [
    () =>
      new Set([
        '.mjs',
        '.cjs',
        '.js',
        '.jsx',
        '.css',
        '.json',
        '.wasm',
        '.yml',
        '.toml',
      ]),
  ],
  'build.module.rules.before': [
    () => [
      {
        test: /\.(cjs|mjs|jsx?)$/,
        exclude: [/node_modules/],
        parser: {requireEnsure: false},
      },
    ],
  ],
  'build.module.rules.after': [() => []],
  'build.stats': [() => ({preset: 'errors-warnings'})],
  'dev.middleware.enabled': [() => ['dev', 'hot']],
  'dev.url': [() => new URL('http://0.0.0.0:3000')],
}
