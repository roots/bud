import BaseCommand from '@roots/bud/cli/commands/base'
import {Command} from '@roots/bud-support/clipanion'
import {bind} from '@roots/bud-support/decorators'
import execa from '@roots/bud-support/execa'
import * as fs from '@roots/bud-support/fs'
import chalk from 'chalk'

export class BudTSCheckCommand extends BaseCommand {
  /**
   * Command paths
   *
   * @public
   */
  public static paths = [[`ts`, `check`]]

  /**
   * Comand usage
   *
   * @public
   */
  public static usage = Command.Usage({
    category: `@roots/bud-typescript`,
    description: `Typecheck application source code`,
    details: `
      This command runs the \`tsc\` command with the \`--noEmit\` flag.

      It is required that a \`tsconfig.json\` file exists in the project root.
    `,
    examples: [[`bud ts check`, `Typecheck application source`]],
  })

  public dry = true

  public get args() {
    return {
      ...this.context.args,
      dry: true,
      mode: `production` as `production`,
    }
  }

  /**
   * Command execute
   *
   * @public
   */
  @bind
  public async runCommand() {
    const hasTsConfig = await fs.pathExists(
      this.app.path(`./tsconfig.json`),
    )

    if (!hasTsConfig) {
      this.app.error(
        `A tsconfig.json config file is required in the project root in order to run typechecking`,
      )
    }

    try {
      const check = execa(`tsc`, [`--noEmit`])

      this.context.stdout.write(`checking types\n`)

      check.stdout.on(`data`, message => {
        this.context.stdout.write(message.toString())
      })
      check.stderr.on(`data`, message => {
        this.app.error(message.toString())
      })

      await check
    } catch (error) {
      this.context.stderr.write(
        [chalk.bgRed.whiteBright(`error`), `bud ts check`].join(` `),
      )
      this.context.stderr.write(`\n${error.message}\n`)
      return
    }

    this.context.stdout.write(chalk.green(`typecheck complete\n`))
  }
}
