import type {Bud, Config} from '../index.js'
import {Logger} from '../logger/index.js'
import * as methods from '../methods/index.js'
import {Module} from '../module.js'
import * as Process from '../process.js'
import * as args from './args.js'
import {DEVELOPMENT_SERVICES, PARENT_SERVICES} from './constants.js'

/**
 * Create filter for validating services
 *
 * @param app - Bud instance
 * @returns filter fn
 */
const filterServices =
  (app: Bud) =>
  (signifier: string): Boolean =>
    (app.isDevelopment || !DEVELOPMENT_SERVICES.includes(signifier)) &&
    (app.isRoot || !PARENT_SERVICES.includes(signifier))

const importServices =
  (app: Bud) =>
  async (signifier: string): Promise<void> => {
    const {default: imported} = await import(signifier)
    if (app.services[imported.label]) return
    app[imported.label] = new imported(app)

    app.log(`imported`, imported.label)
    app.info(imported.label, app[imported.label])

    app.services.push(imported.label)
  }

/**
 * Bootstrap application
 *
 * @param app - Bud instance
 * @param context - Bud context
 *
 * @returns void
 */
export const execute = async (app: Bud, context: Config.Context) => {
  app.context = args.bootstrap({...context})

  /* copy context object */
  if (!app.context.label) throw new Error(`options.label is required`)

  /* root specific */
  if (!context.root) {
    process.env.NODE_ENV = context.mode
    Process.initialize(app)
  }

  /* bind framework methods */
  Object.entries(methods).map(([key, method]) => {
    app[key] = method.bind(app)
  })

  /* initialize logger */
  app.logger = new Logger(app)

  app.info(`initial context`, app.context)

  /* initialize module */
  app.module = new Module(app)

  /* initialize services */
  await Promise.all(
    app.context.services
      .filter(filterServices(app))
      .map(importServices(app)),
  )

  return app
}
