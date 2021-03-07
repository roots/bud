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
  disk,
  postcss,
}: Framework) => {
  if (disk.get('project').has('postcss.config.js')) return

  postcss.setPlugin(['tailwindcss', require('tailwindcss')])

  const usingImportPlugin = postcss.enabled.includes(
    'postcss-import',
  )

  if (usingImportPlugin) {
    const insertAfter =
      postcss.enabled.indexOf('postcss-import') + 1

    postcss.enabled = [
      ...postcss.enabled.slice(0, insertAfter),
      'tailwindcss',
      ...postcss.enabled.slice(insertAfter),
    ]
  } else {
    postcss.enabled = ['tailwindcss', ...postcss.enabled]
  }
}
