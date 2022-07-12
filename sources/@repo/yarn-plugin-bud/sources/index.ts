import {Plugin} from '@yarnpkg/core'
import {execute} from '@yarnpkg/shell'

import {Commands} from './command'

const plugin: Plugin = {
  hooks: {
    afterAllInstalled: async () => {
      await execute('yarn', ['@bud', 'info'], {
        stdin: process.stdin,
        stdout: process.stdout,
      })
    },
  },

  commands: Object.values(Commands),
}

export default plugin
