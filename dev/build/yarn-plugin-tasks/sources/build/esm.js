/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import sh from '../sh'

export default Command =>
  class extends Command {
    static paths = [[`kjo`, `build`, `esm`]]

    static usage = {
      category: `kjo`,
      description: `build kjo source (esm)`,
      examples: [[`Build esm packages`, `yarn kjo build esm`]],
    }

    async execute() {
      const $ = sh.bind(this)

      await $([
        `yarn workspaces foreach --topological-dev --no-private --exclude @roots/bud-typings -i -p -v run build:esm`,
      ])
    }
  }
