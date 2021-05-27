import '@roots/bud-api'
import {Module} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  namespace Extensions {
    interface Definitions {
      '@roots/bud-preset-recommend': Module
    }
  }
}

const extension: Module = {
  name: '@roots/bud-preset-recommend',
  register: ({use}) => {
    use([
      require('@roots/bud-babel'),
      require('@roots/bud-postcss'),
      require('@roots/bud-entrypoints'),
    ])
      .template()
      .persist()
  },
}

export default extension
export const {name, register} = extension
