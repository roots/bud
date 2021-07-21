/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import sh from '../sh'

export default Command =>
  class extends Command {
    static paths = [[`proj`, `build`, `cjs`]]

    static usage = {
      category: `task`,
      description: `build project source (cjs)`,
      examples: [[`Build cjs packages`, `yarn proj build cjs`]],
    }

    async execute() {
      const $ = sh.bind(this)

      await $([
        `yarn workspaces foreach --topological-dev --no-private --exclude @roots/bud-typings -i -p -v run build:cjs`,
      ])
    }
  }
