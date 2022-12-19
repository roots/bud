import BudCommand from '@roots/bud/cli/commands/bud'
import type {Context} from '@roots/bud-framework/options'
import {Command, Option} from '@roots/bud-support/clipanion'
import axios from 'axios'

/**
 * `bud upgrade` command
 *
 * @public
 */
export default class BudUpgradeCommand extends BudCommand {
  public static override paths = [[`upgrade`]]
  public static override usage = Command.Usage({
    description: `Upgrade @roots dependencies`,
    category: `tools`,
    examples: [
      [`Upgrade dependencies to latest`, `$0 upgrade`],
      [`Upgrade dependencies to specific version`, `$0 upgrade 6.6.6`],
    ],
  })
  public override withArguments = async (args: Context[`args`]) => ({
    ...args,
    dry: true,
  })

  public version = Option.String({required: false})

  public override async execute() {
    await this.makeBud(this)

    try {
      await this.doDepsOfType(`dependencies`)
      await this.doDepsOfType(`devDependencies`)

      await this.bud.fs.json.write(
        `package.json`,
        this.bud.context.manifest,
      )

      BudUpgradeCommand.text(
        `Dependencies upgraded in \`package.json\`.\n\nRun \`yarn install\` or \`npm install\` to install.\n\n`,
      )
    } catch (e) {
      throw e
    }
  }

  public async doDepsOfType(
    type: `devDependencies` | `dependencies`,
  ): Promise<void> {
    await Promise.all(
      Object.keys(this.bud.context.manifest[type] ?? {})
        .filter(
          (signifier: string) =>
            signifier.startsWith(`@roots/`) || signifier.includes(`bud-`),
        )
        ?.map(async signifier => {
          this.bud.context.manifest[type][signifier] =
            this.version ?? (await this.getLatestVersion(signifier))
        }),
    )
  }

  public async getLatestVersion(signifier: string) {
    return await axios
      .get(`https://registry.npmjs.org/${signifier}/latest`)
      .then(async res => res.data?.version)
  }
}
