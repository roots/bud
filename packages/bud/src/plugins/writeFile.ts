import {WriteFilePlugin} from './externals'
import {BudInterface, Plugin} from '../'

const writeFile: Plugin = (bud: BudInterface) => ({
  bud,
  make: function () {
    return new WriteFilePlugin()
  },
})

export {writeFile as default}
