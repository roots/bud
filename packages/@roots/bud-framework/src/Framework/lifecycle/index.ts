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
  const logger = this.logger.instance.scope(
    ...this.logger.context,
    'lifecycle',
  )
  logger.time('lifecycle')

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

    logger.time(`lifecycle event: ${event}`)

    await Promise.all(
      eligibleServices.map(async (service: Service, i) => {
        logger.await(
          `[%d/%d] ${service.constructor.name.toLowerCase()}.${event}`,
          i + 1,
          eligibleServices.length,
        )

        await service[event](this)
      }),
    )

    logger.timeEnd(`lifecycle event: ${event}`)
  }, Promise.resolve())

  return this
}
