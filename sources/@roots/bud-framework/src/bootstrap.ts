import type {Bud, BudService, Registry} from '@roots/bud-framework'

import chalk from '@roots/bud-support/chalk'
import {BudError} from '@roots/bud-support/errors'
import figures from '@roots/bud-support/figures'
import camelCase from '@roots/bud-support/lodash/camelCase'
import isString from '@roots/bud-support/lodash/isString'
import logger from '@roots/bud-support/logger'

import {FS} from './fs.js'
import {Module} from './module.js'
import {Notifier} from './notifier.js'

/**
 * Define the list of lifecycle events that are handled by the system
 */
export const lifecycleHookHandles: Partial<
  Array<`${keyof Registry.EventsStore & string}`>
> = [
  `bootstrap`,
  `register`,
  `boot`,
  `config.after`,
  `compiler.before`,
  `build.before`,
  `build.after`,
  `compiler.done`,
  `server.before`,
  `server.after`,
]

/**
 * Define the corresponding methods in the Service class for each lifecycle event
 */
export const lifecycleMethods: Array<`${keyof BudService}`> = [
  `bootstrap`,
  `register`,
  `boot`,
  `configAfter`,
  `compilerBefore`,
  `buildBefore`,
  `buildAfter`,
  `compilerDone`,
  `serverBefore`,
  `serverAfter`,
]

/**
 * Define the list of services that should only be instantiated in the parent compiler context
 */
export const PARENT_SERVICES = [
  `@roots/bud-compiler`,
  `@roots/bud-dashboard`,
  `@roots/bud-server`,
]

/**
 * Define the list of services that should only be instantiated during development
 */
export const DEVELOPMENT_SERVICES = [`@roots/bud-server`]

/**
 * Map the lifecycle events to their corresponding Service class methods
 */
export const lifecycle = {
  boot: `boot`,
  bootstrap: `bootstrap`,
  'build.after': `buildAfter`,
  'build.before': `buildBefore`,
  'compiler.before': `compilerBefore`,
  'compiler.done': `compilerDone`,
  'config.after': `configAfter`,
  register: `register`,
  'server.after': `serverAfter`,
  'server.before': `serverBefore`,
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
    const Service = await app.module.import(signifier).catch(error => {
      throw error instanceof BudError ? BudError.normalize(error) : error
    })

    let service: BudService

    try {
      service = new Service(() => app)
    } catch (error) {
      const normalError =
        error instanceof BudError ? BudError.normalize(error) : error
      normalError.message = `Error instantiating service ${signifier}: ${normalError.message}`
      return normalError
    }

    const label =
      service.label ?? service.constructor?.name
        ? camelCase(service.constructor.name)
        : signifier

    app[label] = service

    logger.log(
      chalk.blue(`bud.${label}`),
      figures.arrowLeft,
      chalk.cyan(!isString(signifier) ? `[object]` : signifier),
    )

    app.services.push(label)
  }

/**
 * Bootstrap the application. This involves the following steps:
 *
 * - Initialize the application context and an empty list of services
 * - Bind the application's methods to the application context
 * - Instantiate the necessary services and initialize the application
 * - Bind the service's lifecycle methods to the corresponding lifecycle events
 * - Fire lifecycle events in order and process any queued API calls after each event
 * - Write the module's resolutions and file checksums to the filesystem
 *
 * @param bud - Bud instance
 * @returns Promise<void>
 */
export const bootstrap = async function (bud: Bud) {
  bud.fs = new FS(() => bud)
  bud.module = new Module(() => bud)
  await bud.module.bootstrap(bud)

  await Promise.all(
    [...bud.context.services]
      .filter(filterServices(bud))
      .map(instantiateServices(bud)),
  )

  bud.notifier = new Notifier(() => bud)
  await bud.notifier.make(bud)

  bud.hooks
    .fromMap({
      'location.@dist':
        isString(bud.context.output) && bud.context.output !== ``
          ? bud.context.output
          : `dist`,
      'location.@modules': isString(bud.context.modules)
        ? bud.context.modules
        : `node_modules`,
      'location.@os-cache': bud.context.paths?.[`os-cache`],
      'location.@os-config': bud.context.paths?.[`os-config`],
      'location.@os-data': bud.context.paths?.[`os-data`],
      'location.@os-log': bud.context.paths?.[`os-log`],
      'location.@os-temp': bud.context.paths?.[`os-temp`],
      'location.@src':
        isString(bud.context.input) && bud.context.input !== ``
          ? bud.context.input
          : `src`,
      'location.@storage': bud.context.paths?.storage ?? `.bud`,
      'pattern.css': /(?!.*\.module)\.css$/,
      'pattern.cssModule': /\.module\.css$/,
      'pattern.csv': /\.(csv|tsv)$/,
      'pattern.font': /\.(ttf|otf|eot|woff2?|ico)$/,
      'pattern.html': /\.(html?)$/,
      'pattern.image': /\.(png|jpe?g|gif|webp)$/,
      'pattern.js': /\.(mjs|jsx?)$/,
      'pattern.json': /\.json$/,
      'pattern.json5': /\.json5$/,
      'pattern.md': /\.md$/,
      'pattern.modules': /(node_modules|bower_components|vendor)/,
      'pattern.sass': /(?!.*\.module)\.(scss|sass)$/,
      'pattern.sassModule': /\.module\.(scss|sass)$/,
      'pattern.svg': /\.svg$/,
      'pattern.toml': /\.toml$/,
      'pattern.ts': /\.(tsx?)$/,
      'pattern.vue': /\.vue$/,
      'pattern.webp': /\.webp$/,
      'pattern.xml': /\.xml$/,
      'pattern.yml': /\.ya?ml$/,
    })
    .when(bud.isDevelopment, ({hooks}) =>
      hooks.fromMap({
        'dev.middleware.enabled': [`dev`, `hot`],
      }),
    )

  Object.entries(lifecycle).map(([eventHandle, callbackName]) =>
    [...bud.services]
      .map(service => bud[service])
      .filter(Boolean)
      .filter(instance => callbackName in instance)
      .map(instance => {
        bud.hooks.action(
          eventHandle as any,
          instance[callbackName].bind(instance),
        )
      }),
  )

  bud.hooks.action(`compiler.before`, bud.module.compilerBefore)

  const initializeEvents: Array<`${keyof Registry.EventsStore}`> = [
    `bootstrap`,
    `register`,
    `boot`,
  ]

  await initializeEvents.reduce(
    async (promised: Promise<any>, event: any) => {
      try {
        await promised
        await bud.executeServiceCallbacks(event).catch(bud.catch)
      } catch (error) {
        throw error
      }
    },
    Promise.resolve({}),
  )

  bud.after(bud.module.after)
}
