import {Services} from '../..'
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
  this.time('lifecycle')

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

  this.container<Services>({
    ...this.services,
  })
    .getKeys()
    .filter(
      (name: keyof Services): boolean =>
        !this.isParent &&
        PARENT_SERVICES.includes(name) &&
        this.parent[name],
    )
    .map((name: keyof Services) => {
      Object.assign(this, {[name]: this.parent[name]})
    })

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
  await LIFECYCLE_EVENTS.reduce(async (promised, event) => {
    await promised

    this.time(`lifecycle event: ${event}`)

    await Promise.all(
      initializedServices.map(async key => {
        try {
          this.await(key)

          const service = this[key]

          if (!service || !service[event]) return

          await service[event](this)
        } catch (error) {
          this.error(error, key, event)
          this.dump(this[key])
        }
      }),
    )

    this.timeEnd(`lifecycle event: ${event}`)

    return Promise.resolve()
  }, Promise.resolve())

  this.timeEnd('lifecycle')
  return this
}
