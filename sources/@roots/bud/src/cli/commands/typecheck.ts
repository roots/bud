import chalk from 'chalk'
import {Command} from 'clipanion'
import {execa} from 'execa'
import fs from 'fs-extra'

import {factory} from '../../factory/index.js'
import {BaseCommand} from './base.js'

/**
 * `bud typecheck` command
 *
 * @public
 */
export class TypecheckCommand extends BaseCommand {
  /**
   * Command paths
   *
   * @public
   */
  public static paths = [[`typecheck`]]

  /**
   * Comand usage
   *
   * @public
   */
  public static usage = Command.Usage({
    category: `Typecheck`,
    description: `Typecheck source`,
  })

  /**
   * Command execute
   *
   * @public
   */
  public async execute() {
    this.app = await factory({
      name: `bud`,
      mode: `production`,
      context: {
        ...this.context,
        args: {
          ...this.context.args,
          ci: true,
        },
      },
    })

    const hasTsConfig = await fs.pathExists(
      this.app.path(`./tsconfig.json`),
    )
    if (!hasTsConfig) {
      this.app.error(
        `A tsconfig.json config file is required in the project root in order to run typechecking`,
      )
    }

    const check = execa(`tsc`, [`--noEmit`], {cwd: this.app.path(`./`)})

    this.context.stdout.write(`checking types\n`)

    check.stdout.on(`data`, message => {
      this.context.stdout.write(message.toString())
    })
    check.stderr.on(`data`, message => {
      this.app.error(message.toString())
    })

    await check

    this.context.stdout.write(chalk.green(`typecheck complete\n`))
    this.app.close()
  }
}
