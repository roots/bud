/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import sh from '../sh'

export default Command =>
  class extends Command {
    static paths = [[`kjo`, `test`, `unit`]]

    static usage = {
      category: `kjo`,
      description: `Run unit test suite`,

      examples: [[`Run unit test suite`, `yarn kjo test unit`]],
    }

    async execute() {
      const $ = sh.bind(this)

      await $(
        [
          `yarn jest --coverage --testPathIgnorePatterns="tests/integration" --testPathIgnorePatterns="tests/util"`,
        ],
        false,
      )
    }
  }
