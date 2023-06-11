/* eslint-disable no-console */

import type {Bud} from '@roots/bud-framework'
import type {
  MultiCompiler,
  StatsCompilation,
  StatsModule,
} from '@roots/bud-framework/config'
import type {MiddlewareFactory} from '@roots/bud-server/middleware'
import type {Payload} from '@roots/bud-server/middleware/hot'
import type {RequestHandler} from '@roots/bud-support/express'
import type {Handler} from 'express-serve-static-core'

import {HotEventStream} from '@roots/bud-server/middleware/hot'
import loggerInstance from '@roots/bud-support/logger'

const middlewarePath = `/bud/hot`

let latestStats = null
let closed = false
let logger: typeof loggerInstance

export const factory: MiddlewareFactory = (app: Bud) => {
  logger = loggerInstance.scope(app.label, `hmr`) as typeof logger
  return makeHandler(app.compiler.instance)
}

export const makeHandler = (compiler: MultiCompiler): Handler => {
  const stream = new HotEventStream()

  const onInvalid = () => {
    if (closed) return
    stream.publish({action: `building`})
  }

  const onDone = (stats: StatsCompilation) => {
    if (closed) return
    latestStats = stats
    publish(`built`, latestStats, stream)
  }

  compiler.hooks.invalid.tap(`bud-hot-middleware`, onInvalid)
  compiler.hooks.done.tap(`bud-hot-middleware`, onDone)

  const middleware: RequestHandler = function (req, res, next) {
    if (closed) return next()

    if (!req.url.endsWith(middlewarePath)) return next()

    stream.handle(req, res)

    if (latestStats) {
      publish(`sync`, latestStats, stream)
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
    // @ts-ignore https://github.com/webpack/tapable/issues/32#issuecomment-350644466
    stream = null
  }

  return middleware
}

export const publish = (
  action: Payload['action'],
  statsCompilation: StatsCompilation,
  stream: HotEventStream,
) => {
  const compilations = collectCompilations(
    statsCompilation.toJson({
      all: false,
      cached: true,
      children: true,
      errors: true,
      hash: true,
      modules: true,
      timings: true,
    }),
  )

  compilations.forEach((stats: StatsCompilation) => {
    const name: string = stats.name ?? statsCompilation.name ?? `unnamed`
    const modules = collectModules(stats.modules)

    logger.log(`built`, name, `(${stats.hash})`, `in`, `${stats.time}ms`)

    stream.publish({
      action,
      errors: stats.errors ?? [],
      hash: stats.hash,
      modules,
      name,
      time: stats.time,
      warnings: stats.warnings ?? [],
    })
  })
}

export const collectModules = (modules: Array<StatsModule>) =>
  modules?.reduce(
    (modules, module) => ({...modules, [module.id]: module.name}),
    {},
  )

export const collectCompilations = (
  stats: StatsCompilation,
): Array<StatsCompilation> => {
  let collection = []

  // Stats has modules, single bundle
  if (stats.modules) collection.push(stats)

  // Stats has children, multiple bundles
  if (stats.children?.length) collection.push(...stats.children)

  // Not sure, assume single
  return collection
}
