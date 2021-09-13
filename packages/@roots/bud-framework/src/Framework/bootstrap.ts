import {Services} from '..'
import {Service} from '../Service'
import {Framework} from './'
import {
  DEVELOPMENT_SERVICES,
  LIFECYCLE_EVENTS,
  PARENT_SERVICES,
} from './constants'

/**
 * Bootstrap interface
 *
 * @internal
 */
export interface bootstrap {
  (this: Framework): Framework
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
export function bootstrap(this: Framework): Framework {
  /**
   * Get bindable services
   */
  const validServices = this.container<Services>({
    ...this.services,
  })
    .getEntries()
    .filter(
      ([name, _service]: [keyof Services, Service]): boolean => {
        /**
         * - No reason to start server for production
         * - No reason to boot expensive parent services for child compilation instantances
         */
        return (this.isProduction &&
          DEVELOPMENT_SERVICES.includes(name)) ||
          (!this.isParent && PARENT_SERVICES.includes(name))
          ? false
          : true
      },
    )

  /**
   * Initialize services
   */
  const initializedServices = validServices.map(
    ([name, Service]: [
      string,
      new (app: Framework) => Service,
    ]) => {
      Object.assign(this, {
        [name]: new Service(this),
      })

      return name
    },
  )

  /**
   * Service lifecycle
   */
  LIFECYCLE_EVENTS.map(event => {
    initializedServices.map(key => {
      const service = this[key]
      if (!service || !service[event]) return

      service[event](this)
    })
  })

  return this
}
