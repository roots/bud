import {join, resolve} from 'node:path'

import BaseCommand from '@roots/bud/cli/commands/base'
import {Command, Option} from '@roots/bud-support/clipanion'
import execa from '@roots/bud-support/execa'

export class BudEslintCommand extends BaseCommand {
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
  public static override usage = Command.Usage({
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
  public override async runCommand() {
    const eslint = await this.app.module.getDirectory(`eslint`)
    const bin = join(eslint, `bin`, `eslint.js`)

    if (!this.options?.length)
      this.options = [this.app.path(`@src`, `**/*.{ts,tsx,js,jsx}`)]

    const child = execa(`node`, [bin, ...this.options].filter(Boolean), {
      cwd: resolve(process.cwd(), this.basedir ?? `./`),
    })

    child.catch(() => {})
    child.stdout.pipe(process.stdout)
    child.stderr.pipe(process.stderr)

    await child
  }
}
