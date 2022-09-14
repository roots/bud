import BaseCommand from '@roots/bud/cli/commands/base'
import {Command} from '@roots/bud-support/clipanion'
import {bind} from '@roots/bud-support/decorators'
import execa from '@roots/bud-support/execa'
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
    category: `tools`,
    description: `Typecheck source code`,
    details: `
      This command runs the \`tsc\` command with the \`--noEmit\` flag.

      It is required that a \`tsconfig.json\` file exists in the project root.
    `,
    examples: [[`bud ts check`, `Typecheck source`]],
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
    try {
      const check = execa(`bud`, [`tsc`, `--noEmit`])

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
