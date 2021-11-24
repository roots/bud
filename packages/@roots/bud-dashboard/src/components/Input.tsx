import {useInput} from 'ink'

import {isEqual} from '../services/lodash'

/**
 * KBD input handler
 *
 * @public
 */
export const Input = ({bud}) => {
  useInput(input => {
    if (isEqual(input, 'q')) {
      bud.hooks.filter('event.dashboard.q')
      bud.close()
    }
  })

  return null
}
