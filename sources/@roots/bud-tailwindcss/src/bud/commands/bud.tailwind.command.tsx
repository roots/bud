import {join, resolve} from 'node:path'

import BaseCommand from '@roots/bud/cli/commands/base'
import {Command, Option} from '@roots/bud-support/clipanion'
import execa from '@roots/bud-support/execa'

export class BudTailwindCommand extends BaseCommand {
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
  public override async runCommand() {
    this.app.context.config = {}
    const tailwindPath = await this.app.module.getDirectory(`tailwindcss`)
    const bin = join(tailwindPath, `lib`, `cli.js`)

    if (!this.options?.length)
      this.options = [
        `-i`,
        this.app.path(`@src`, `index.css`),
        `-o`,
        this.app.path(`@dist`),
      ]

    const tw = execa(`node`, [bin, ...(this.options ?? [])], {
      cwd: resolve(process.cwd(), this.basedir ?? `./`),
    })

    tw?.stdout?.pipe(process.stdout)
    tw?.stderr?.pipe(process.stderr)

    await tw
  }
}
