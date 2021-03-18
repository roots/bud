import {get, has} from 'lodash'
import {args} from './args'
import {env} from './env'

/**
 * Source from args => env => null
 */
export const config = (
  key: [string, string?],
  transform?: (value: any) => any,
) => {
  const [argKey, envKey] = key

  const val = has(args, argKey)
    ? get(args, argKey)
    : envKey
    ? get(env, envKey)
    : null

  return transform ? transform(val) : val
}
