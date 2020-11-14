import {Bud} from '@roots/bud-typings'
import type {Config} from './types/tailwindcss'

export const tailwind = function (
  params: Omit<Config, null>,
): Bud.Contract {
  this.build.items.merge(
    'postcss.options.postcssOptions.plugins',
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    [require('tailwindcss')(params)],
  )

  return this
}
