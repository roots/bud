import {CopyWebpackPlugin} from './externals'
import {BudInterface, Plugin} from '../'

const copy: Plugin = (bud: BudInterface) => ({
  bud,
  make: function () {
    return new CopyWebpackPlugin(
      this.bud.options.get('plugins.copy'),
    )
  },
  when: function () {
    return (
      this.bud.options.get('plugins.copy')?.patterns?.length > 0
    )
  },
})

export {copy as default}
