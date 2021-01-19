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

import type {Bud} from '../../../Bud'
import type {Configuration as Cfg} from 'webpack'

/**
 * Bail
 *
 * @default {true}
 * @filter  {webpack.bail}
 * @flags   {--bail}
 */
export const bail = ({hooks, options}: Bud) =>
  hooks.filter(`webpack.bail`, options.get('bail') ?? true)

/**
 * Cache
 *
 * @default {false}
 */
export const cache = (app: Bud) =>
  app.hooks.filter(
    `webpack.cache`,
    app.options.disabled('cache')
      ? false
      : {
          type: 'filesystem',
          name: 'bud',
          cacheLocation: app.disk.path.resolve(
            app.options.get('project'),
            app.options.get('storage'),
          ),
          cacheDirectory: app.disk.path.resolve(
            app.options.get('project'),
            app.options.get('storage'),
          ),
        },
  )

/**
 * Context
 *
 * @filter  {webpack.context}
 * @flags   {--project}
 * @default {process.cwd}
 */
export const context = ({hooks, options}) =>
  hooks.filter(`webpack.context`, options.get('project'))

/**
 * Devtool
 *
 * @default {none}
 */
export const devtool = ({hooks, options}: Bud) =>
  hooks.filter('webpack.devtool', options.get('devtool'))

/**
 * Entry
 *
 * @default {}
 */
export const entry = ({hooks}: Bud) =>
  hooks.filter('webpack.entry', {})

/**
 * Externals
 *
 * @filter  {webpack.externals}
 * @default {}
 */
export const externals = ({hooks}: Bud) =>
  hooks.filter('webpack.externals', {})

/**
 * Infrastructure logging
 *
 * @filter  {webpack.infrastructureLogging}
 * @default {level: none}
 */
export const infrastructureLogging = ({hooks}: Bud) =>
  hooks.filter('webpack.infrastructureLogging', {level: 'none'})

/**
 * Mode
 *
 * @filter  {webpack.mode}
 * @flags   {--mode}
 * @default {'production'}
 */
export const mode = ({hooks, options}: Bud) =>
  hooks.filter(`mode`, options.get('mode') ?? 'production')

/**
 * Name
 */
export const name = ({hooks, options}: Bud) =>
  hooks.filter(
    `webpack.name`,
    options.get('name') ?? '@roots/bud',
  )

/**
 * Optimization
 *
 * @filter {webpack.optimization}
 */
export function optimization(app: Bud) {
  const optimization: Cfg['optimization'] = {
    namedModules: namedModules(app),
    noEmitOnErrors: noEmitOnErrors(app),
  }

  app.options.enabled('runtime') &&
    Object.assign(optimization, {
      runtimeChunk: runtimeChunk(app),
    })

  app.options.enabled('vendor') &&
    Object.assign(optimization, {
      splitChunks: splitChunks(app),
    })

  return app.hooks.filter(`webpack.optimization`, optimization)
}

/**
 * Output
 */
export function output(app: Bud) {
  return app.hooks.filter(`webpack.output`, {
    filename: filename(app),
    path: path(app),
    publicPath: publicPath(app),
  })
}

/**
 * Performance
 */
export const performance = ({hooks, options}: Bud): boolean =>
  hooks.filter(
    `wepback.performance`,
    options.get('webpack.performance') ?? false,
  )

/**
 * Parallelism
 *
 * @filter  {webpack.parallelism}
 * @default {1}
 */
export const parallelism = ({hooks}: Bud) =>
  hooks.filter(`webpack.parallelism`, 1)

/**
 * Profile
 */
export const profile = ({hooks}: Bud) =>
  hooks.filter(`webpack.profile`, false)

/**
 * Records Path
 */
export const recordsPath = (app: Bud) => {
  return app.project(
    app.disk.path.join(
      app.options.get('storage'),
      app.options.get('records'),
    ),
  )
}

/**
 * Resolve
 */
export function resolve(app: Bud) {
  return app.hooks.filter('webpack.resolve', {
    alias: alias(app),
    extensions: extensions(app),
    modules: resolveModules(app),
  })
}

/**
 * Stats
 *
 * @filter  {webpack.stats}
 * @default {false}
 */
export const stats = ({hooks}: Bud) =>
  hooks.filter(`webpack.stats`, false)

/**
 * Target
 *
 * @filter  {webpack.target}
 * @flags   {--target}
 * @default {false}
 */
export const target = ({hooks, options}: Bud) =>
  hooks.filter(
    `webpack.target`,
    options.access('webpack.target') ?? 'web',
  )

/**
 * Watch
 *
 * @filter  {webpack.watch}
 * @flags   {--watch}
 * @default {false}
 */
export const watch = ({hooks, options}: Bud) =>
  hooks.filter(
    `webpack.watch`,
    options.access('webpack.watch') ?? false,
  )

/**
 * Module
 */
export function module(app: Bud) {
  return app.hooks.filter(`webpack.module`, {rules: rules(app)})
}

/**
 * Plugins
 */
export const plugins = ({extensions}: Bud) =>
  extensions.makeAll()
