import {get} from 'lodash'
import {args} from './args'
import {env} from './env'

/**
 * Source from args => env => null
 */
export const config = (
  key: [string, string?],
  fallback = undefined,
) => {
  const [argKey, envKey] = key

  return get(args, argKey, get(env, envKey, fallback))
}
