import figures from '@roots/bud-support/figures'
import camelCase from '@roots/bud-support/lodash/camelCase'
import isFunction from '@roots/bud-support/lodash/isFunction'
import set from '@roots/bud-support/lodash/set'
import chalk from 'chalk'

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
 */
export const PARENT_SERVICES: Array<string> = [
  `@roots/bud-compiler`,
  `@roots/bud-dashboard`,
  `@roots/bud-server`,
]

/**
 * Services which are only instantiated in development
 */
export const DEVELOPMENT_SERVICES: Array<string> = [`@roots/bud-server`]

/**
 * Mapped hooks to callbacks
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
 */
const instantiateServices =
  (app: Bud) =>
  async (signifier: string): Promise<void> => {
    const importedModule = await import(signifier)
    const imported = importedModule?.default ?? importedModule
    const service = new imported(() => app)
    const label = camelCase(service.constructor.name)

    set(app, label, service)
    app.log(
      chalk.blue(`bud.${label}`),
      figures.arrowLeft,
      chalk.cyan(signifier),
    )
    app.services.push(label)
  }

const initializeCoreUtilities = (bud: Bud) => {
  bud.fs = new FS(() => bud)
  bud.module = new Module(() => bud)

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
  Object.assign(this, {}, {context})

  initializeCoreUtilities(this)

  await Promise.all(
    this.context.services
      .filter(filterServices(this))
      .map(instantiateServices(this)),
  )

  initialize(this)
  await this.module.init(this)

  Object.entries(LIFECYCLE_EVENT_MAP).map(
    ([eventHandle, callbackName]: [
      keyof Registry.EventsStore,
      keyof Service,
    ]) =>
      this.services
        .map(service => [service, this[service]])
        .map(([label, service]) => {
          if (!service) {
            this.context.logger.error(
              `service not found: ${label}`,
              this.services,
            )
          }

          if (!isFunction(service[callbackName])) return

          this.hooks.action(
            eventHandle,
            service[callbackName].bind(service),
          )
          this.context.logger.info(
            `${label}.${callbackName}`,
            `bound to`,
            eventHandle,
          )
        }),
  )

  await [
    `init`,
    `bootstrap`,
    `bootstrapped`,
    `register`,
    `registered`,
    `boot`,
    `booted`,
  ].reduce(async (promised, event: keyof Registry.EventsStore) => {
    await promised
    await this.hooks.fire(event, this)
    if (this.api.processQueue && this.api?.queue?.length) {
      this.context.logger.time(`processing queued calls ${event}`)
      await this.api.processQueue()
      this.context.logger.timeEnd(`processing queued calls ${event}`)
    }
  }, Promise.resolve())

  this.after(async bud => {
    await bud.fs.write(bud.module.cacheLocation, {
      version: bud.context.bud.version,
      resolutions: bud.module.resolved,
    })

    this.context.logger.scope(`fs`).time(`writing new checksums`)
    await this.fs.write(
      this.path(`@storage`, `checksum.yml`),
      Object.entries(this.context.files).reduce(
        (acc, [key, {sha1}]) => (!sha1 ? acc : {...acc, [key]: sha1}),
        {},
      ),
    )
    this.context.logger.timeEnd(`writing new checksums`)
  })
}
