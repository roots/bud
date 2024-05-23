import type {Context} from '@roots/bud-framework'

import isString from '@roots/bud-support/isString'
import minimist from '@roots/bud-support/minimist'

const raw = process.argv.slice(2)

const args: Partial<Context> = Object.entries(
  minimist(raw, {
    alias: {
      [`basedir`]: [`cwd`],
      [`paths.dist`]: [`@dist`, `dist`, `output`, `o`],
      [`paths.input`]: [`input`, `@src`, `src`],
      [`paths.storage`]: [`@storage`, `storage`],
      devtool: [`devtool`, `source-map`],
      discover: [`discovery`],
      force: [`flush`],
      silent: [`s`],
      splitChunks: [`split-chunks`, `vendor`],
    },
  }),
).reduce((acc, [key, value]) => {
  if (value === `true`) value = true
  if (value === `false`) value = false
  if (key === `use` && isString(value)) value = value.split(`,`)
  acc[key] = value

  return acc
}, {})

export const includes = (key: string) => args._.includes(key)

export default args
export {raw}
