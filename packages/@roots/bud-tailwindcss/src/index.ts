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
  disk,
  isProduction,
  postcss,
}: Framework) => {
  if (disk.get('project').has('postcss.config.js')) return

  postcss.setPlugin(['tailwindcss', require('tailwindcss')])

  when(
    isProduction,
    ({postcss}) =>
      postcss.enable([
        'cssnano',
        'postcss-import',
        'tailwindcss',
        'postcss-nested',
        'postcss-custom-properties',
        'preset-env',
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
