import {Command, Option} from 'clipanion'
import {execa} from 'execa'
import {join, resolve} from 'node:path'

import {BaseCommand} from './base.js'

/**
 * `bud webpack` command
 *
 * @public
 */
export class WebpackCommand extends BaseCommand {
  /**
   * Command paths
   * @public
   */
  public static paths = [[`webpack`]]

  /**
   * Command usage
   * @public
   */
  public static usage = Command.Usage({
    description: `Webpack CLI passthrough`,
    examples: [[`View webpack usage information`, `$0 webpack -- --help`]],
  })

  public options = Option.Rest({name: `webpack positionals and options`})

  /**
   * Command execute
   *
   * @public
   */
  public async runCommand() {
    this.app.context.config = {}
    const webpackPath = await this.app.module.getDirectory(`webpack`)
    const bin = join(webpackPath, `bin`, `webpack.js`)

    const child = execa(`node`, [bin, ...this.options], {
      cwd: resolve(process.cwd(), this.basedir ?? `./`),
    })
    child.stdout.pipe(process.stdout)
    child.stderr.pipe(process.stderr)
    await child
  }
}
