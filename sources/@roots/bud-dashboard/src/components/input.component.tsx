import {lodash} from '@roots/bud-support'
import {useInput} from 'ink'

const {isEqual} = lodash

/**
 * stdio handler
 *
 * @public
 */
export const Input = ({app}) => {
  useInput(input => {
    if (isEqual(input, 'q')) {
      app.hooks.filter('event.dashboard.q')
      app.close()
    }
  })

  return null
}
