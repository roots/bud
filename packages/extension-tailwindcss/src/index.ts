import './interface'
import {Bud} from '@roots/bud'
import tailwindcss from 'tailwindcss'
import fallback from './tailwind.config'

// Extension ident
export const name = '@roots/bud-tailwindcss'

// Extension config
export * as api from './api'

// Boot extension
export const boot = (app: Bud): void => {
  app.postcss.setPlugin(['tailwindcss', tailwindcss])
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
