/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import sh from '../sh'

export default Command =>
  class extends Command {
    static paths = [[`proj`, `lint`]]

    static usage = {
      category: `task`,
      description: `Runs all linters`,
      examples: [[`Run all linters`, `yarn proj lint`]],
    }

    async execute() {
      const $ = sh.bind(this)

      await $([
        `yarn proj lint eslint`,
        `yarn proj lint skypack`,
      ])
    }
  }
