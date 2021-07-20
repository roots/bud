/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import sh from '../sh'

export default Command =>
  class extends Command {
    static paths = [[`task`, `build`, `cjs`]]

    static usage = {
      category: `task`,
      description: `build project source (cjs)`,
      examples: [[`Build cjs packages`, `yarn task build:cjs`]],
    }

    async execute() {
      const $ = sh.bind(this)

      await $([
        `yarn workspaces foreach --topological-dev --no-private --exclude @roots/bud-typings -i -p -v run build:cjs`,
      ])
    }
  }
