/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import sh from '../sh'

export default Command =>
  class extends Command {
    static paths = [[`proj`, `test`]]

    static usage = {
      category: `task`,
      description: `Run all test suites`,
      examples: [[`Run tests`, `yarn proj test`]],
    }

    async execute() {
      const $ = sh.bind(this)

      await $([`yarn proj test unit`], false)
      await $([`yarn proj test integration`], false)
    }
  }
