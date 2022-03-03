import {lodash} from '@roots/bud-support'
import {useInput} from 'ink'

const {isEqual} = lodash

/**
 * stdio component
 *
 * @remarks
 * This is wrapped the way it is so we don't explode
 * everything if we're in an environment that doesn't
 * support rawMode (like CI)
 *
 * @public
 */
export const Input = ({app}) => {
  useInput(input => isEqual(input, 'q') && app.close())
}
