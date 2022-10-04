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
  public static paths = [
    [`lint`, `css`],
    [`lint`, `scss`],
    [`lint`, `sass`],
    [`stylelint`],
  ]

  /**
   * Comand usage
   * @public
   */
  public static usage = Command.Usage({
    category: `tools`,
    description: `stylelint CLI passthrough`,
    examples: [
      [`View stylelint usage information`, `$0 stylelint --help`],
    ],
  })

  public dry = true

  public notify = false

  public options = Option.Proxy({name: `stylelint passthrough options`})

  /**
   * Command execute
   *
   * @public
   */
  public async runCommand() {
    const stylelint = await this.app.module.getDirectory(`stylelint`)
    const bin = join(stylelint, `bin`, `stylelint.js`)

    if (!this.options?.length)
      this.options = [this.app.path(`@src`, `**/*.{css,scss,sass}`)]

    const child = execa(
      `node`,
      [bin, ...(this.options ?? [])].filter(Boolean),
      {
        cwd: resolve(process.cwd(), this.basedir ?? `./`),
      },
    )

    child.catch(() => {})
    child.stdout.pipe(process.stdout)
    child.stderr.pipe(process.stderr)

    await child
  }
}
