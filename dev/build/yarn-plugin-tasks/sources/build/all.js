/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import sh from '../sh'

export default Command =>
  class extends Command {
    static paths = [[`task`, `build`]]

    static usage = {
      category: `task`,
      description: `Build project source`,
      examples: [[`Build packages`, `yarn task build`]],
    }

    async execute() {
      const $ = sh.bind(this)

      await $([`yarn task build cjs`, `yarn task build esm`])
    }
  }
