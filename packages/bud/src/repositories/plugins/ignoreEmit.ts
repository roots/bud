import {IgnoreEmitPlugin} from './externals'
import {Plugin} from '@roots/bud-typings'

const ignoreEmit: Plugin = bud => ({
  bud,
  make: function () {
    return new IgnoreEmitPlugin(
      this.bud.options.get('webpack.plugins.ignoreEmit')
    )
  },
})

export {ignoreEmit}
