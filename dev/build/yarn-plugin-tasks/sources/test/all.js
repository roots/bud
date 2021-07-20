/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import sh from '../sh'

export default Command =>
  class extends Command {
    static paths = [[`task`, `test`]]

    static usage = {
      category: `task`,
      description: `test`,
      details: `
       Run all test suites
     `,
      examples: [[`Run tests`, `yarn task test`]],
    }

    async execute() {
      const $ = sh.bind(this)

      await $([`yarn task test:unit`])
      await $([`yarn task test:integration`])
    }
  }
