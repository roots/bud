import {join, relative} from 'node:path'

import {Option} from '@roots/bud-support/clipanion'
import BudCommand from '@roots/bud/cli/commands/bud'
import {dry} from '@roots/bud/cli/decorators/dry'

@dry
export class BudTailwindCommand extends BudCommand {
  public static override paths = [[`tailwindcss`], [`tw`]]

  public static override usage = BudCommand.Usage({
    category: `tools`,
    description: `tailwindcss CLI passthrough`,
    examples: [
      [`View tailwindcss usage information`, `$0 tailwindcss --help`],
    ],
  })

  public options = Option.Proxy({name: `tailwindcss passthrough options`})

  public override async execute() {
    await this.makeBud()
    await this.bud.run()

    const tw = join(
      await this.bud.module.getDirectory(`tailwindcss`),
      `lib`,
      `cli.js`,
    )

    if (!this.options.length) {
      const input = await Promise.all(
        await this.bud.fs.find(this.bud.path(`@src`, `**/*.css`)),
      ).then(paths => paths.filter(Boolean).shift())

      this.options.push(
        `--input`,
        input,
        `--output`,
        this.bud.relPath(`@dist`, relative(this.bud.path(`@src`), input)),
      )

      const config = this.bud.context.files[`tailwind.config`]?.path

      if (config) {
        this.options.push(`--config`, this.bud.relPath(config))
      }
    }

    this.context.stdout.write(`tailwindcss ${this.options.join(` `)}\n\n`)

    await this.$(this.bin, [tw, ...(this.options ?? [])])
  }
}
