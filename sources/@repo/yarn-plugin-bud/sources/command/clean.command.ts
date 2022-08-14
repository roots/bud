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
    await this.$(
      `rm -rf **/.budfiles`,
      `rm -rf ${repo.paths.root}node_modules`,
      `rm -rf ${repo.paths.sources}@roots/*/lib`,
      `rm -rf ${repo.paths.sources}@roots/*/node_modules`,
      `rm -rf ${repo.paths.sources}@roots/*/types`,
      `rm -rf ${repo.paths.sources}**/.tsbuildinfo`,
      `rm -rf ${repo.paths.root}storage/packages`,
      `rm -rf ${repo.paths.root}storage/mocks`,
      `rm -rf ${repo.paths.root}storage/node_modules`,
      `rm -rf ${repo.paths.root}storage/yarn`,
      `rm -rf ${repo.paths.root}storage/.verdaccio-db.json`,
    )
  }
}
