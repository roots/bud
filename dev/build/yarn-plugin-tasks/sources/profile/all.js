/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import sh from '../sh'

export default Command =>
  class extends Command {
    static paths = [[`task`, `profile`]]

    static usage = {
      category: `task`,
      description: `profile`,
      examples: [
        [`Profile all build processes`, `yarn task profile`],
      ],
    }

    async execute() {
      const $ = sh.bind(this)

      await $([
        `yarn workspaces foreach --no-private --exclude @roots/bud-typings --topological-dev run profile`,
      ])
    }
  }
