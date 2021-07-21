/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import sh from '../sh'

export default Command =>
  class extends Command {
    static paths = [[`proj`, `make`, `clean`]]

    static usage = {
      category: `task`,
      description: `build the project`,
      examples: [
        [`Build everything from clean base`, `yarn make clean`],
      ],
    }

    async execute() {
      const $ = sh.bind(this)

      await $([`yarn clean`])
      await $([`yarn install --immutable`])
      await $([`yarn proj build`])
    }
  }
