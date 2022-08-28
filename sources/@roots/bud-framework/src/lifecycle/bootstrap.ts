import {omit} from 'lodash-es'

import {Bud, Config} from '../index.js'
import {Logger} from '../logger/index.js'
import * as methods from '../methods/index.js'
import {Module} from '../module.js'
import * as Process from '../process.js'
import {initialize} from './init.js'

/**
 * Services which are only instantiated in the parent compiler context.
 *
 * @public
 */
export const PARENT_SERVICES: Array<string> = [
  `@roots/bud-compiler`,
  `@roots/bud-dashboard`,
  `@roots/bud-server`,
]

/**
 * Services which are only instantiated in development
 *
 * @public
 */
export const DEVELOPMENT_SERVICES: Array<string> = [`@roots/bud-server`]

/**
 * Mapped hooks to callbacks
 */
export const LIFECYCLE_EVENT_MAP = {
  bootstrap: `bootstrap`,
  bootstrapped: `bootstrapped`,
  register: `register`,
  registered: `registered`,
  boot: `boot`,
  booted: `booted`,
  [`config.after`]: `configAfter`,
  [`compiler.before`]: `compilerBefore`,
  [`build.before`]: `buildBefore`,
  [`build.after`]: `buildAfter`,
  [`compiler.after`]: `compilerAfter`,
}

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

    app.success(`imported`, imported.label)
    app.info(app[imported.label])

    app.services.push(imported.label)
  }

const initializeLoggerAndReportContext = (app: Bud) => {
  /* initialize logger */
  app.logger = new Logger(app)

  app.success(`logger ready`)

  Object.entries(omit(app.context, `stdout`, `stdin`, `stderr`))
    .filter(([k, v]) => v !== undefined)
    .map(([k, v]) => app.info(`context`, k, `=>`, v))
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
  this.context = {...context}

  /* copy context object */
  if (!this.context.label) throw new Error(`options.label is required`)

  /* root specific */
  if (!(context.root instanceof Bud)) {
    process.env.NODE_ENV = context.mode
    Process.initialize(this)
  }

  /* bind framework methods */
  Object.entries(methods).map(([key, method]) => {
    this[key] = method.bind(this)
  })

  initializeLoggerAndReportContext(this)

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
