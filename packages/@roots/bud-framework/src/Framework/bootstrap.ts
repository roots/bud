import {isNull} from 'lodash'

import {Framework, Service} from '..'
import {LIFECYCLE_EVENTS, PARENT_SERVICES} from './constants'

interface bootstrap {
  (this: Framework): Framework
}

function bootstrap(this: Framework): Framework {
  const isParentInstance = !isNull(this.parent)

  const validServices = this.container<Framework.Services>({
    ...this.options.services,
  })
    .getEntries()
    .filter(
      ([name, _service]: [
        keyof Framework.Services,
        Service,
      ]): boolean => {
        /**
         * - No reason to start server for production
         * - No reason to boot expensive parent services for child compilation instantances
         */
        return (name == 'server' && this.isProduction) ||
          (isParentInstance && PARENT_SERVICES.includes(name))
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

export {bootstrap}
