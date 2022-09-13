import BaseCommand from '@roots/bud/cli/commands/base'
import {Command, Option} from 'clipanion'
import {execa} from 'execa'
import {join, resolve} from 'node:path'

export class BudTailwindCommand extends BaseCommand {
  /**
   * Command paths
   *
   * @public
   */
  public static paths = [[`tailwindcss`]]

  /**
   * Comand usage
   *
   * @public
   */
  public static usage = Command.Usage({
    category: `tools`,
    description: `tailwindcss CLI passthrough`,
    examples: [
      [`View tailwindcss usage information`, `$0 tailwindcss --help`],
    ],
  })

  public dry = true

  public notify = false

  public input = Option.String(`--input,-i`, undefined, {
    description: `input file`,
  })

  public output = Option.String(`--output,-o`, undefined, {
    description: `output file`,
  })

  public watch = Option.Boolean(`--watch,-w`, true, {
    description: `watch mode`,
  })

  public options = Option.Proxy({name: `tailwindcss passthrough options`})

  /**
   * Command execute
   *
   * @public
   */
  public async runCommand() {
    this.app.context.config = {}
    const tailwindPath = await this.app.module.getDirectory(`tailwindcss`)
    const bin = join(tailwindPath, `lib`, `cli.js`)

    const child = execa(
      `node`,
      [
        bin,
        ...this.options,
        `-i`,
        this.input === undefined
          ? this.app.path(`@src`, `index.css`)
          : this.input,
        `-o`,
        this.output === undefined
          ? this.app.path(`@dist`, `index.css`)
          : this.output,
        ...(this.watch === true && this.app.isDevelopment
          ? `--watch`
          : ``),
      ].filter(Boolean),
      {
        cwd: resolve(process.cwd(), this.basedir ?? `./`),
      },
    )
    child.stdout.pipe(process.stdout)
    child.stderr.pipe(process.stderr)
    await child
  }
}
