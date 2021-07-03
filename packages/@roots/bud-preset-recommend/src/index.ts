import '@roots/bud-api'
import {Module} from '@roots/bud-framework'
import * as babel from '@roots/bud-babel'
import * as postcss from '@roots/bud-postcss'
import * as entrypoints from '@roots/bud-entrypoints'

declare module '@roots/bud-framework' {
  namespace Extensions {
    interface Definitions {
      '@roots/bud-preset-recommend': Module
    }
  }
}

const extension: Module = {
  name: '@roots/bud-preset-recommend',
  register: app => {
    app.use([babel, postcss, entrypoints])
  },
}

export default extension
export const {name, register} = extension
