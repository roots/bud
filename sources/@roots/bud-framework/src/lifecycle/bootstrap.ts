import {camelCase, set} from '@roots/bud-support/lodash-es'

import type {Bud} from '../bud.js'
import * as methods from '../methods/index.js'
import {Module} from '../module.js'
import type {Service} from '../service.js'
import FS from '../services/fs.js'
import type * as Options from '../types/options/index.js'
import type * as Registry from '../types/registry/index.js'
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

/**
 * Import and bind framework services
 *
 * @public
 */
const instantiateServices =
  (app: Bud) =>
  async (signifier: string): Promise<void> => {
    const importedModule = await import(signifier)
    const imported = importedModule?.default ?? importedModule
    const service = new imported(() => app)
    const label = camelCase(service.constructor.name)

    set(app, label, service)
    app.success(`instantiated`, label, `from`, signifier)
    app.services.push(label)
  }

const initializeCoreUtilities = (bud: Bud) => {
  bud.fs = new FS(() => bud)
  Object.entries(methods).map(([fn, method]) => {
    bud[fn] = method.bind(bud)
  })
  bud.context.logger.time(`initialize`)
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

  initializeCoreUtilities(this)

  /* root specific */
  if (this.isRoot) {
    // eslint-disable-next-line n/no-process-env
    process.env.NODE_ENV = context.mode
  }

  /* initialize module class */
  this.module = new Module(() => this)

  /* initialize services */
  await Promise.all(
    this.context.services
      .filter(filterServices(this))
      .map(instantiateServices(this)),
  )

  return initialize(this)
}
