/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import sh from '../sh'

export default Command =>
  class extends Command {
    static paths = [[`task`, `build`]]

    static usage = {
      category: `task`,
      description: `build`,
      details: `
       Lint and prettify packaged code
     `,
      examples: [[`Build packages`, `yarn task build`]],
    }

    async execute() {
      const $ = sh.bind(this)

      await $([
        `yarn workspaces foreach --topological-dev --no-private --exclude @roots/bud-typings -i -p -v run build`,
      ])
    }
  }
