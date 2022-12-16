import type {Bud} from '@roots/bud'
import BudCommand from '@roots/bud/cli/commands/bud'
import {Command} from '@roots/bud-support/clipanion'
import axios from 'axios'

/**
 * `bud upgrade` command
 *
 * @public
 */
export default class BudUpgradeCommand extends BudCommand {
  /**
   * Command paths
   *
   * @public
   */
  public static override paths = [[`upgrade`]]
  public static override usage = Command.Usage({
    description: `Upgrade @roots dependencies`,
    category: `tools`,
    examples: [[`Upgrade @roots dependencies`, `$0 upgrade`]],
  })

  public override dry = true
  public override notify = false

  /**
   * Command execute
   *
   * @public
   */
  public override async runCommand(bud: Bud) {
    try {
      await this.bumpDependenciesOfType(bud, `dependencies`)
      await this.bumpDependenciesOfType(bud, `devDependencies`)

      await bud.fs.json.write(`package.json`, bud.context.manifest)

      this.text(
        `Dependencies upgraded in \`package.json\`.\n\nRun \`yarn install\` or \`npm install\` to install.\n\n`,
      )
    } catch (e) {
      throw e
    }
  }

  public async bumpDependenciesOfType(
    bud: Bud,
    type: `devDependencies` | `dependencies`,
  ): Promise<void> {
    await Promise.all(
      Object.keys(bud.context.manifest[type] ?? {})
        .filter(
          (signifier: string) =>
            signifier.startsWith(`@roots/`) || signifier.includes(`bud-`),
        )
        ?.map(async signifier => {
          const latest = await this.getLatestVersion(signifier)
          bud.context.manifest[type][signifier] = latest
        }),
    )
  }

  public async getLatestVersion(signifier: string) {
    return await axios
      .get(`https://registry.npmjs.org/${signifier}/latest`)
      .then(async res => res.data?.version)
  }
}
