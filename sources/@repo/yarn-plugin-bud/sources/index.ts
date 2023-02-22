import {Plugin} from '@yarnpkg/core'

import {Commands} from './command'
import afterAllInstalled from './hooks/afterAllInstalled.js'
import setupScriptEnvironment from './hooks/setupScriptEnvironment.js'

const plugin: Plugin = {
  hooks: {
    afterAllInstalled,
    setupScriptEnvironment,
  },

  commands: Object.values(Commands),
}

export default plugin
