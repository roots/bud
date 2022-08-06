/* eslint-disable no-console */

import type {Bud} from '@roots/bud-framework/src/bud.js'
import type {RequestHandler} from 'express'
import type {Compiler, MultiCompiler, StatsCompilation} from 'webpack'

import type {Payload} from './payload.js'
import {HotEventStream} from './stream.js'

const middlewarePath = '__bud/hmr'

let latestStats = null
let closed = false
let logger: Bud['logger']['instance']

export const makeMiddleware = (app: Bud) => {
  logger = app.logger.makeInstance()
  logger.scope('hot middleware')
  logger.enable()

  return middleware(app.compiler.compilation)
}

const middleware = (compiler: Compiler | MultiCompiler) => {
  const stream = new HotEventStream()

  const onInvalid = () => {
    if (closed) return
    latestStats = null
    stream.publish({action: 'building'})
  }

  const onDone = (stats: StatsCompilation) => {
    if (closed) return
    latestStats = stats
    publish('built', latestStats, stream)
  }

  compiler.hooks.invalid.tap('bud-hot-middleware', onInvalid)
  compiler.hooks.done.tap('bud-hot-middleware', onDone)

  const middleware: RequestHandler = function (req, res, next) {
    if (closed) return next()

    if (!req.url.endsWith(middlewarePath)) return next()

    stream.handle(req, res)

    if (latestStats) {
      // Explicitly not passing in `log` fn as we don't want to log again on
      // the server
      publish('sync', latestStats, stream)
    }
  }

  // @ts-ignore
  middleware.publish = function (payload) {
    if (closed) return
    stream.publish(payload)
  }

  // @ts-ignore
  middleware.close = function () {
    if (closed) return
    closed = true
    stream.close()
  }

  return middleware
}

const publish = (
  action: Payload['action'],
  statsCompilation: StatsCompilation,
  stream: HotEventStream,
) => {
  const bundles = collectCompilations(
    statsCompilation.toJson({
      all: false,
      cached: true,
      children: true,
      modules: true,
      timings: true,
      hash: true,
      errors: true,
    }),
  )

  bundles.forEach((stats: StatsCompilation) => {
    const name: string = stats.name ?? statsCompilation.name ?? 'unnamed'

    const modules: Record<string, string> = stats.modules?.reduce(
      (modules, module) => ({...modules, [module.id]: module.name}),
      {},
    )

    logger.log('built', name, `(${stats.hash})`, 'in', `${stats.time}ms`)

    stream.publish({
      name,
      action,
      time: stats.time,
      hash: stats.hash,
      warnings: stats.warnings || [],
      errors: stats.errors || [],
      modules,
    })
  })
}

const collectCompilations = (
  stats: StatsCompilation,
): Array<StatsCompilation> => {
  // Stats has modules, single bundle
  if (stats.modules) return [stats]

  // Stats has children, multiple bundles
  if (stats.children && stats.children.length) return stats.children

  // Not sure, assume single
  return [stats]
}
