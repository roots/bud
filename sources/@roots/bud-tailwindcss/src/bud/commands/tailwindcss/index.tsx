import {relative} from 'node:path'

import BudCommand from '@roots/bud/cli/commands'
import {Option} from '@roots/bud-support/clipanion'

export class BudTailwindCommand extends BudCommand {
  /**
   * {@link BudCommand.paths}
   */
  public static override paths = [[`tailwindcss`], [`tw`]]

  /**
   * {@link BudCommand.usage}s
   */
  public static override usage = BudCommand.Usage({
    category: `tool`,
    description: `tailwindcss CLI passthrough`,
    examples: [[`Run tailwindcss`, `$0 tailwindcss`]],
  })

  /**
   * {@link BudCommand.options}
   */
  public options = Option.Proxy({name: `tailwindcss passthrough options`})

  /**
   * {@link BudCommand.execute}
   */
  public override async execute() {
    await this.makeBud()
    await this.bud.run()

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

    return await this.run([`tailwindcss`, `lib`, `cli.js`], this.options)
  }
}
