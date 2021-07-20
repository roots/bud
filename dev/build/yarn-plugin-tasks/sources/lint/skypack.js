/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import sh from '../sh'

export default Command =>
  class extends Command {
    static paths = [[`task`, `lint:skypack`]]

    static usage = {
      category: `task`,
      description: `lint:skypack`,
      examples: [
        [`Lint packaged code`, `yarn task lint:skypack`],
      ],
    }

    async execute() {
      const $ = sh.bind(this)

      await $([
        `yarn workspaces foreach --no-private --exclude @roots/bud-typings -p -v run pkg`,
      ])
    }
  }
