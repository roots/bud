/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import sh from '../sh'

export default Command =>
  class extends Command {
    static paths = [[`kjo`, `make`, `clean`]]

    static usage = {
      category: `kjo`,
      description: `build the kjo`,
      examples: [
        [`Build everything from clean base`, `yarn make clean`],
      ],
    }

    async execute() {
      const $ = sh.bind(this)

      await $([`yarn clean`])
      await $([`yarn install --immutable`])
      await $([`yarn kjo build`])
    }
  }
