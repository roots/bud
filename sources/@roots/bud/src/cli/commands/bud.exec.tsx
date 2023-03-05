import BudCommand from '@roots/bud/cli/commands/bud'
import {Command, Option} from '@roots/bud-support/clipanion'

import {dry} from '../decorators/command.dry.js'

/**
 * `bud exec` command
 *
 * @public
 */
@dry
export default class BudExec extends BudCommand {
  public static override paths = [[`exec`]]
  public static override usage = Command.Usage({
    description: `Execute file with bud pre-initialized`,
    details: `
      \`bud exec\` executes arbitrary scripts with bud pre-initialized`,
    category: `tools`,
    examples: [[`Execute script`, `$0 script.js --foo=bar`]],
  })

  public file = Option.String({
    name: `Execute a file`,
    required: true,
  })

  public options = Option.Proxy({name: `passthrough options`})

  public override async execute() {
    await this.makeBud(this)
    await this.bud.run()
    await this.$(this.bin, [this.file, ...this.options])
  }
}
