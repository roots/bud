import {isFunction, isUndefined} from 'lodash-es'

import type {Bud, Config} from '../index.js'
import {bootstrap} from './bootstrap.js'
import {LIFECYCLE_EVENTS} from './constants.js'
import {override} from './init.js'

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

  await LIFECYCLE_EVENTS.reduce(async (promised, event) => {
    await promised

    await Promise.all(
      this.services.map(async service => {
        if (!isFunction(this[service][event])) return
        try {
          await this[service][event](this)
          this.success(`${event}:`, service)
        } catch (err) {
          this.warn(`error executing`, event, `for`, service).error(err)
        }
      }),
    )
  }, Promise.resolve())

  this.services.map(service => {
    !isUndefined(this[service].configAfter) &&
      this.hooks.action(
        `config.after`,
        this[service].configAfter.bind(this[service]),
      ) &&
      this.info(
        this[service].constructor.name,
        `configAfter method registered`,
      )

    !isUndefined(this[service].buildBefore) &&
      this.hooks.action(
        `build.before`,
        this[service].buildBefore.bind(this[service]),
      ) &&
      this.info(
        this[service].constructor.name,
        `buildBefore method registered`,
      )

    !isUndefined(this[service].buildAfter) &&
      this.hooks.action(
        `build.after`,
        this[service].buildAfter.bind(this[service]),
      ) &&
      this.info(
        this[service].constructor.name,
        `buildAfter method registered`,
      )

    !isUndefined(this[service].compilerBefore) &&
      this.hooks.action(
        `compiler.before`,
        this[service].compilerBefore.bind(this[service]),
      ) &&
      this.info(
        this[service].constructor.name,
        `compilerBefore method registered`,
      )

    !isUndefined(this[service].compilerAfter) &&
      this.hooks.action(
        `compiler.after`,
        this[service].compilerAfter.bind(this[service]),
      ) &&
      this.info(
        this[service].constructor.name,
        `compilerAfter method registered`,
      )
  })

  this.hooks.action(`config.after`, override)

  return this
}
