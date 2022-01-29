import {lodash} from '@roots/bud-support'
import {useInput} from 'ink'

const {isEqual} = lodash

/**
 * stdio handler
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
