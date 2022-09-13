import BaseCommand from '@roots/bud/cli/commands/base'
import {Command, Option} from 'clipanion'
import {execa} from 'execa'
import {join, resolve} from 'node:path'

export class BudEslintCommand extends BaseCommand {
  /**
   * Command paths
   *
   * @public
   */
  public static paths = [[`lint`]]

  /**
   * Comand usage
   * @public
   */
  public static usage = Command.Usage({
    category: `tools`,
    description: `eslint CLI passthrough`,
    examples: [[`View eslint usage information`, `$0 eslint --help`]],
  })

  public dry = true

  public notify = false

  public options = Option.Proxy({name: `eslint passthrough options`})

  /**
   * Command execute
   *
   * @public
   */
  public async runCommand() {
    this.app.context.config = {}
    const eslint = await this.app.module.getDirectory(`eslint`)
    const bin = join(eslint, `bin`, `eslint.js`)

    const child = execa(
      `node`,
      [
        bin,
        this.app.path(`@src`, `**/*.{js,jsx,ts,tsx}`),
        ...this.options,
      ].filter(Boolean),
      {
        cwd: resolve(process.cwd(), this.basedir ?? `./`),
      },
    )
    child.stdout.pipe(process.stdout)
    child.stderr.pipe(process.stderr)
    await child
  }
}
