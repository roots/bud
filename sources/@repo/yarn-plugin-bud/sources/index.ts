import {Plugin} from '@yarnpkg/core'

import {Commands} from './command'
import afterAllInstalled from './hooks/afterAllInstalled.js'

const plugin: Plugin = {
  hooks: {
    afterAllInstalled,
  },

  commands: Object.values(Commands),
}

export default plugin
