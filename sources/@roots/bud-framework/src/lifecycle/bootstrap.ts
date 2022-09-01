import {omit} from 'lodash-es'

import {Bud} from '../bud.js'
import {Logger} from '../logger/index.js'
import * as methods from '../methods/index.js'
import {Module} from '../module.js'
import * as Process from '../process.js'
import type {Service} from '../service'
import type * as Options from '../types/options'
import type * as Registry from '../types/registry'
import {initialize} from './init.js'

export const lifecycleHookHandles: Partial<
  Array<keyof Registry.EventsStore & keyof Registry.EventsStore>
> = [
  `init`,
  `bootstrap`,
  `bootstrapped`,
  `register`,
  `registered`,
  `boot`,
  `booted`,
  `config.after`,
  `compiler.before`,
  `build.before`,
  `build.after`,
  `compiler.after`,
]

export const lifecycleMethods: Partial<Array<keyof Service>> = [
  `init`,
  `bootstrap`,
  `bootstrapped`,
  `register`,
  `registered`,
  `boot`,
  `booted`,
  `configAfter`,
  `compilerBefore`,
  `buildBefore`,
  `buildAfter`,
  `compilerAfter`,
]

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
 * @public
 */
export const LIFECYCLE_EVENT_MAP: Partial<
  Record<keyof Registry.EventsStore, keyof Service>
> = {
  init: `init`,
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
 * Bind framework methods
 * @public
 */
const bindFrameworkMethods = (app: Bud) =>
  Object.entries(methods).map(([key, method]) => {
    app[key] = method.bind(app)
  })

/**
 * Create filter for validating services
 *
 * @param app - Bud instance
 * @returns filter fn
 */
const filterFrameworkServices =
  (app: Bud) =>
  (signifier: string): Boolean =>
    (app.isDevelopment || !DEVELOPMENT_SERVICES.includes(signifier)) &&
    (app.isRoot || !PARENT_SERVICES.includes(signifier))

/**
 * Import and bind framework services
 *
 * @public
 */
const importAndBindFrameworkServices =
  (app: Bud) =>
  async (signifier: string): Promise<void> => {
    const pkg = await import(signifier)
    const imported = pkg?.default ?? pkg
    app[imported.label] = new imported(app)

    app.success(`imported`, imported.label)
    app.info(app[imported.label])

    app.services.push(imported.label)
  }

/**
 * Initialize logger and log initial context
 * @public
 */
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
 * @param this - Bud instance
 * @param context - Bud context
 *
 * @returns void
 */
export const bootstrap = async function (
  this: Bud,
  context: Options.Context,
) {
  this.context = {...context}

  if (!context.label) throw new Error(`options.label is required`)

  /* root specific */
  if (!(context.root instanceof Bud)) {
    // eslint-disable-next-line n/no-process-env
    process.env.NODE_ENV = context.mode
    Process.initialize(this)
  }

  bindFrameworkMethods(this)
  initializeLoggerAndReportContext(this)

  /* initialize module class */
  this.module = new Module(this)

  /* initialize services */
  await Promise.all(
    this.context.services
      .filter(filterFrameworkServices(this))
      .map(importAndBindFrameworkServices(this)),
  )

  return initialize(this)
}
