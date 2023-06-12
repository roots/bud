import {Option} from '@roots/bud-support/clipanion'
import BudCommand from '@roots/bud/cli/commands/bud'
import {dry} from '@roots/bud/cli/decorators/dry'
import {join} from 'node:path'

@dry
export class BudEslintCommand extends BudCommand {
  public static override paths = [[`lint`, `js`], [`eslint`]]

  public static override usage = BudCommand.Usage({
    category: `tools`,
    description: `eslint CLI passthrough`,
    examples: [[`View eslint usage information`, `$0 eslint --help`]],
  })

  public options = Option.Proxy({name: `eslint passthrough options`})

  public override async execute() {
    await this.makeBud()
    await this.bud.run()

    const eslint = join(
      await this.bud.module.getDirectory(`eslint`, import.meta.url),
      `bin`,
      `eslint.js`,
    )

    if (!this.options?.length)
      this.options = [this.bud.path(`@src`, `**`, `*.{ts,tsx,js,jsx}`)]

    await this.$(this.bin, [eslint, ...this.options])
  }
}
