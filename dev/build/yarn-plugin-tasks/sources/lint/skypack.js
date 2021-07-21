/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import sh from '../sh'

export default Command =>
  class extends Command {
    static paths = [[`proj`, `lint`, `skypack`]]

    static usage = {
      category: `task`,
      description: `Run skypack`,
      examples: [
        [`Lint packaged code`, `yarn proj lint skypack`],
      ],
    }

    async execute() {
      const $ = sh.bind(this)

      await $([
        `yarn workspaces foreach --no-private --exclude @roots/bud-typings -p -v run pkg`,
      ])
    }
  }
