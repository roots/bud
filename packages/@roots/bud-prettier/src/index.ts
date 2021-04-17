import {Module} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  namespace Hooks.Extension {
    interface Definitions {
      '@roots/bud-prettier': Module
    }
  }
}

export const name: Module['name'] = '@roots/bud-prettier'
