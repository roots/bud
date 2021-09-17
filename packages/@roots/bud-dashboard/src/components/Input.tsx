import {Ink} from '@roots/bud-support'
import {isEqual} from 'lodash'

/**
 * KBD input handler
 *
 * @public
 */
export const Input = ({bud}) => {
  Ink.useInput(input => {
    isEqual(input, 'q') && bud.close()
  })

  return null
}
