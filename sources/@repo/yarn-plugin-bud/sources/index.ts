import {Plugin} from '@yarnpkg/core'

import {Commands} from './command'
import afterAllInstalled from './hooks/afterAllInstalled.js'

const plugin: Plugin = {
  commands: Object.values(Commands),

  hooks: {
    afterAllInstalled,
  },
}

export default plugin
