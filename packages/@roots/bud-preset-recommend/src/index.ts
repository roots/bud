import '@roots/bud-api'
import {Module} from '@roots/bud-framework'
import babel from '@roots/bud-babel'
import postcss from '@roots/bud-postcss'
import entrypoints from '@roots/bud-entrypoints'

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
    use([babel, postcss, entrypoints]).template().persist()
  },
}

export default extension
export const {name, register} = extension
