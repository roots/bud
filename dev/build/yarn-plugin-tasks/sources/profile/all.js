/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import sh from '../sh'

export default Command =>
  class extends Command {
    static paths = [[`task`, `profile`]]

    static usage = {
      category: `task`,
      description: `Profile all build processes`,
      examples: [
        [`Profile all build processes`, `yarn task profile`],
      ],
    }

    async execute() {
      const $ = sh.bind(this)
      await $([`yarn task profile cjs`, `yarn task profile esm`])
    }
  }
