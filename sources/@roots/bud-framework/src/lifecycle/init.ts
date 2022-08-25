import {isUndefined} from 'lodash-es'
import {cpus} from 'os'

import type {Bud} from '../bud'

/**
 * Initializes hooks
 *
 * @param app - the Bud instance
 * @returns Promise
 *
 * @public
 */
export const initialize = (app: Bud): Bud => {
  app.hooks.fromMap({
    'feature.clean': true,
    'feature.hash': false,
    'feature.manifest': true,
    'feature.runtimeChunk': false,
    'feature.splitChunks': false,

    'value.fileFormat': `[name]`,
    'value.hashFormat': `[name].[contenthash:6]`,

    'pattern.js': /\.(cjs|mjs|jsx?)$/,
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

    'location.@src': `src`,
    'location.@dist': `dist`,
    'location.@storage': `.budfiles`,
    'location.@modules': `node_modules`,

    'build.bail': app.isProduction,
    'build.cache': () => app.cache.configuration,
    'build.context': () => app.context.basedir,
    'build.externalsType': `var`,
    'build.mode': () => app.mode,
    'build.module.rules.before': [],
    'build.module.rules.after': [],
    'build.module.rules.oneOf': () =>
      Object.values(app.build.rules).map(rule => rule.toWebpack()),
    'build.name': () => app.label,
    'build.output.assetModuleFilename': () => filenameFormat(app, `[ext]`),
    'build.infrastructureLogging.level': `none`,
    'build.module.unsafeCache': false,
    'build.node': false,
    'build.optimization.emitOnErrors': () => app.isDevelopment,
    'build.optimization.minimize': false,
    'build.optimization.removeEmptyChunks': true,
    'build.output.chunkFilename': () => `js/dynamic/[id].js`,
    'build.output.filename': () => `js/${filenameFormat(app)}`,
    'build.output.path': () => app.path(`@dist`),
    'build.output.publicPath': `auto`,
    'build.parallelism': 10 * Math.max(cpus().length - 1, 1),
    'build.performance': {hints: false},
    'build.recordsPath': () =>
      app.path(`@storage`, app.label, `modules.json`),
    'build.resolve.extensions': new Set([
      `.mjs`,
      `.cjs`,
      `.js`,
      `.jsx`,
      `.css`,
      `.json`,
      `.wasm`,
      `.yml`,
      `.toml`,
    ]),
    'build.stats': {preset: `errors-only`},
    'build.target': () =>
      app.project.has(`manifest.browserslist`)
        ? `browserslist:${app.root.path(`package.json`)}`
        : `web`,
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
  })

  app.hooks
    .async(`build.plugins`, async () => await app.extensions.make())
    .hooks.async(`build.resolve.alias`, async () => ({
      '@src': app.path(`@src`),
      '@dist': app.path(`@dist`),
    }))
    .hooks.async(`build.resolve.modules`, async (value?: any) => {
      return Array.from(
        new Set([
          ...(value ?? []),
          app.hooks.filter(`location.@src`),
          app.hooks.filter(`location.@modules`),
        ]),
      )
    })

  return app
}

export const override = async (app: Bud): Promise<Bud> => {
  if (isset(app.context.args.publicPath))
    app.hooks.on(`build.output.publicPath`, app.context.args.publicPath)
  else if (isset(app.context.manifest.bud?.publicPath))
    app.hooks.on(
      `build.output.publicPath`,
      app.context.manifest.bud.publicPath,
    )

  if (isset(app.context.args.input))
    app.hooks.on(`location.@src`, app.context.args.input)
  else if (isset(app.context.manifest.bud?.paths?.[`@src`]))
    app.hooks.on(`location.@src`, app.context.manifest.bud.paths[`@src`])

  if (isset(app.context.args.output))
    app.hooks.on(`location.@dist`, app.context.args.output)
  else if (isset(app.context.manifest.bud?.paths?.[`@dist`]))
    app.hooks.on(`location.@dist`, app.context.manifest.bud.paths[`@dist`])

  if (isset(app.context.args.storage))
    app.hooks.on(`location.@storage`, app.context.args.storage)
  else if (isset(app.context.manifest.bud?.paths?.[`@storage`]))
    app.hooks.on(
      `location.@storage`,
      app.context.manifest.bud.paths[`@storage`],
    )

  if (
    isset(app.context.manifest.bud?.cache) &&
    isUndefined(app.context.args.cache)
  )
    app.context.args.cache = app.context.manifest.bud.cache

  if (isset(app.context.args.mode))
    app.hooks.on(`build.mode`, app.context.args.mode)

  if (isset(app.context.args.clean))
    app.hooks.on(`feature.clean`, app.context.args.clean)
  else if (isset(app.context.manifest.bud?.clean))
    app.hooks.on(`feature.clean`, app.context.manifest.bud.clean)

  if (isset(app.context.args.html)) {
    await app.api.call(`template`)
  }

  return app
}

/**
 * Returns true if the given value is neither null nor undefined.
 *
 * @public
 */
const isset = (value: unknown): boolean => !isUndefined(value)

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
