import {CommandClass} from 'clipanion'

import {Command} from './base.command'

/**
 * Make command class
 *
 * @internal
 */
export class Make extends Command {
  /**
   * Command name
   *
   * @internal
   */
  public name = 'make'

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
    examples: [['install/build repo packages', 'yarn @bud make']],
  }

  /**
   * Execute command
   *
   * @internal
   */
  public async execute() {
    await this.$(`yarn @bud clean`)
    await this.$('yarn install --immutable')

    await this.$('yarn @bud build --force')

    await this.$(
      'yarn @bud lint',
      'yarn @bud test all --verbose --maxWorkers=50%',
    )

    await this.$('yarn @bud docs')
  }
}
