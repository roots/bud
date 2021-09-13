import {Extension} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  namespace Framework {
    interface Extensions {
      '@roots/bud-prettier': Extension.Module
    }
  }
}

const extension: Extension.Module = {
  name: '@roots/bud-prettier',
}

export const {name} = extension
