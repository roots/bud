import {ProvidePlugin} from './externals'
import type {Plugin} from '@roots/bud-types'

const provide: Plugin = bud => ({
  bud,

  make: function () {
    return new ProvidePlugin(
      this.bud.options.get('webpack.plugins.provide') || {},
    )
  },
})

export {provide}
