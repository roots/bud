/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import sh from '../sh'

export default Command =>
  class extends Command {
    static paths = [[`kjo`, `lint`, `skypack`]]

    static usage = {
      category: `kjo`,
      description: `Run skypack`,
      examples: [
        [`Lint packaged code`, `yarn kjo lint skypack`],
      ],
    }

    async execute() {
      const $ = sh.bind(this)

      await $([
        `yarn workspaces foreach --no-private --exclude @roots/bud-typings -p -v run pkg`,
      ])
    }
  }
