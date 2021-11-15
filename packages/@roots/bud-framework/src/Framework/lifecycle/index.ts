import {isUndefined} from 'lodash'

import {Service} from '../../Service'
import {Framework} from '..'
import {
  DEVELOPMENT_SERVICES,
  LIFECYCLE_EVENTS,
  PARENT_SERVICES,
} from '../constants'

/**
 * Bootstrap interface
 *
 * @internal
 */
export interface lifecycle {
  (this: Framework): Promise<Framework>
}

/**
 * Initializes and binds {@link Framework.services}
 *
 * @example
 * ```js
 * new FrameworkImplementation(...constructorParams).bootstrap()
 * ```
 *
 * @param this - {@link Framework}
 * @returns Framework
 *
 * @public
 */
export async function lifecycle(
  this: Framework,
): Promise<Framework> {
  this.store.set(
    'location.project',
    this.options.config.cli.flags['location.project'] ??
      this.options.config.location.project,
  )

  this.store.set(
    'location.src',
    this.options.config.cli.flags['location.src'] ??
      this.options.config.location.src,
  )

  this.store.set(
    'location.dist',
    this.options.config.cli.flags['location.dist'] ??
      this.options.config.location.dist,
  )

  this.store.set(
    'location.storage',
    this.options.config.cli.flags['location.storage'] ??
      this.options.config.location.storage,
  )

  this.dump(this.store.all(), {prefix: 'store'})

  /**
   * Get bindable services
   */
  const validServices = Object.entries(this.services).filter(
    ([name]): boolean => {
      /**
       * - No reason to start server for production
       * - No reason to boot expensive parent services for child compilation instantances
       */
      return (this.isProduction &&
        DEVELOPMENT_SERVICES.includes(name)) ||
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
    .map(
      ([name, Service]: [
        string,
        new (app: Framework) => Service,
      ]) => {
        this[name] = new Service(this)
        return this[name]
      },
    )

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
          message: `[${i + 1}/${
            eligibleServices.length
          }] ${event}`,
          suffix: service.constructor.name.toLowerCase(),
        })

        await service[event](this)
      }),
    )
  }, Promise.resolve())

  return this
}
