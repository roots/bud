import type {Config} from './types/tailwindcss'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const tailwindcss = require('tailwindcss')

export const tailwind = function (
  params: Omit<Config, null>,
): Framework.Bud {
  this.css.mergePlugins(tailwindcss(params))

  return this
}
