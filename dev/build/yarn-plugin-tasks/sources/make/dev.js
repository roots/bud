/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import sh from '../sh'

export default Command =>
  class extends Command {
    static paths = [[`task`, `make`]]

    static usage = {
      category: `task`,
      description: `build the project`,
      examples: [[`Build everything`, `yarn task make`]],
    }

    async execute() {
      const $ = sh.bind(this)

      await $([`yarn task clean`])
      await $([`yarn install --immutable`])
      await $([`yarn task build`])
      await $([
        `yarn task test`,
        `yarn task lint`,
        `yarn task site`,
      ])
    }
  }
