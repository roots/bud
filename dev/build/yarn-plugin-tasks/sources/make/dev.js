/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import sh from '../sh'

export default Command =>
  class extends Command {
    static paths = [[`kjo`, `make`]]

    static usage = {
      category: `kjo`,
      description: `build the kjo`,
      examples: [[`Build everything`, `yarn make`]],
    }

    async execute() {
      const $ = sh.bind(this)

      await $([`yarn kjo clean`])
      await $([`yarn install --immutable`])
      await $([`yarn kjo build`])
      await $([
        `yarn kjo test`,
        `yarn kjo lint`,
        `yarn kjo site`,
      ])
    }
  }
