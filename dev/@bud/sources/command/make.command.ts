import {CommandClass} from 'clipanion'

import {Command} from './base.command'

/**
 * Make command class
 *
 * @internal
 */
export class Make extends Command {
  /**
   * Command paths
   *
   * @internal
   */
  public static paths: CommandClass['paths'] = [['@bud', 'make']]

  /**
   * Command usage
   *
   * @internal
   */
  public static usage: CommandClass['usage'] = {
    category: '@bud',
    description: 'make project files same as ci',
    examples: [
      ['install/build repo packages', 'yarn @bud make'],
    ],
  }

  /**
   * Execute command
   *
   * @internal
   */
  public async execute() {
    await this.$('yarn install --immutable')

    await this.$('yarn @bud build')

    await this.$('yarn @bud lint', 'yarn @bud test --coverage')

    await this.$('yarn @bud docs')
  }
}
