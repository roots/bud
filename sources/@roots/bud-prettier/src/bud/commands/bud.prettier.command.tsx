import {join, resolve} from 'node:path'

import BaseCommand from '@roots/bud/cli/commands/base'
import {bind} from '@roots/bud-framework/extension/decorators'
import {Command, Option} from '@roots/bud-support/clipanion'
import execa from '@roots/bud-support/execa'

export class BudPrettierCommand extends BaseCommand {
  /**
   * Command paths
   * @public
   */
  public static override paths = [[`format`], [`prettier`]]

  /**
   * Comand usage
   * @public
   */
  public static override usage = Command.Usage({
    category: `tools`,
    description: `Prettier CLI`,
    examples: [[`View prettier usage information`, `$0 prettier --help`]],
  })

  public override dry = true

  public override notify = false

  public options = Option.Proxy({name: `prettier passthrough options`})

  /**
   * Command execute
   *
   * @public
   */
  @bind
  public override async runCommand() {
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
