import dotenv from 'dotenv'
import {parse} from 'yargs'
import {get, has} from 'lodash'
import {join} from 'path'

/**
 * Process args
 */
export const args = (() => {
  let raw = parse(process.argv.slice(1))
  raw = {
    ...raw,
    ...raw._.reduce(
      (a, v, i) => ({
        ...a,
        [v]: true,
      }),
      {},
    ),
  }

  raw.mode = raw.development ? 'development' : 'production'
  return raw
})()

/**
 * Env
 */
export const env = (() => {
  return dotenv.config({
    path: join(process.cwd(), '.env'),
  }).parsed
})()

/**
 * Source a value
 */
export const source = (
  key: [string, string],
  fallback,
  transform?,
) => {
  const [argKey, envKey] = key

  const val = has(args, argKey)
    ? get(args, argKey)
    : get(env, envKey) ?? fallback

  return transform ? transform(val) : val
}
