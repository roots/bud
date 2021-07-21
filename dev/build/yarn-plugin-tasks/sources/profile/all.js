/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import sh from '../sh'

export default Command =>
  class extends Command {
    static paths = [[`kjo`, `profile`]]

    static usage = {
      category: `kjo`,
      description: `Profile all build processes`,
      examples: [
        [`Profile all build processes`, `yarn kjo profile`],
      ],
    }

    async execute() {
      const $ = sh.bind(this)
      await $([`yarn kjo profile cjs`, `yarn kjo profile esm`])
    }
  }
