import type {Module} from '@roots/bud-framework'

import {purge} from './bud.purge'

declare module '@roots/bud-framework' {
  namespace Framework {
    interface Definitions {
      '@roots/bud-purgecss': Module
    }
  }

  interface Framework {
    purge: purge
  }
}

export const name = '@roots/bud-purgecss'

export const api = {purge}
