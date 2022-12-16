import {join, resolve} from 'node:path'

import type {Bud} from '@roots/bud'
import BudCommand from '@roots/bud/cli/commands/bud'
import {Command, Option} from '@roots/bud-support/clipanion'

export class BudTailwindCommand extends BudCommand {
  /**
   * Command paths
   *
   * @public
   */
  public static override paths = [[`tailwindcss`]]

  /**
   * Comand usage
   *
   * @public
   */
  public static override usage = Command.Usage({
    category: `tools`,
    description: `tailwindcss CLI passthrough`,
    examples: [
      [`View tailwindcss usage information`, `$0 tailwindcss --help`],
    ],
  })

  public override dry = true

  public override notify = false

  public options = Option.Proxy({name: `tailwindcss passthrough options`})

  /**
   * Command execute
   *
   * @public
   */
  public override async runCommand(bud: Bud) {
    bud.context.config = {}
    const tailwindPath = await bud.module.getDirectory(`tailwindcss`)
    const bin = join(tailwindPath, `lib`, `cli.js`)

    if (!this.options?.length)
      this.options = [
        `-i`,
        bud.path(`@src`, `index.css`),
        `-o`,
        bud.path(`@dist`),
      ]

    await bud.sh([`node`, bin, ...(this.options ?? [])], {
      cwd: resolve(process.cwd(), this.basedir ?? `./`),
    })
  }
}
