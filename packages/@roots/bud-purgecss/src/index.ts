/**
 * Add PurgeCSS to Bud projects
 *
 * @remarks
 * 💁 Composable - Build boss web applications with a modular, hackable build system
 * 💪 Modern - Modern framework that scales from a single file to thousands of lines of code
 * 🌱 Easy - Low bundle size and fast build times with little to no configuration
 *
 * @see https://roots.io/bud
 *
 * @packageDocumentation
 */

declare module '@roots/bud-framework' {
  namespace Framework {
    interface Extensions {
      '@roots/bud-purgecss': Module
    }
  }

  interface Framework {
    purge: purge
  }
}

import type {Module} from '@roots/bud-framework'

import {purge} from './bud.purge'

export const name = '@roots/bud-purgecss'
export const api = {purge}
