import type {Bud, Config} from '../index.js'
import {Logger} from '../logger/index.js'
import * as methods from '../methods/index.js'
import {Module} from '../module.js'
import * as Process from '../process.js'
import {DEVELOPMENT_SERVICES, PARENT_SERVICES} from './constants.js'
import {initialize} from './init.js'

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
    const pkg = await import(signifier)
    const imported = pkg?.default ?? pkg
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
export const bootstrap = async function (
  this: Bud,
  context: Config.Context,
) {
  this.context = {
    ...context,
  }

  /* copy context object */
  if (!this.context.label) throw new Error(`options.label is required`)

  /* root specific */
  if (!context.root) {
    process.env.NODE_ENV = context.mode
    Process.initialize(this)
  }

  /* bind framework methods */
  Object.entries(methods).map(([key, method]) => {
    this[key] = method.bind(this)
  })

  /* initialize logger */
  this.logger = new Logger(this)

  this.log(`initial context`, this.context)

  /* initialize module */
  this.module = new Module(this)

  /* initialize services */
  await Promise.all(
    this.context.services
      .filter(filterServices(this))
      .map(importServices(this)),
  )

  return initialize(this)
}
