import {CommandClass} from 'clipanion'

import {Command} from '../base.command'

/**
 * Run tests
 *
 * @internal
 */
export class TestTeardown extends Command {
  /**
   * Command name
   *
   * @internal
   */
  public static label = `@bud test teardown`

  /**
   * Command paths
   *
   * @internal
   */
  public static paths: CommandClass['paths'] = [
    [`@bud`, `test`, `teardown`],
  ]

  /**
   * Command usage
   *
   * @internal
   */
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `teardown integration/e2e tests`,
    examples: [[`run teardown`, `yarn @bud test teardown`]],
  }

  /**
   * Execute command
   *
   * @internal
   */
  public async execute() {
    await this.tryExecuting(`yarn`, [`@bud`, `registry`, `stop`])
  }
}
