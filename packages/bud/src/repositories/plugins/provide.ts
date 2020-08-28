import {ProvidePlugin} from 'webpack'
import type {Plugin} from '@roots/bud-framework'

const provide: Plugin = bud => ({
  bud,

  make: function () {
    return new ProvidePlugin(
      bud.options.get('webpack.plugins.provide') || {},
    )
  },
})

export {provide}
