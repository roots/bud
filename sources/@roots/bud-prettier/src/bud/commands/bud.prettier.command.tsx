import {join, resolve} from 'node:path'

import BudCommand from '@roots/bud/cli/commands/bud'
import type {Bud} from '@roots/bud-framework'
import {bind} from '@roots/bud-framework/extension/decorators'
import {Command, Option} from '@roots/bud-support/clipanion'

export class BudPrettierCommand extends BudCommand {
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
  public override async runCommand(bud: Bud) {
    const prettier = await bud.module.getDirectory(`prettier`)
    const bin = join(prettier, `bin-prettier.js`)

    if (!this.options?.length)
      this.options = [
        bud.path(`@src`, `**/*.{ts,tsx,js,jsx,css,scss,sass}`),
        `--write`,
      ]

    await bud.sh([`node`, bin, ...(this.options ?? [])].filter(Boolean), {
      cwd: resolve(process.cwd(), this.basedir ?? `./`),
    })
  }
}
