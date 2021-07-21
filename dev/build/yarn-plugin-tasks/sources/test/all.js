/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import sh from '../sh'

export default Command =>
  class extends Command {
    static paths = [[`kjo`, `test`]]

    static usage = {
      category: `kjo`,
      description: `Run all test suites`,
      examples: [[`Run tests`, `yarn kjo test`]],
    }

    async execute() {
      const $ = sh.bind(this)

      await $([`yarn kjo test unit`], false)
      await $([`yarn kjo test integration`], false)
    }
  }
