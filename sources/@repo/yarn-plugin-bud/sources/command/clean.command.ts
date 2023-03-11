import * as repo from '@repo/constants'
import {CommandClass} from 'clipanion'
import {rm} from 'fs-extra'
import {join} from 'path'

import {Command} from './base.command'

/**
 * Clean command
 */
export class Clean extends Command {
  /**
   * Command name
   */
  public static label = `@bud clean`

  /**
   * Command paths
   */
  public static paths: CommandClass['paths'] = [[`@bud`, `clean`]]

  /**
   * Command usage
   */
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `clean project artifacts`,
    examples: [[`clean project artifacts`, `yarn @bud clean`]],
  }

  public targets = [
    `node_modules`,
    `sources/@roots/*/lib`,
    `sources/**/node_modules`,
    `sources/**/.tsbuildinfo`,
    `storage/mocks`,
    `storage/packages`,
    `storage/yarn`,
    `storage/.verdaccio-db.json`,
  ].map(path => join(repo.paths.root, path))

  /**
   * Command execution
   */
  public async execute() {
    await Promise.all(
      this.targets.map(async path => {
        this.log(`cleaning ${path}`)
        try {
          await rm(path, {recursive: true})
        } catch (e) {}
      }),
    )
  }
}
