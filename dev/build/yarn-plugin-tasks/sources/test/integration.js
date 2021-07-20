/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import sh from '../sh'

export default Command =>
  class extends Command {
    static paths = [[`task`, `test:integration`]]

    static usage = {
      category: `task`,
      description: `Run integration test suite`,
      examples: [
        [
          `Run integration test suite`,
          `yarn task test integration`,
        ],
      ],
    }

    async execute() {
      const $ = sh.bind(this)

      await $([`node ./jest.integration.js`])
    }
  }
