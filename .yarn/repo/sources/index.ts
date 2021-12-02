import {Plugin} from '@yarnpkg/core'

import {BuildCommand} from './build'
import {CleanCommand} from './clean'
import {CompileCommand} from './compile'
import {LintCommand} from './lint'
import {TestCommand} from './test'
import {MakeCommand} from './make'
import {MdCommand} from './docs'

const plugin: Plugin = {
  hooks: {
    afterAllInstalled: () => {
      console.log(`What a great install, am I right?`)
    },
  },
  commands: [
    BuildCommand,
    CleanCommand,
    CompileCommand,
    LintCommand,
    MakeCommand,
    MdCommand,
    TestCommand,
  ],
}

export default plugin
