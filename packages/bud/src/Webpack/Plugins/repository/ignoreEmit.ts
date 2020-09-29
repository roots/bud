import {IgnoreEmitPlugin} from './externals'
import Bud from '@roots/bud-types'

const ignoreEmit: Bud.Plugin.Factory = bud => ({
  bud,
  make: function () {
    return new IgnoreEmitPlugin(
      this.bud.options.get('plugins.ignoreEmit'),
    )
  },
  when: function () {
    return this.bud.options.get('plugins.ignoreEmit')
  },
})

export {ignoreEmit as default}
