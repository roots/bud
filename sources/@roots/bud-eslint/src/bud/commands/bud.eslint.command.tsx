import {join, resolve} from 'node:path'

import type {Bud} from '@roots/bud'
import BudCommand from '@roots/bud/cli/commands/bud'
import {Option} from '@roots/bud-support/clipanion'

export class BudEslintCommand extends BudCommand {
  /**
   * Command paths
   *
   * @public
   */
  public static override paths = [[`lint`, `js`], [`eslint`]]

  /**
   * Comand usage
   * @public
   */
  public static override usage = BudCommand.Usage({
    category: `tools`,
    description: `eslint CLI passthrough`,
    examples: [[`View eslint usage information`, `$0 eslint --help`]],
  })

  public override dry = true

  public override notify = false

  public options = Option.Proxy({name: `eslint passthrough options`})

  /**
   * Command execute
   *
   * @public
   */
  public override async runCommand(bud: Bud) {
    const eslint = await bud.module.getDirectory(`eslint`)
    const bin = join(eslint, `bin`, `eslint.js`)

    if (!this.options?.length)
      this.options = [bud.path(`@src`, `**/*.{ts,tsx,js,jsx}`)]

    await bud.sh([bin, ...this.options].filter(Boolean), {
      cwd: resolve(process.cwd(), this.basedir ?? `./`),
    })
  }
}
