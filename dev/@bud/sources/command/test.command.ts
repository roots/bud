import {CommandClass, Option} from 'clipanion'

import {Command} from './base.command'

/**
 * Test command class
 *
 * @internal
 */
export class Test extends Command {
  /**
   * Command name
   *
   * @internal
   */
  public name = 'test'

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
    details: `test files with jest`,
    examples: [
      [`test`, `yarn @bud test`],
      [`update snapshots`, `yarn @bud test --updateSnapshot`],
    ],
  }

  /**
   * Passthrough args
   *
   * @internal
   */
  public passthrough = Option.Proxy({
    name: `jest options`,
  })

  /**
   * Execute command
   *
   * @internal
   */
  public async execute() {
    await this.$(
      this.withPassthrough(
        `yarn jest --config config/jest.config.js`,
      ),
    )
  }
}
