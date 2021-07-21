/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import sh from '../sh'

export default Command =>
  class extends Command {
    static paths = [[`kjo`, `make`, `ci`]]

    static usage = {
      category: `kjo`,
      description: `build the kjo (CI)`,
      examples: [[`Build for ci`, `yarn make ci`]],
    }

    async execute() {
      const $ = sh.bind(this)

      await $([`yarn install --immutable`])
      await $([`yarn kjo build cjs`])
      await $([`yarn kjo test`])
      await $([`yarn kjo site`])
    }
  }
