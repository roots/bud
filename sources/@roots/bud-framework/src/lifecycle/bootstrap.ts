import type {Bud, Config} from '../index.js'
import {Logger} from '../logger/index.js'
import * as methods from '../methods/index.js'
import {Module} from '../module.js'
import * as Process from '../process.js'
import {DEVELOPMENT_SERVICES, PARENT_SERVICES} from './constants.js'

/**
 * Create filter for validating services
 *
 * @param app - Bud instance
 * @returns filter fn
 */
const makeServiceFilter =
  (app: Bud) =>
  (signifier: string, ...rest: Array<unknown>): Boolean =>
    (app.isDevelopment || !DEVELOPMENT_SERVICES.includes(signifier)) &&
    (app.isRoot || !PARENT_SERVICES.includes(signifier))

const makeServiceImport =
  (app: Bud) =>
  async (signifier: string, ...rest: Array<unknown>): Promise<void> => {
    const {default: imported} = await import(signifier)
    if (app.services[imported.label]) return

    const instance = new imported(app)
    app.logger.instance.log(`imported`, imported.label, instance)
    app.services[imported.label] = instance
    app[imported.label] = app.services[imported.label]
  }

/**
 * Bootstrap application
 *
 * @param app - Bud instance
 * @param options - Bud options
 *
 * @returns void
 */
export const execute = async (app: Bud, context: Config.Context) => {
  /* reset children */
  app.children = {}

  /* copy context object */
  if (!context.label) throw new Error(`context.label is required`)
  app.context = {...context}

  /* bind framework methods */
  Object.entries(methods).map(([key, method]) => {
    app[key] = method.bind(app)
  })

  /* setup process */
  if (app.isRoot) {
    process.env.NODE_ENV = context.mode
    Process.initialize(app)
  }

  /* initialize logger */
  app.logger = new Logger(app)

  /* initialize module */
  app.module = new Module(app)

  /* initialize services */
  app.log(`initializing services`)
  await Promise.all(
    app.context.services
      .filter(makeServiceFilter(app))
      .map(makeServiceImport(app)),
  )
}
