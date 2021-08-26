import {Plugin} from '@yarnpkg/core'

import {BuildCommand} from './build'
import {CleanCommand} from './clean'
import {CompileCommand} from './compile'
import {LintCommand} from './lint'
import {TestCommand} from './test'
import {VersionCommand} from './version'
import {MakeCommand} from './make'
import {MdCommand} from './md'

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
    VersionCommand,
  ],
}

export default plugin
