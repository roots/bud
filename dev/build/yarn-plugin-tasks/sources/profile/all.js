/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import sh from '../sh'

export default Command =>
  class extends Command {
    static paths = [[`proj`, `profile`]]

    static usage = {
      category: `task`,
      description: `Profile all build processes`,
      examples: [
        [`Profile all build processes`, `yarn proj profile`],
      ],
    }

    async execute() {
      const $ = sh.bind(this)
      await $([`yarn proj profile cjs`, `yarn proj profile esm`])
    }
  }
