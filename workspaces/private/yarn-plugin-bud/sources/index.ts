import {Plugin} from '@yarnpkg/core'

import {Commands} from './command'

const plugin: Plugin = {
  hooks: {
    afterAllInstalled: () => {
      process.stdout.write(
        `\nWhat a great install, am I right?\n`,
      )
    },
  },

  commands: Object.values(Commands),
}

export default plugin
