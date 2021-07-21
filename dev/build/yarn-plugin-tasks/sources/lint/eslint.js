/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import sh from '../sh'

export default Command =>
  class extends Command {
    static paths = [[`kjo`, `lint`, `eslint`]]

    static usage = {
      category: `kjo`,
      description: `Run eslint`,
      examples: [[`Lint packaged code`, `yarn kjo lint eslint`]],
    }

    async execute() {
      const $ = sh.bind(this)

      await $([
        `yarn workspaces foreach --no-private --exclude @roots/bud-typings -p -v run lint`,
      ])
    }
  }
