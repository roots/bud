import {Command, Option} from '@roots/bud-support/clipanion'
import execa from '@roots/bud-support/execa'

import {isInternalDevelopmentEnv} from '../helpers/isInternalDevelopmentEnv.js'
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
  public static override paths = [[`upgrade`]]

  /**
   * Command usage
   *
   * @public
   */
  public static override usage = Command.Usage({
    description: `Upgrade @roots dependencies`,
    category: `tools`,
    examples: [[`Upgrade @roots dependencies`, `$0 upgrade`]],
  })

  public pacman = Option.Proxy({name: `package manager options`})

  public get manager() {
    return this.app.context.manifest?.packageManager?.includes(`yarn`) ||
      this.app.context.config?.[`yarn.lock`]
      ? `yarn`
      : `npx`
  }

  public isYarn() {
    return this.manager === `yarn`
  }

  /**
   * Command execute
   *
   * @public
   */
  public override async runCommand() {
    if (
      this.app.context.config?.[`yarn.lock`] &&
      this.app.context.config?.[`package-lock.json`]
    ) {
      this.text(
        `Refusing to install dependencies due to package manager conflict.\n`,
      )
      return
    }

    if (isInternalDevelopmentEnv(this.app)) {
      this.text(
        `Refusing to install dependencies in internal development environment.\n`,
      )
      return
    }

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

      this.text(`Dependencies upgraded in \`package.json\`.`)
      this.text(`Run \`yarn install\` or \`npm install\` to install.\n\n`)
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

    await Promise.all(
      dependencies?.map(
        async signifier => {
          this.app.context.manifest[type][signifier] = await execa(
            this.manager,
            this.isYarn
              ? [`info`, signifier, `version`]
              : [`view`, signifier, `version`],
          ).then(({stdout}) => stdout.split(`\n`).shift().trim())
        },
        {cwd: this.app.context.basedir},
      ),
    )

    return dependencies
  }
}
