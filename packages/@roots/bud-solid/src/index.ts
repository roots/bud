import '@roots/bud-babel'

import type {Module} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  namespace Framework {
    interface Extensions {
      '@roots/bud-solid': Module
    }
  }
}

const extension: Module = {
  name: '@roots/bud-solid',
  boot({babel, discovery}) {
    discovery.hasPeerDependency('solid-js') &&
      babel.setPreset('babel-preset-solid')
  },
}

export const {name, boot} = extension
