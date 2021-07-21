/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import sh from '../sh'

export default Command =>
  class extends Command {
    static paths = [[`kjo`, `lint`]]

    static usage = {
      category: `kjo`,
      description: `Runs all linters`,
      examples: [[`Run all linters`, `yarn kjo lint`]],
    }

    async execute() {
      const $ = sh.bind(this)

      await $([`yarn kjo lint eslint`, `yarn kjo lint skypack`])
    }
  }
