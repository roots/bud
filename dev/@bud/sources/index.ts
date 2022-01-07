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

  commands: [
    Commands.Bud,
    Commands.Build,
    Commands.Clean,
    Commands.Compile,
    Commands.ContainerBud,
    Commands.ContainerDown,
    Commands.ContainerRun,
    Commands.ContainerBash,
    Commands.ContainerUp,
    Commands.Lint,
    Commands.Make,
    Commands.Docs,
    Commands.Test,
    Commands.Release,
  ],
}

export default plugin
