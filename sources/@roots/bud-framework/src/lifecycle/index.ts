import {isFunction} from 'lodash-es'

import type {Bud} from '../bud.js'
import type * as Config from '../config/index.js'
import type {EventsStore} from '../registry/index.js'
import {bootstrap} from './bootstrap.js'
import {override} from './init.js'

const LIFECYCLE_EVENT_MAP = {
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
 * Lifecycle interface
 *
 * @public
 */
export interface lifecycle {
  (this: Bud, context: Partial<Config.Context>): Promise<Bud>
}

/**
 * Initializes and binds service lifecycle methods
 *
 * @example
 * ```js
 * new BudImplementation(...constructorParams).lifecycle()
 * ```
 *
 * @param this - {@link Bud}
 * @returns Bud
 *
 * @public
 */
export async function lifecycle(
  this: Bud,
  context: Config.Context,
): Promise<Bud> {
  await bootstrap.bind(this)({...context})

  Object.entries(LIFECYCLE_EVENT_MAP).map(([eventHandle, callbackName]) =>
    this.services
      .map(service => [service, this[service]])
      .map(([label, service]) => {
        if (!isFunction(service[callbackName])) return
        this.hooks.action(
          eventHandle as keyof EventsStore,
          service[callbackName].bind(service),
        )
        this.log(
          `registered service callback:`,
          `${label}.${callbackName}`,
        )
      }),
  )

  await [
    `bootstrap`,
    `bootstrapped`,
    `register`,
    `registered`,
    `boot`,
    `booted`,
  ].reduce(async (promised, event: keyof EventsStore) => {
    await promised
    this.log(
      `calling`,
      this.hooks.store[event].length,
      `events registered to`,
      event,
    )
    await this.hooks.fire(event)
  }, Promise.resolve())

  this.hooks.action(`config.after`, override)

  return this
}
