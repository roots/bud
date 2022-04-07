import {lodash} from '@roots/bud-support'

import {Bud} from '..'
import {Service} from '../service'
import {
  DEVELOPMENT_SERVICES,
  LIFECYCLE_EVENTS,
  PARENT_SERVICES,
} from './constants'

const {isUndefined} = lodash

/**
 * Bootstrap interface
 *
 * @internal
 */
export interface lifecycle {
  (this: Bud): Promise<Bud>
}

/**
 * Initializes and binds {@link Bud.services}
 *
 * @example
 * ```js
 * new BudImplementation(...constructorParams).bootstrap()
 * ```
 *
 * @param this - {@link Bud}
 * @returns Bud
 *
 * @public
 */
export async function lifecycle(this: Bud): Promise<Bud> {
  this.logger.instance.time(`building ${this.name}`)

  /**
   * Get bindable services
   */
  const validServices = Object.entries(this.options.services).filter(
    ([name]): boolean => {
      /**
       * - No reason to start server for production
       * - No reason to boot expensive parent services for child compilation instantances
       */
      return (this.isProduction && DEVELOPMENT_SERVICES.includes(name)) ||
        (!this.isRoot && PARENT_SERVICES.includes(name))
        ? false
        : true
    },
  )

  /**
   * Initialize services
   */
  const initializedServices = validServices
    .filter(([name]) => isUndefined(this[name]))
    .map(([name, Service]) => {
      this[name] = new (Service as any)(this)
      return this[name]
    })

  /**
   * Service lifecycle
   */
  await LIFECYCLE_EVENTS.reduce(async (promised, event, i) => {
    await promised

    const eligibleServices = initializedServices.filter(
      service => service[event],
    )

    if (!eligibleServices.length) return

    await Promise.all(
      eligibleServices.map(async (service: Service, i) => {
        this.await({
          message: `[${i + 1}/${eligibleServices.length}] ${event}`,
          suffix: service.constructor.name.toLowerCase(),
        })

        await service[event](this)

        this.success({
          message: `[${i + 1}/${eligibleServices.length}] ${event}`,
          suffix: service.constructor.name.toLowerCase(),
        })
      }),
    )
  }, Promise.resolve())

  this.timeEnd(`building ${this.name}`)

  return this
}
