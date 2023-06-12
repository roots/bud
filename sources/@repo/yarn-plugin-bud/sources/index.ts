import type * as YarnPkg from '@yarnpkg/core'

import * as Commands from './command'
import afterAllInstalled from './hooks/afterAllInstalled.js'

const plugin: YarnPkg.Plugin = {
  commands: Object.values(Commands),
  hooks: {
    afterAllInstalled,
  },
}

export default plugin
