import type {Bud, BudService, Registry} from '@roots/bud-framework'

import args from '@roots/bud-framework/bootstrap/args'
import {paths} from '@roots/bud-framework/bootstrap/paths'
import camelCase from '@roots/bud-support/camelCase'
import isString from '@roots/bud-support/isString'
import logger from '@roots/bud-support/logger'

import {FS} from '../fs.js'
import {Module} from '../module.js'
import {Notifier} from '../notifier.js'

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
export const lifecycle: Record<
  `${keyof Registry.Events & string}`,
  `${keyof BudService & string}`
> = {
  boot: `boot`,
  bootstrap: `bootstrap`,
  'build.after': `buildAfter`,
  'build.before': `buildBefore`,
  'compiler.before': `compilerBefore`,
  'compiler.done': `compilerDone`,
  'config.after': `configAfter`,
  'config.before': `configBefore`,
  register: `register`,
  'server.after': `serverAfter`,
  'server.before': `serverBefore`,
}

export const services: Set<string> = new Set()

/**
 * Define a filter function to validate services based on the current application context.
 * This function returns true if the service is valid in the current context, false otherwise.
 *
 * @param app - Bud instance
 * @returns filter function
 */
const filterServices =
  (app: Bud) =>
  (signifier: string): boolean => {
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
  (bud: Bud) =>
  async (signifier: `${keyof Bud & string}`): Promise<void> => {
    const Service = await bud.module.import(signifier).catch(bud.catch)

    const value: BudService = new Service(() => bud)
    const handle = (
      value.constructor?.name
        ? camelCase(value.constructor.name)
        : signifier
    ) as `${keyof Bud & string}`

    bud.set(handle, new Service(() => bud), false)

    services.add(handle)
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
export const bootstrap = async (bud: Bud) => {
  bud
    .set(`fs`, new FS(() => bud))
    .set(
      `module`,
      bud.isRoot
        ? new Module({app: () => bud, args, paths})
        : bud.root.module,
    )

  bud.isRoot && (await bud.module.bootstrap(bud))

  await Promise.all(
    [...bud.context.services]
      .filter(filterServices(bud))
      .map(instantiateServices(bud)),
  )

  bud.notifier = new Notifier(() => bud)
  await bud.notifier.make(bud)

  bud.hooks
    .fromMap({
      'location.@dist': bud.context.paths.output,
      'location.@modules': bud.context.paths.modules,
      'location.@src': bud.context.paths.input,
      'location.@storage': bud.context.paths.storage,
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
      'pattern.ts': /\.(m?tsx?)$/,
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
    [...services]
      .map(service => bud[service])
      .filter(Boolean)
      .filter(instance => callbackName in instance)
      .map(instance => {
        logger
          .scope(bud.label, `bootstrap`)
          .log(
            `Registering callback:`,
            `${instance.constructor.name}.${callbackName}`,
          )
        bud.hooks.action(
          eventHandle as `${keyof Registry.Events & string}`,
          instance[callbackName],
        )
      }),
  )

  bud.isRoot && bud.after(bud.module.after)

  services.clear()

  return bud
}
