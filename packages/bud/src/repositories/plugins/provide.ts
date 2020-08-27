import {ProvidePlugin} from 'webpack'

import type {Extension} from './index'

const provide: Extension = bud => ({
  bud,

  name: 'provide-plugin',

  make: function () {
    return new ProvidePlugin(
      bud.options.get('webpack.plugins.provide') || {},
    )
  },
})

export {provide}
