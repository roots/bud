import type {Bud, Config, Services} from '../index.js'
import {Logger} from '../logger/index.js'
import * as methods from '../methods/index.js'
import {Module} from '../module.js'
import * as Process from '../process.js'
import type {Service} from '../service.js'
import {DEVELOPMENT_SERVICES, PARENT_SERVICES} from './constants.js'

/**
 * Create filter for validating services
 *
 * @param app - Bud instance
 * @returns filter fn
 */
const makeServiceFilter =
  (app: Bud) =>
  ([name, ...iterable]): Boolean =>
    (app.isDevelopment || !DEVELOPMENT_SERVICES.includes(name)) &&
    (app.isRoot || !PARENT_SERVICES.includes(name))

/**
 * Create initializer for services
 *
 * @param app - Bud instance
 * @returns map fn
 */
const makeServiceInitializer = (app: Bud) => {
  return ([name, Service]): [
    keyof Services.Registry & string,
    Service,
  ] => {
    try {
      app[name] = new Service(app)
      app.success(name)
    } catch (err) {
      app.log(`error creating`, name).error(err)
    }

    return [name, app[name]]
  }
}

/**
 * Create reducer for services
 *
 * @param _app - Bud instance
 * @returns reduce fn
 */
const makeServiceReducer =
  (_app: Bud) =>
  <T extends keyof Bud>(
    a: Partial<Services.Registry>,
    [k, v]: [T, Services.Registry[T]],
  ): Services.Registry => ({...a, [k]: v})

/**
 * Bootstrap application
 *
 * @param app - Bud instance
 * @param options - Bud options
 *
 * @returns void
 */
export const execute = (app: Bud, context: Config.Context) => {
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

  app.log(`initializing services`)

  /* initialize services */
  app.services = Object.entries({...context.services})
    .filter(makeServiceFilter(app))
    .map(makeServiceInitializer(app))
    .reduce(makeServiceReducer(app), {})
}
