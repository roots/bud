import {Plugin} from '@yarnpkg/core'

import {BuildCommand} from './build'
import {CleanCommand} from './clean'
import {LintCommand} from './lint'
import {TestCommand} from './test'
import {VersionCommand} from './version'
import {MakeCommand} from './make'
import {PreCommand} from './pre'

const plugin: Plugin = {
  hooks: {
    afterAllInstalled: () => {
      console.log(`What a great install, am I right?`)
    },
  },
  commands: [
    BuildCommand,
    CleanCommand,
    LintCommand,
    MakeCommand,
    PreCommand,
    TestCommand,
    VersionCommand,
  ],
}

export default plugin
