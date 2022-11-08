import {Command, Option} from '@roots/bud-support/clipanion'
import {Dependencies, IDependencyManager} from '@roots/dependencies'

import BaseCommand from './base.js'

/**
 * `bud upgrade` command
 *
 * @public
 */
export default class UpgradeCommand extends BaseCommand {
  /**
   * Command paths
   *
   * @public
   */
  public static paths = [[`upgrade`]]

  /**
   * Command usage
   *
   * @public
   */
  public static usage = Command.Usage({
    description: `Upgrade @roots dependencies`,
    category: `tools`,
    examples: [[`Upgrade @roots dependencies`, `$0 upgrade`]],
  })

  public pacman = Option.Proxy({name: `package manager options`})

  public manager: Dependencies

  public client: IDependencyManager

  public isYarn: boolean

  /**
   * Command execute
   *
   * @public
   */
  public async runCommand() {
    this.manager = new Dependencies(this.app.context.basedir)
    this.isYarn = await this.manager.isYarn()
    this.client = await this.manager.getClient()

    const upgraded = []

    upgraded.push(
      ...(await this.upgradeAllRootsDependenciesOfType(`devDependencies`)),
      ...(await this.upgradeAllRootsDependenciesOfType(`dependencies`)),
    )

    if (upgraded.length) {
      await this.app.fs.write(
        `package.json`,
        this.app.fs.json.stringify(this.app.context.manifest, null, 2),
      )

      this.context.stdout.write(
        `\nDependencies upgraded in \`package.json\`.\n\nInstall with: ${
          this.isYarn ? `yarn install` : `npm install`
        }\n\n`,
      )
    }
  }

  public async upgradeAllRootsDependenciesOfType(
    type: `devDependencies` | `dependencies`,
  ): Promise<Array<string>> {
    const dependencies = Object.keys(
      this.app.context.manifest[type] ?? {},
    ).filter(
      (signifier: string) =>
        signifier.startsWith(`@roots/`) || signifier.includes(`bud-`),
    )

    if (!dependencies.length) return []

    await Promise.all(
      dependencies.map(async signifier => {
        this.app.context.manifest[type][signifier] =
          await this.client.getLatestVersion(signifier)
      }),
    )

    return dependencies
  }
}
