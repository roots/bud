/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import sh from '../sh'

export default Command =>
  class extends Command {
    static paths = [[`proj`, `make`]]

    static usage = {
      category: `task`,
      description: `build the project`,
      examples: [[`Build everything`, `yarn make`]],
    }

    async execute() {
      const $ = sh.bind(this)

      await $([`yarn proj clean`])
      await $([`yarn install --immutable`])
      await $([`yarn proj build`])
      await $([
        `yarn proj test`,
        `yarn proj lint`,
        `yarn proj site`,
      ])
    }
  }
