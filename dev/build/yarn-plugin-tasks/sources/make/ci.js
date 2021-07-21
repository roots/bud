/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import sh from '../sh'

export default Command =>
  class extends Command {
    static paths = [[`proj`, `make`, `ci`]]

    static usage = {
      category: `task`,
      description: `build the project (CI)`,
      examples: [[`Build for ci`, `yarn make ci`]],
    }

    async execute() {
      const $ = sh.bind(this)

      await $([`yarn install --immutable`])
      await $([`yarn proj build cjs`])
      await $([`yarn proj test`])
      await $([`yarn proj site`])
    }
  }
