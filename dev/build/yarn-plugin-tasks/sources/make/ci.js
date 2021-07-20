/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import sh from '../sh'

export default Command =>
  class extends Command {
    static paths = [[`task`, `make`, `ci`]]

    static usage = {
      category: `task`,
      description: `build the project (CI)`,
      examples: [[`Build for ci`, `yarn task make ci`]],
    }

    async execute() {
      const $ = sh.bind(this)

      await $([`yarn install --immutable`])
      await $([`yarn task build`])
      await $([`yarn task test`, `yarn task site`])
    }
  }
