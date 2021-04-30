import '@roots/bud-extensions'
import {Module} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  namespace Hooks.Extension {
    interface Definitions {
      '@roots/bud-prettier': Module
    }
  }
}

const extension: Module = {
  name: '@roots/bud-prettier',
}

export const {name} = extension
