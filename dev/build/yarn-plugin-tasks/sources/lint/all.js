/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import sh from '../sh'

export default Command =>
  class extends Command {
    static paths = [[`task`, `lint`]]

    static usage = {
      category: `task`,
      description: `Runs all linters`,
      examples: [[`Run all linters`, `yarn task lint`]],
    }

    async execute() {
      const $ = sh.bind(this)

      await $([
        `yarn task lint eslint`,
        `yarn task lint skypack`,
      ])
    }
  }
