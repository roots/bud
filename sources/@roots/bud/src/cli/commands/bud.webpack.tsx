import {join, resolve} from 'node:path'

import type {Bud} from '@roots/bud'
import BudCommand from '@roots/bud/cli/commands/bud'
import {Command, Option} from '@roots/bud-support/clipanion'
import execa from '@roots/bud-support/execa'

/**
 * `bud webpack` command
 *
 * @public
 */
export default class BudWebpackCommand extends BudCommand {
  /**
   * Command paths
   * @public
   */
  public static override paths = [[`webpack`]]

  /**
   * Command usage
   * @public
   */
  public static override usage = Command.Usage({
    description: `Webpack CLI passthrough`,
    category: `tools`,
    examples: [[`View webpack usage information`, `$0 webpack --help`]],
  })

  public options = Option.Proxy({name: `webpack passthrough options`})

  /**
   * Command execute
   *
   * @public
   */
  public override async runCommand(bud: Bud) {
    bud.context.config = {}
    const webpackPath = await bud.module.getDirectory(`webpack`)
    const bin = join(webpackPath, `bin`, `webpack.js`)

    const child = execa(`node`, [bin, ...this.options], {
      cwd: resolve(process.cwd(), this.basedir ?? ``),
    })
    child.stdout.pipe(process.stdout)
    child.stderr.pipe(process.stderr)
    await child
  }
}
