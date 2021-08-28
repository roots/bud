/**
 * ⚡️ Lightning fast frontend build tools combining the best parts of Symfony Encore and Laravel Mix
 *
 * @remarks
 * Adds support for PostCSS.
 *
 * Requires `@roots/bud-postcss` to be installed as a peer dependency.
 */

import type {Module} from '@roots/bud-framework'

import {purge} from './bud.purge'

declare module '@roots/bud-framework' {
  namespace Framework {
    interface Extensions {
      '@roots/bud-purgecss'?: Module
    }
  }

  interface Framework {
    purge?: purge
  }
}

export const name = '@roots/bud-purgecss'

export const api = {purge}
