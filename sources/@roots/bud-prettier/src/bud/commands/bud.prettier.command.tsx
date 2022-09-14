import BaseCommand from '@roots/bud/cli/commands/base'
import {bind} from '@roots/bud-framework/extension/decorators'
import {Command, Option} from '@roots/bud-support/clipanion'
import execa from '@roots/bud-support/execa'
import {join, resolve} from 'node:path'

export class BudPrettierCommand extends BaseCommand {
  /**
   * Command paths
   * @public
   */
  public static paths = [[`format`], [`prettier`]]

  /**
   * Comand usage
   * @public
   */
  public static usage = Command.Usage({
    category: `tools`,
    description: `Prettier CLI`,
    examples: [[`View prettier usage information`, `$0 prettier --help`]],
  })

  public dry = true

  public notify = false

  public options = Option.Proxy({name: `prettier passthrough options`})

  /**
   * Command execute
   *
   * @public
   */
  @bind
  public async runCommand() {
    const prettier = await this.app.module.getDirectory(`prettier`)
    const bin = join(prettier, `bin-prettier.js`)

    if (!this.options?.length)
      this.options = [
        this.app.path(`@src`, `**/*.{ts,tsx,js,jsx,css,scss,sass}`),
        `--write`,
      ]

    const child = execa(
      `node`,
      [bin, ...(this.options ?? [])].filter(Boolean),
      {
        cwd: resolve(process.cwd(), this.basedir ?? `./`),
      },
    )
    child.stdout.pipe(process.stdout)
    child.stderr.pipe(process.stderr)
    await child
  }
}
