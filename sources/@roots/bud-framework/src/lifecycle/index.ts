import {isFunction} from 'lodash-es'

import type {Bud} from '../bud.js'
import type * as Config from '../config/index.js'
import type {EventsStore} from '../registry/index.js'
import {bootstrap} from './bootstrap.js'
import {override} from './init.js'

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
 * Lifecycle interface
 *
 * @public
 */
export interface lifecycle {
  (context: Partial<Config.Context>, bud: Bud): Promise<Bud>
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
  context: Config.Context,
  bud: Bud,
): Promise<Bud> {
  await bootstrap.bind(bud)({...context})

  Object.entries(LIFECYCLE_EVENT_MAP).map(([eventHandle, callbackName]) =>
    bud.services
      .map(service => [service, bud[service]])
      .map(([label, service]) => {
        if (!isFunction(service[callbackName])) return
        bud.hooks.action(
          eventHandle as keyof EventsStore,
          service[callbackName].bind(service),
        )
        bud.log(`registered service callback:`, `${label}.${callbackName}`)
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
    bud.log(
      `calling`,
      bud.hooks.store[event].length,
      `events registered to`,
      event,
    )
    await bud.hooks.fire(event)
  }, Promise.resolve())

  bud.hooks.action(`config.after`, override)

  return bud
}
