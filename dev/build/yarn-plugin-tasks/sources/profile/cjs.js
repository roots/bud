/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import sh from '../sh'

export default Command =>
  class extends Command {
    static paths = [[`proj`, `profile`, `cjs`]]

    static usage = {
      category: `task`,
      description: `Profile build (cjs)`,
      examples: [
        [`Profile cjs build process`, `yarn proj profile cjs`],
      ],
    }

    async execute() {
      const $ = sh.bind(this)

      await $([
        `yarn workspaces foreach --no-private --exclude @roots/bud-typings --topological-dev run profile:cjs`,
      ])
    }
  }
