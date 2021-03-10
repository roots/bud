import {
  namedModules,
  noEmitOnErrors,
  runtimeChunk,
  splitChunks,
} from './optimization'
import {filename, path, publicPath} from './output'
import {
  alias,
  extensions,
  modules as resolveModules,
} from './resolve'
import {rules} from './module/rules'
import * as nodeSettings from './node'
import type {Framework} from '@roots/bud-framework'
import type {Configuration as Cfg} from 'webpack'

/**
 * Bail
 *
 * @default {true}
 * @filter  {webpack.bail}
 * @flags   {--bail}
 */
export const bail = ({hooks, store}: Framework) =>
  hooks.filter(`webpack.bail`, store.get('options.bail') ?? true)

/**
 * Cache
 *
 * @default {false}
 */
export const cache = ({disk, hooks, store}: Framework) =>
  hooks.filter(
    `webpack.cache`,
    store.disabled('options.cache')
      ? false
      : {
          type: 'filesystem',
          name: 'bud',
          cacheLocation: disk.path.resolve(
            store.get('locations.project'),
            store.get('locations.storage'),
            'cache',
          ),
          cacheDirectory: disk.path.resolve(
            store.get('locations.project'),
            store.get('locations.storage'),
          ),
          ...store.get('options.cache'),
        },
  )

/**
 * Context
 *
 * @filter  {webpack.context}
 * @flags   {--project}
 * @default {process.cwd}
 */
export const context = ({hooks, store}) =>
  hooks.filter(`webpack.context`, store.get('locations.project'))

/**
 * Devtool
 *
 * @default {none}
 */
export const devtool = ({hooks, store}: Framework) =>
  hooks.filter('webpack.devtool', store.get('options.devtool'))

/**
 * Entry
 *
 * @default {}
 */
export const entry = ({hooks, store}: Framework) =>
  hooks.filter('webpack.entry', store.get('options.entry'))

/**
 * Externals
 *
 * @filter  {webpack.externals}
 * @default {}
 */
export const externals = ({hooks, store}: Framework) =>
  hooks.filter(
    'webpack.externals',
    store.get('options.externals'),
  )

/**
 * Infrastructure logging
 *
 * @filter  {webpack.infrastructureLogging}
 * @default {level: none}
 */
export const infrastructureLogging = ({hooks}: Framework) =>
  hooks.filter('webpack.infrastructureLogging', {
    level: 'none',
  })

/**
 * Mode
 *
 * @filter  {webpack.mode}
 * @flags   {--mode}
 * @default {'production'}
 */
export const mode = ({hooks, mode}: Framework) =>
  hooks.filter(`mode`, mode) ?? 'production'

/**
 * Name
 */
export const name = ({hooks, name, store}: Framework) =>
  hooks.filter(`webpack.name`, store.get('options.name'))

/**
 * Node
 */
export const node = ({hooks}: Framework) =>
  hooks.filter('webpack.node', nodeSettings)

/**
 * Optimization
 *
 * @filter {webpack.optimization}
 */
export function optimization(app: Framework) {
  const optimization: Cfg['optimization'] = {
    namedModules: namedModules(app),
    noEmitOnErrors: noEmitOnErrors(app),
  }

  app.store.enabled('options.runtimeChunk.enabled') &&
    Object.assign(optimization, {
      runtimeChunk: runtimeChunk(app),
    })

  app.store.enabled('options.splitChunks.enabled') &&
    Object.assign(optimization, {
      splitChunks: splitChunks(app),
    })

  return app.hooks.filter(`webpack.optimization`, optimization)
}

/**
 * Output
 */
export function output(app: Framework) {
  return app.hooks.filter(`webpack.output`, {
    filename: filename(app),
    path: path(app),
    publicPath: publicPath(app),
  })
}

/**
 * Performance
 */
export const performance = ({
  hooks,
  store,
}: Framework): boolean =>
  hooks.filter(
    'wepback.performance',
    store.get('options.performance'),
  )

/**
 * Parallelism
 *
 * @filter  {webpack.parallelism}
 * @default {1}
 */
export const parallelism = ({hooks, store}: Framework) =>
  hooks.filter(
    'webpack.parallelism',
    store.get('options.parallelism'),
  )

/**
 * Profile
 */
export const profile = ({hooks, store}: Framework) =>
  hooks.filter('webpack.profile', store.get('options.profile'))

/**
 * Records Path
 */
export const recordsPath = (app: Framework) =>
  app.project(
    app.disk.path.join(
      app.store.get('locations.storage'),
      app.store.get('locations.records'),
    ),
  )

/**
 * Resolve
 */
export const resolve = (app: Framework) =>
  app.hooks.filter('options.resolve', {
    alias: alias(app),
    extensions: extensions(app),
    modules: resolveModules(app),
  })

/**
 * Stats
 *
 * @filter  {webpack.stats}
 * @default {false}
 */
export const stats = ({hooks, store}: Framework) =>
  hooks.filter('webpack.stats', store.get('options.stats'))

/**
 * Target
 *
 * @filter  {webpack.target}
 * @flags   {--target}
 * @default {false}
 */
export const target = ({hooks, store}: Framework) =>
  hooks.filter(`webpack.target`, store.get('options.target'))

/**
 * Watch
 *
 * @filter  {webpack.watch}
 * @flags   {--watch}
 * @default {false}
 */
export const watch = ({hooks, isDevelopment}: Framework) =>
  hooks.filter(`webpack.watch`, isDevelopment ? true : false)

/**
 * Watch options
 *
 * @filter  {webpack.watchOptions}
 * @flags   {--watch}
 * @default {false}
 */
export const watchOptions = ({hooks, store}: Framework) =>
  hooks.filter(`webpack.watchOptions`, {
    ignored: [store.get('patterns.modules')],
    poll: 1000,
  })

/**
 * Module
 */
export function module(app: Framework) {
  return app.hooks.filter(`webpack.module`, {rules: rules(app)})
}

/**
 * Plugins
 */
export const plugins = ({extensions}: Framework) =>
  extensions.makeAll()
