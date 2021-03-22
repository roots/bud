import {get} from 'lodash'
import {args} from './args'
import {env} from './env'

/**
 * Source from args => env => null
 */
export const config = (
  key: [string, string?],
  transform?: (value: any) => any,
) => {
  let value
  const [argKey, envKey] = key

  value = get(env, envKey, null)
  value = get(args, argKey, value)

  return transform ? transform(value) : value
}
