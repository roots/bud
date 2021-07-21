/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import sh from '../sh'

export default Command =>
  class extends Command {
    static paths = [[`proj`, `profile`, `esm`]]

    static usage = {
      category: `task`,
      description: `profile esm`,
      examples: [
        [`Profile esm build process`, `yarn proj profile esm`],
      ],
    }

    async execute() {
      const $ = sh.bind(this)

      await $([
        `yarn workspaces foreach --no-private --exclude @roots/bud-typings --topological-dev run profile:esm`,
      ])
    }
  }
