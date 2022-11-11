import {join, resolve} from 'node:path'

import {Command, Option} from '@roots/bud-support/clipanion'
import execa from '@roots/bud-support/execa'

import BaseCommand from './base.js'

/**
 * `bud webpack` command
 *
 * @public
 */
export default class WebpackCommand extends BaseCommand {
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

  public override notify = false

  public options = Option.Proxy({name: `webpack passthrough options`})

  /**
   * Command execute
   *
   * @public
   */
  public override async runCommand() {
    this.app.context.config = {}
    const webpackPath = await this.app.module.getDirectory(`webpack`)
    const bin = join(webpackPath, `bin`, `webpack.js`)

    const child = execa(`node`, [bin, ...this.options], {
      cwd: resolve(process.cwd(), this.basedir ?? ``),
    })
    child.stdout.pipe(process.stdout)
    child.stderr.pipe(process.stderr)
    await child
  }
}
