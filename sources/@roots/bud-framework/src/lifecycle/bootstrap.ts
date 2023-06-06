import {BudError} from '@roots/bud-support/errors'
import figures from '@roots/bud-support/figures'
import camelCase from '@roots/bud-support/lodash/camelCase'
import isFunction from '@roots/bud-support/lodash/isFunction'
import isString from '@roots/bud-support/lodash/isString'
import set from '@roots/bud-support/lodash/set'
import logger from '@roots/bud-support/logger'
import chalk from 'chalk'

import type {Bud} from '../bud.js'
import methods from '../methods/index.js'
import {Module} from '../module.js'
import type {Service} from '../service.js'
import FS from '../services/fs.js'
import type * as Registry from '../types/registry/index.js'

/**
 * Define the list of lifecycle events that are handled by the system
 */
export const lifecycleHookHandles: Partial<
  Array<keyof Registry.EventsStore & keyof Registry.EventsStore>
> = [
  `bootstrap`,
  `register`,
  `boot`,
  `config.after`,
  `compiler.before`,
  `build.before`,
  `build.after`,
  `compiler.after`,
]

/**
 * Define the corresponding methods in the Service class for each lifecycle event
 */
export const lifecycleMethods: Partial<Array<keyof Service>> = [
  `bootstrap`,
  `register`,
  `boot`,
  `configAfter`,
  `compilerBefore`,
  `buildBefore`,
  `buildAfter`,
  `compilerAfter`,
]

/**
 * Define the list of services that should only be instantiated in the parent compiler context
 */
export const PARENT_SERVICES: Array<string> = [
  `@roots/bud-compiler`,
  `@roots/bud-dashboard`,
  `@roots/bud-server`,
]

/**
 * Define the list of services that should only be instantiated during development
 */
export const DEVELOPMENT_SERVICES: Array<string> = [`@roots/bud-server`]

/**
 * Map the lifecycle events to their corresponding Service class methods
 */
export const LIFECYCLE_EVENT_MAP: Partial<
  Record<keyof Registry.EventsStore, keyof Service>
> = {
  bootstrap: `bootstrap`,
  register: `register`,
  boot: `boot`,
  [`config.after`]: `configAfter`,
  [`compiler.before`]: `compilerBefore`,
  [`build.before`]: `buildBefore`,
  [`build.after`]: `buildAfter`,
  [`compiler.after`]: `compilerAfter`,
}

/**
 * Define a filter function to validate services based on the current application context.
 * This function returns true if the service is valid in the current context, false otherwise.
 *
 * @param app - Bud instance
 * @returns filter function
 */
const filterServices =
  (app: Bud) =>
  (signifier: string): Boolean => {
    if (!isString(signifier)) return true

    return (
      (app.isDevelopment || !DEVELOPMENT_SERVICES.includes(signifier)) &&
      (app.isRoot || !PARENT_SERVICES.includes(signifier))
    )
  }

/**
 * Import and instantiate services, then bind them to the application context.
 * If the service signifier is a string, it is imported dynamically; otherwise, it is used directly.
 * Services are assigned a label based on their constructor name and added to the application's list of services.
 *
 * @param app - Bud instance
 * @returns function to instantiate a service
 */
const instantiateServices =
  (app: Bud) =>
  async (signifier: string): Promise<void> => {
    const importedModule = !isString(signifier)
      ? signifier
      : await import(signifier)
    const imported = importedModule?.default ?? importedModule
    if (!imported) {
      throw new BudError(`Service not found: ${signifier}`)
    }

    let service: Service
    try {
      service = new imported(() => app)
    } catch {
      service = imported
      service._app = () => app
    }

    const label =
      service.label ?? service.constructor?.name
        ? camelCase(service.constructor.name)
        : signifier

    set(app, label, service)

    app.log(
      chalk.blue(`bud.${label}`),
      figures.arrowLeft,
      chalk.cyan(!isString(signifier) ? `[object]` : signifier),
    )

    app.services.push(label)
  }

/**
 * Bootstrap the application. This involves the following steps:
 * - Initialize the application context and an empty list of services
 * - Bind the application's methods to the application context
 * - Instantiate the necessary services and initialize the application
 * - Bind the service's lifecycle methods to the corresponding lifecycle events
 * - Fire lifecycle events in order and process any queued API calls after each event
 * - Write the module's resolutions and file checksums to the filesystem
 *
 * @param this - Bud instance
 * @param context - Bud context
 *
 * @returns Promise<void>
 */
export const bootstrap = async function (this: Bud) {
  Object.entries(methods).map(([handle, value]) => {
    this.set(handle as `${keyof Bud & string}`, value)
  })

  logger.time(`initialize`)

  await Promise.all(
    [FS, Module, ...this.context.services]
      .filter(filterServices(this))
      .map(instantiateServices(this)),
  )

  this.hooks
    .fromMap({
      'pattern.js': /\.(mjs|jsx?)$/,
      'pattern.ts': /\.(tsx?)$/,
      'pattern.sass': /(?!.*\.module)\.(scss|sass)$/,
      'pattern.sassModule': /\.module\.(scss|sass)$/,
      'pattern.css': /(?!.*\.module)\.css$/,
      'pattern.cssModule': /\.module\.css$/,
      'pattern.font': /\.(ttf|otf|eot|woff2?|ico)$/,
      'pattern.html': /\.(html?)$/,
      'pattern.image': /\.(png|jpe?g|gif|webp)$/,
      'pattern.modules': /(node_modules|bower_components)/,
      'pattern.svg': /\.svg$/,
      'pattern.vue': /\.vue$/,
      'pattern.md': /\.md$/,
      'pattern.toml': /\.toml$/,
      'pattern.webp': /\.webp$/,
      'pattern.yml': /\.ya?ml$/,
      'pattern.xml': /\.xml$/,
      'pattern.csv': /\.(csv|tsv)$/,
      'pattern.json': /\.json$/,
      'pattern.json5': /\.json5$/,
    })
    .hooks.fromMap({
      'location.@src': isString(this.context.input)
        ? this.context.input
        : `src`,
      'location.@dist': isString(this.context.output)
        ? this.context.output
        : `dist`,
      'location.@storage': this.context.paths.storage,
      'location.@modules': isString(this.context.modules)
        ? this.context.modules
        : `node_modules`,
      'location.@os-cache': this.context.paths[`os-cache`],
      'location.@os-config': this.context.paths[`os-config`],
      'location.@os-data': this.context.paths[`os-data`],
      'location.@os-log': this.context.paths[`os-log`],
      'location.@os-temp': this.context.paths[`os-temp`],
    })
    .when(this.isDevelopment, ({hooks}) =>
      hooks.fromMap({
        'dev.middleware.enabled': [`dev`, `hot`],
      }),
    )

  Object.entries(LIFECYCLE_EVENT_MAP).map(
    ([eventHandle, callbackName]: [
      keyof Registry.EventsStore,
      keyof Service,
    ]) =>
      this.services
        .map(service => [service, this[service]])
        .map(([label, service]) => {
          if (!service) {
            logger.error(`service not found: ${label}`, this.services)
          }

          if (!isFunction(service[callbackName])) return

          this.hooks.action(
            eventHandle,
            service[callbackName].bind(service),
          )

          logger.info(`${label}.${callbackName}`, `bound to`, eventHandle)
        }),
  )

  await [`bootstrap`, `register`, `boot`].reduce(
    async (promised, event: keyof Registry.EventsStore) => {
      await promised
      await this.hooks.fire(event, this)
      if (this.api.processQueue && this.api?.queue?.length) {
        logger.time(`processing queued calls ${event}`)
        await this.api.processQueue()
        logger.timeEnd(`processing queued calls ${event}`)
      }
    },
    Promise.resolve(),
  )

  /**
   * Checksums
   */
  this.after(async bud => {
    await bud.fs.write(bud.module.cacheLocation, {
      version: bud.context.bud.version,
      resolutions: bud.module.resolved,
    })

    logger.scope(`fs`).time(`writing new checksums`)

    await this.fs.write(
      this.path(`@storage`, `checksum.yml`),
      Object.entries(this.context.files).reduce(
        (acc, [key, {sha1}]) => (!sha1 ? acc : {...acc, [key]: sha1}),
        {},
      ),
    )
    logger.scope(`fs`).timeEnd(`writing new checksums`)
  })
}
