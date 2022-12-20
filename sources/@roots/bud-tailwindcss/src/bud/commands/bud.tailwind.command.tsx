import {join} from 'node:path'

import BudCommand from '@roots/bud/cli/commands/bud'
import {dry} from '@roots/bud/cli/decorators/command.dry'
import {Command, Option} from '@roots/bud-support/clipanion'

@dry
export class BudTailwindCommand extends BudCommand {
  public static override paths = [[`tailwindcss`]]
  public static override usage = Command.Usage({
    category: `tools`,
    description: `tailwindcss CLI passthrough`,
    examples: [
      [`View tailwindcss usage information`, `$0 tailwindcss --help`],
    ],
  })
  public declare binPath: string | undefined
  public bin = Option.String(`--bin`, undefined, {description: `bin path`})
  public options = Option.Proxy({name: `tailwindcss passthrough options`})

  public override async execute() {
    await this.makeBud(this)

    const path =
      this.bin ?? (await this.bud.module.getDirectory(`tailwindcss`))

    this.bin = join(path, `lib`, `cli.js`)

    await this.bud.sh([`node`, this.bin, ...(this.options ?? [])], {
      cwd: this.bud.path(),
    })
  }
}
