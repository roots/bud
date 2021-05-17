import './interface'

import {Framework, Module} from '@roots/bud-framework'

export const name: Module['name'] = '@roots/bud-emotion'

export const boot: Module['boot'] = (app: Framework) => {
  app.babel?.setPlugins &&
    app.babel.setPlugins([
      ['@emotion', {}],
      ...app.hooks.filter('item/babel/options/plugins'),
    ])
}

const extension: Module = {name, boot}
export default extension
