import '@roots/bud-babel'
import {Framework, Module} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  namespace Framework {
    interface Extensions {
      '@roots/bud-emotion': Module
    }
  }
}

const extension: Module = {
  name: '@roots/bud-emotion',
  boot({babel}: Framework) {
    babel?.setPlugins && babel.setPlugin('@emotion/babel-plugin')
  },
}

export default extension
export const {name, boot} = extension
