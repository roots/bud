import {isNull} from 'lodash'

import {Framework} from '..'
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
    .filter(([name, service]): boolean => {
      /**
       * No reason to boot an extension that isn't well written
       */
      if (!service?.name) {
        this.warn(
          'service must include `name` property. none found; skipping.',
          service,
        )

        return false
      }

      /**
       * No reason to start server for production
       */
      if (service.name == 'server' && this.isProduction)
        return false

      /**
       * No reason to boot expensive parent services
       * for child compilation instantances
       */
      if (
        isParentInstance &&
        PARENT_SERVICES.includes(service.name)
      ) {
        return false
      }

      return true
    })

  /**
   * Initialize services
   */
  const initializedServices = validServices.map(
    ([name, Service]: [string, any]) => {
      Object.assign(this, {[name]: new Service(this)})

      return name
    },
  )

  /**
   * Service lifecycle
   */
  LIFECYCLE_EVENTS.map(event => {
    this.log(event)

    initializedServices.map(key => {
      const service = this[key]
      if (!service || !service[event]) return

      this.log(service.name, event)

      service[event](this)
    })
  })

  return this
}

export {bootstrap}
