/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import sh from '../sh'

export default Command =>
  class extends Command {
    static paths = [[`kjo`, `build`]]

    static usage = {
      category: `kjo`,
      description: `Build kjo source`,
      examples: [[`Build packages`, `yarn kjo build`]],
    }

    async execute() {
      const $ = sh.bind(this)

      await $([`yarn kjo build cjs`, `yarn kjo build esm`])
    }
  }
