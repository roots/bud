/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import sh from '../sh'

export default Command =>
  class extends Command {
    static paths = [[`kjo`, `profile`, `cjs`]]

    static usage = {
      category: `kjo`,
      description: `Profile build (cjs)`,
      examples: [
        [`Profile cjs build process`, `yarn kjo profile cjs`],
      ],
    }

    async execute() {
      const $ = sh.bind(this)

      await $([
        `yarn workspaces foreach --no-private --exclude @roots/bud-typings --topological-dev run profile:cjs`,
      ])
    }
  }
