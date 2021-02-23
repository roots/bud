import './interface'
import {Framework} from '@roots/bud-framework'
import {Module} from '@roots/bud-typings'
import tailwindcss from 'tailwindcss'
import fallback from './tailwind.config'
import * as apiFns from './api'

// Extension ident
export const name: Module['name'] = '@roots/bud-tailwindcss'

// Extension config
export const api: Module['api'] = apiFns

// Boot extension
export const boot: Module['boot'] = ({postcss}: Framework) => {
  postcss.setPlugin(['tailwindcss', tailwindcss])
}

/**
 * Unused, because it is too slow.
 *
 * But automatically adapts the terminal colors (256)
 * to user tailwind palette
 */
export function useTailwindDashboardColors() {
  const disk = this.disk.get('project')

  const cfg = disk.has('tailwind.config.js')
    ? disk.require('tailwind.config.js')
    : fallback

  const doColor = k => {
    const value = k.reduce(
      (a, c) =>
        cfg?.theme?.extend?.colors?.[c]?.[500] ??
        fallback?.theme?.colors?.[c]?.[500] ??
        a,
      null,
    )

    value && this.theme.colors({[k[0]]: value})
  }

  cfg &&
    (() => {
      doColor(['foreground', 'white'])
      doColor(['success', 'green'])
      doColor(['faded', 'gray'])
      doColor(['primary', 'indigo'])
      doColor(['primaryAlt', 'purple'])
      doColor(['error', 'red'])
      doColor(['warning', 'orange'])
      doColor(['flavor', 'blue'])
      doColor(['accent', 'pink'])
    })()
}
