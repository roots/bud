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
  public name = 'clean'

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
    examples: [[`delete yarn cache`, `yarn @bud clean`]],
  }

  /**
   * Command execution
   *
   * @internal
   */
  public async execute() {
    await this.$(`yarn cache clean --all`)

    if (process.env.YARN_RC_FILENAME == 'config/yarnrc.dev.yml') {
      try {
        await this.$(`rm -rf storage/packages/@roots/**/*`)
      } catch (e) {}

      try {
        await this.$(`cp -rf examples/* /srv/mocks/yarn/`)
        await this.$(`cp -rf examples/* /srv/mocks/npm/`)
      } catch (e) {}
    }
  }

  public async errorHandler(e: string) {
    process.stdout.write(`[non-fatal] ${e}`)
  }
}
