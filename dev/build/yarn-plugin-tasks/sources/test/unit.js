/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import sh from '../sh'

export default Command =>
  class extends Command {
    static paths = [[`task`, `test`, `unit`]]

    static usage = {
      category: `task`,
      description: `Run unit test suite`,

      examples: [[`Run unit test suite`, `yarn task test unit`]],
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
