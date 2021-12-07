import {Plugin} from '@yarnpkg/core'

import {BuildCommand} from './build'
import {CleanCommand} from './clean'
import {CompileCommand} from './compile'
import {MdCommand} from './docs'
import {LintCommand} from './lint'
import {MakeCommand} from './make'
import {TestCommand} from './test'

const plugin: Plugin = {
  hooks: {
    afterAllInstalled: () => {
      process.stdout.write(
        `\nWhat a great install, am I right?\n`,
      )
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
