import * as repo from '@repo/constants'
import {CommandClass} from 'clipanion'

import {Command} from './base.command'

/**
 * Clean command
 *
 * @internal
 */
export class Clean extends Command {
  /**
   * Command name
   *
   * @internal
   */
  public static label = '@bud clean'

  /**
   * Command paths
   *
   * @internal
   */
  public static paths: CommandClass['paths'] = [[`@bud`, `clean`]]

  /**
   * Command usage
   *
   * @internal
   */
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `clean project artifacts`,
    examples: [[`clean project artifacts`, `yarn @bud clean`]],
  }

  /**
   * Command execution
   *
   * @internal
   */
  public async execute() {
    try {
      await this.$(`rm -rf **/.budfiles`)
      await this.$(`rm -rf **/node_modules/*`)
      await this.$(`rm -rf ${repo.paths.sources}/@roots/*/lib/*`)
      await this.$(`rm -rf ${repo.paths.sources}/@roots/*/types/*`)
    } catch (e) {}

    try {
      await this.$(`rm -rf storage/packages/@roots/*`)
      await this.$(`rm -rf storage/packages/npm/*`)
      await this.$(`rm -rf storage/mocks/*`)
    } catch (e) {}
  }
}
