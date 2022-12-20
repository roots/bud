import {join, resolve} from 'node:path'

import BudCommand from '@roots/bud/cli/commands/bud'
import {dry} from '@roots/bud/cli/decorators/command.dry'
import {Option} from '@roots/bud-support/clipanion'

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
    await this.makeBud(this)
    const eslint = await this.bud.module.getDirectory(`eslint`)
    const bin = join(eslint, `bin`, `eslint.js`)

    if (!this.options?.length)
      this.options = [this.bud.path(`@src`, `**/*.{ts,tsx,js,jsx}`)]

    await this.bud.sh([bin, ...this.options].filter(Boolean), {
      cwd: resolve(process.cwd(), this.basedir ?? `./`),
    })
  }
}
