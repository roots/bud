/**
 * @see https://roots.io/bud
 *
 * @remarks
 * Add PurgeCSS to Bud projects
 *
 * @extension @packageDocumentation @betaDocumentation
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

import {purge} from './bud.purge'

export const name = '@roots/bud-purgecss'
export const api = {purge}
