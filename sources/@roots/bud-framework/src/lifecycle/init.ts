import {cpus} from 'os'
import {join} from 'path'

import type {Bud} from '../bud'

/**
 * Initializes hooks
 *
 * @param app - the Bud instance
 * @returns Promise
 *
 * @public
 */
export const initialize = (app: Bud): Bud =>
  app.hooks
    .fromMap({
      'feature.clean': true,
      'feature.hash': false,
      'feature.manifest': true,
      'feature.runtimeChunk': false,
      'feature.splitChunks': false,

      'value.fileFormat': `[name]`,
      'value.hashFormat': `[name].[contenthash:6]`,

      'pattern.js': /\.(mjs|jsx?)$/,
      'pattern.ts': /\.(tsx?)$/,
      'pattern.sass': /\.(scss|sass)$/,
      'pattern.sassModule': /\.module\.(scss|sass)$/,
      'pattern.css': /\.css$/,
      'pattern.cssModule': /\.module\.css$/,
      'pattern.font': /\.(ttf|otf|eot|woff2?|ico)$/,
      'pattern.html': /\.(html?)$/,
      'pattern.image': /\.(png|jpe?g|gif|webp)$/,
      'pattern.modules': /(node_modules|bower_components)/,
      'pattern.svg': /\.svg$/,
      'pattern.vue': /\.vue$/,
      'pattern.md': /\.md$/,
      'pattern.toml': /\.toml$/,
      'pattern.webp': /\.webp$/,
      'pattern.yml': /\.ya?ml$/,
      'pattern.xml': /\.xml$/,
      'pattern.csv': /\.(csv|tsv)$/,
      'pattern.json': /\.json$/,
      'pattern.json5': /\.json5$/,

      'location.@src': app.context.args.input ?? `src`,
      'location.@dist': app.context.args.output ?? `dist`,
      'location.@storage': app.context.args.storage ?? `.budfiles`,
      'location.@modules': app.context.args.modules ?? `node_modules`,

      'build.bail': app.isProduction,
      'build.cache': () => app.cache.configuration,
      'build.context': () => app.context.basedir,
      'build.externalsType': `var`,
      'build.mode': () => app.mode,
      'build.module.rules.before': () => [
        {
          test: app.hooks.filter(`pattern.js`),
          include: [app.context.basedir],
          parser: {requireEnsure: false},
        },
      ],
      'build.module.rules.after': [],
      'build.module.rules.oneOf': () =>
        Object.values(app.build.rules).map(rule => rule.toWebpack()),
      'build.name': () => app.label,
      'build.output.assetModuleFilename': () =>
        filenameFormat(app, `[ext]`),
      'build.infrastructureLogging.level': `none`,
      'build.module.unsafeCache': false,
      'build.node': false,
      'build.optimization.emitOnErrors': () => app.isDevelopment,
      'build.optimization.minimize': false,
      'build.optimization.removeEmptyChunks': true,
      'build.output.chunkFilename': () => `js/dynamic/[id].js`,
      'build.output.filename': () => join(`js`, filenameFormat(app)),
      'build.output.path': () => app.path(`@dist`),
      'build.output.publicPath': `auto`,
      'build.parallelism': 10 * Math.max(cpus().length - 1, 1),
      'build.performance': {hints: false},
      'build.recordsPath': () =>
        app.path(`@storage`, app.label, `modules.json`),
      'build.resolve.extensions': new Set([
        `.mjs`,
        `.js`,
        `.jsx`,
        `.css`,
        `.json`,
        `.wasm`,
        `.yml`,
      ]),
      'build.stats': {preset: `errors-only`},
      'build.target': () =>
        app.context.manifest?.browserslist
          ? `browserslist:${app.context.config[`package.json`]?.path}`
          : `web`,
    })
    .hooks.fromAsyncMap({
      'build.plugins': async () => await app.extensions.make(),
      'build.resolve.alias': async () => ({
        '@src': app.path(`@src`),
        '@dist': app.path(`@dist`),
      }),
      'build.resolve.modules': async () => [
        app.hooks.filter(`location.@src`),
        app.hooks.filter(`location.@modules`),
      ],
    })
    .when(app.isDevelopment, ({hooks}) =>
      hooks.fromMap({
        'dev.middleware.dev.options.writeToDisk': true,
        'dev.middleware.dev.options.publicPath': () =>
          app.hooks.filter(`build.output.publicPath`),
        'dev.middleware.dev.options.headers': {
          'Access-Control-Allow-Origin': `*`,
          'Access-Control-Allow-Headers': `*`,
          'x-powered-by': `@roots/bud`,
        },
        'dev.middleware.enabled': [`dev`, `hot`],
        'dev.url': new URL(`http://0.0.0.0:3000`),
        'dev.watch.files': new Set([]),
        'dev.watch.options': {},
      }),
    )

/**
 * Filename
 *
 * @param app - Bud
 * @param extension - Filename extension
 *
 * @returns filename format
 *
 * @public
 */
export const filenameFormat = (app: Bud, extension?: string): string => {
  if (!extension) {
    extension = app.hooks.filter(`build.experiments.outputModule`)
      ? `.mjs`
      : `.js`
  }

  return app.hooks.filter(`feature.hash`)
    ? app.hooks.filter(`value.hashFormat`).concat(extension)
    : app.hooks.filter(`value.fileFormat`).concat(extension)
}
