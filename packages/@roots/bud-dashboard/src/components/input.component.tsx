import {lodash} from '@roots/bud-support'
import {useInput} from 'ink'

import {useForceUpdate} from '../hooks/useForceUpdate'

const {isEqual} = lodash

/**
 * stdio handler
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
    if (isEqual(input, 'c')) {
      (async () => {
        await bud.dashboard.rerender()
      })()
    }
  })

  return null
}
