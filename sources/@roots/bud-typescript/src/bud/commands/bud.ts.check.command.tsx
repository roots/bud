import BaseCommand from '@roots/bud/cli/commands/base'
import chalk from 'chalk'
import {Command} from 'clipanion'
import {execa} from 'execa'
import fs from 'fs-extra'
import {bind} from 'helpful-decorators'

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
