import {CommandClass} from 'clipanion'

import {Command} from '../base.command'

/**
 * Run tests
 *
 * @internal
 */
export class TestSetup extends Command {
  /**
   * Command name
   *
   * @internal
   */
  public static label = `@bud test setup`

  /**
   * Command paths
   *
   * @internal
   */
  public static paths: CommandClass['paths'] = [[`@bud`, `test`, `setup`]]

  /**
   * Command usage
   *
   * @internal
   */
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `setup integration/e2e tests`,
    examples: [[`run setup`, `yarn @bud test setup`]],
  }

  /**
   * Execute command
   *
   * @internal
   */
  public async execute() {
    await this.tryExecuting(`yarn`, [`@bud`, `registry`, `start`])
  }
}
