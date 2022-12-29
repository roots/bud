import {join} from 'node:path'

import BudCommand from '@roots/bud/cli/commands/bud'
import {dry} from '@roots/bud/cli/decorators/command.dry'
import {Command, Option} from '@roots/bud-support/clipanion'

/**
 * `bud webpack` command
 *
 * @public
 */
@dry
export default class BudWebpackCommand extends BudCommand {
  public static override paths = [[`webpack`]]

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
  public override async execute() {
    await this.makeBud(this)
    await this.run(this)

    const bin = join(
      await this.bud.module.getDirectory(`webpack`),
      `bin`,
      `webpack.js`,
    )

    this.text(`\n\n$ ${this.bin} ${bin}\n\n`)

    await this.$(this.bin, [
      bin,
      ...this.options.filter(key => key !== `--log`),
    ])
  }
}
