import {ProvidePlugin} from './externals'
import {BudInterface, Plugin} from '../'

const provide: Plugin = (bud: BudInterface) => ({
  bud,

  make: function () {
    return new ProvidePlugin(
      this.bud.options.get('plugins.provide'),
    )
  },
})

export {provide as default}
