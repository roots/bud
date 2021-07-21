/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import sh from '../sh'

export default Command =>
  class extends Command {
    static paths = [[`kjo`, `test`, `integration`]]

    static usage = {
      category: `kjo`,
      description: `Run integration test suite`,
      examples: [
        [
          `Run integration test suite`,
          `yarn kjo test integration`,
        ],
      ],
    }

    async execute() {
      const $ = sh.bind(this)

      await $([`node ./jest.integration.js`])
    }
  }
