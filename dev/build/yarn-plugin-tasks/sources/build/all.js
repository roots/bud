/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import sh from '../sh'

export default Command =>
  class extends Command {
    static paths = [[`proj`, `build`]]

    static usage = {
      category: `task`,
      description: `Build project source`,
      examples: [[`Build packages`, `yarn proj build`]],
    }

    async execute() {
      const $ = sh.bind(this)

      await $([`yarn proj build cjs`, `yarn proj build esm`])
    }
  }
