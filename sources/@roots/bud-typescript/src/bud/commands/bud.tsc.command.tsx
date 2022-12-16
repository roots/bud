import {join, resolve} from 'node:path'

import type {Bud} from '@roots/bud'
import BudCommand from '@roots/bud/cli/commands/bud'
import {bind} from '@roots/bud-framework/extension/decorators'
import {Command, Option} from '@roots/bud-support/clipanion'

export class BudTSCCommand extends BudCommand {
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

  public options = Option.Proxy({name: `tsc passthrough options`})

  /**
   * Command execute
   *
   * @public
   */
  @bind
  public override async runCommand(bud: Bud) {
    const tsc = await bud.module.getDirectory(`tsc`)
    const bin = join(tsc, `bin`, `tsc`)

    const child = bud.sh(
      [`node`, bin, ...(this.options ?? [])].filter(Boolean),
      {
        cwd: resolve(process.cwd(), this.basedir ?? `./`),
      },
    )
    child.stdout.pipe(process.stdout)
    child.stderr.pipe(process.stderr)
    await child
  }
}
