import {CommandClass, Option} from 'clipanion'

import {Command} from './base.command'

/**
 * Default jest flags
 *
 * @internal
 */
const DEFAULT_JEST_FLAGS = `--config ./config/jest.config.js`

/**
 * Run tests
 *
 * @internal
 */
export class Test extends Command {
  /**
   * Command name
   *
   * @internal
   */
  public name = `test`

  /**
   * Command paths
   *
   * @internal
   */
  public static paths: CommandClass['paths'] = [[`@bud`, `test`]]

  /**
   * Command usage
   *
   * @internal
   */
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `run unit and integration tests`,
    details: `
    The first positional argument is required and should be one of: 'all', 'unit', or 'integration', depending on what you want to run.
    You may add any jest flags to the command following that positional.
  `,
    examples: [
      [`@bud test all`, `run all tests`],
      [`@bud test unit`, `run unit tests`],
      [`@bud test integration`, `run integration tests`],
      [
        `@bud test integration/sage`,
        `run integration test on mock sage project`,
      ],
      [
        `@bud test integration/vue`,
        `run integration test on mock vue project`,
      ],
      [
        `@bud test integration --verbose`,
        `run integration tests with jest verbose flag`,
      ],
    ],
  }

  /**
   * Variadic arguments
   *
   * @internal
   */
  public passthrough = Option.Proxy({name: `jest params`})

  /**
   * Execute command
   *
   * @internal
   */
  public async execute() {
    return await this.$(
      this.withPassthrough(
        `yarn node --experimental-vm-modules $(yarn bin jest) ${DEFAULT_JEST_FLAGS}`,
      ),
    )
  }
}
