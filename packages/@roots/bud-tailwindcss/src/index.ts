import './interface'
import {Framework} from '@roots/bud-framework'
import {Module} from '@roots/bud-typings'
import * as apiFns from './api'

// Extension ident
export const name: Module['name'] = '@roots/bud-tailwindcss'

// Extension config
export const api: Module['api'] = apiFns

// Boot extension
export const boot: Module['boot'] = ({
  when,
  isProduction,
  postcss,
}: Framework) => {
  postcss.setPlugin(['tailwindcss', require('tailwindcss')])

  when(
    isProduction,
    ({postcss}) =>
      postcss.enable([
        'postcss-import',
        'tailwindcss',
        'postcss-nested',
        'postcss-custom-properties',
        'preset-env',
        'cssnano',
      ]),
    ({postcss}) =>
      postcss.enable([
        'postcss-import',
        'tailwindcss',
        'postcss-nested',
        'postcss-custom-properties',
        'preset-env',
      ]),
  )
}
