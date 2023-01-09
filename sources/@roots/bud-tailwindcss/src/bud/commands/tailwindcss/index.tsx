import {join} from 'node:path'

import BudCommand from '@roots/bud/cli/commands/bud'
import {dry} from '@roots/bud/cli/decorators/command.dry'
import {Option} from '@roots/bud-support/clipanion'

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
    await this.makeBud(this)
    await this.run(this)

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
        this.bud.relPath(
          this.bud.path(`@dist`, this.bud.relPath(`@src`, input)),
        ),
      )

      const config =
        this.bud.context.config[`tailwind.config.js`] ||
        this.bud.context.config[`tailwind.config.cjs`] ||
        this.bud.context.config[`tailwind.config.mjs`] ||
        this.bud.context.config[`tailwind.config.ts`]

      if (config?.path) {
        this.options.push(`--config`, this.bud.relPath(config.path))
      }
    }

    this.text(`tailwindcss ${this.options.join(` `)}`)

    await this.$(this.bin, [tw, ...(this.options ?? [])])
  }
}
