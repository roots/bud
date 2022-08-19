import * as repo from '@repo/constants'
import {CommandClass} from 'clipanion'
import {join} from 'path'

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
  public static label = `@bud clean`

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

  public err(err) {
    this.log(err)
  }

  /**
   * Command execution
   *
   * @internal
   */
  public async execute() {
    await this.$(
      `rm -rf **/.budfiles`,
      `rm -rf ${join(repo.paths.root, `node_modules`)}`,
      `rm -rf ${join(repo.paths.sources, `@roots/*/lib`)}`,
      `rm -rf ${join(repo.paths.sources, `@roots/*/node_modules`)}`,
      `rm -rf ${join(repo.paths.sources, `@roots/*/types`)}`,
      `rm -rf ${join(repo.paths.sources, `**/.tsbuildinfo`)}`,
      `rm -rf ${join(repo.paths.storage, `packages`)}`,
      `rm -rf ${join(repo.paths.storage, `mocks`)}`,
      `rm -rf ${join(repo.paths.storage, `node_modules`)}`,
      `rm -rf ${join(repo.paths.storage, `yarn`)}`,
      `rm -rf ${join(repo.paths.storage, `.verdaccio-db.json`)}`,
    )
  }
}
