import {IgnoreEmitPlugin} from './externals'
import {BudInterface, Plugin} from '../'

const ignoreEmit: Plugin = (bud: BudInterface) => ({
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
