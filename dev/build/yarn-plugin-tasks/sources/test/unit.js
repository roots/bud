/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import sh from '../sh'

export default Command =>
  class extends Command {
    static paths = [[`proj`, `test`, `unit`]]

    static usage = {
      category: `task`,
      description: `Run unit test suite`,

      examples: [[`Run unit test suite`, `yarn proj test unit`]],
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
