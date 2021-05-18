import {Module} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  namespace Framework {
    interface Extensions {
      '@roots/bud-prettier': Module
    }
  }
}

const extension: Module = {
  name: '@roots/bud-prettier',
}

export const {name} = extension
