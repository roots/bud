import {join, resolve} from 'node:path'

import BaseCommand from '@roots/bud/cli/commands/base'
import {bind} from '@roots/bud-framework/extension/decorators'
import {Command, Option} from '@roots/bud-support/clipanion'
import execa from '@roots/bud-support/execa'

export class BudTSCCommand extends BaseCommand {
  /**
   * Command paths
   * @public
   */
  public static override paths = [[`tsc`]]

  /**
   * Comand usage
   * @public
   */
  public static override usage = Command.Usage({
    category: `tools`,
    description: `TypeScript CLI passthrough`,
    examples: [[`View tsc usage information`, `$0 tsc --help`]],
  })

  public override dry = true

  public override notify = false

  public options = Option.Proxy({name: `tsc passthrough options`})

  /**
   * Command execute
   *
   * @public
   */
  @bind
  public override async runCommand() {
    const tsc = await this.app.module.getDirectory(`tsc`)
    const bin = join(tsc, `bin`, `tsc`)

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
