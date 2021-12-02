import {useInput} from 'ink'

import {useForceUpdate} from '../hooks/useForceUpdate'
import {isEqual} from '../services/lodash'

/**
 * KBD input handler
 *
 * @public
 */
export const Input = ({bud}) => {
  useForceUpdate()

  useInput(input => {
    if (isEqual(input, 'q')) {
      bud.hooks.filter('event.dashboard.q')
      bud.close()
    }
  })

  return null
}
