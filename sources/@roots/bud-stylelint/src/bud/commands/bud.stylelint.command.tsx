import {join, resolve} from 'node:path'

import type {Bud} from '@roots/bud'
import BudCommand from '@roots/bud/cli/commands/bud'
import {Command, Option} from '@roots/bud-support/clipanion'

export class BudStylelintCommand extends BudCommand {
  /**
   * Command paths
   *
   * @public
   */
  public static override paths = [
    [`lint`],
    [`lint`, `css`],
    [`lint`, `scss`],
    [`lint`, `sass`],
    [`stylelint`],
  ]

  /**
   * Comand usage
   * @public
   */
  public static override usage = Command.Usage({
    category: `tools`,
    description: `stylelint CLI passthrough`,
    examples: [
      [`View stylelint usage information`, `$0 stylelint --help`],
    ],
  })

  public override dry = true

  public override notify = false

  public options = Option.Proxy({name: `stylelint passthrough options`})

  /**
   * Command execute
   *
   * @public
   */
  public override async runCommand(bud: Bud) {
    const stylelint = await bud.module.getDirectory(`stylelint`)
    const bin = join(stylelint, `bin`, `stylelint.js`)

    if (!this.options?.length)
      this.options = [bud.path(`@src`, `**/*.{css,scss,sass}`)]

    await bud.sh([`node`, bin, ...(this.options ?? [])].filter(Boolean), {
      cwd: resolve(process.cwd(), this.basedir ?? `./`),
    })
  }
}
