import type {Bud} from '@roots/bud'
import BudCommand from '@roots/bud/cli/commands/bud'
import {Command, Option} from '@roots/bud-support/clipanion'
import execa from '@roots/bud-support/execa'

import {isInternalDevelopmentEnv} from '../helpers/isInternalDevelopmentEnv.js'
import {isPackageManagerConflict} from '../helpers/isPackageManagerError.js'

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

  public bin: `yarn` | `npx`

  public isYarn() {
    return this.bin.includes(`yarn`)
  }

  /**
   * Command execute
   *
   * @public
   */
  public override async runCommand(bud: Bud) {
    if (isInternalDevelopmentEnv(bud)) {
      this.text(
        `Refusing to install dependencies in internal development environment.\n`,
      )
      return
    }

    if (isPackageManagerConflict(bud)) {
      this.text(
        `Refusing to install dependencies due to package manager conflict.\n`,
      )
      return
    }

    this.bin =
      bud.context.manifest?.packageManager?.includes(`yarn`) ||
      bud.context.config?.[`yarn.lock`]
        ? `yarn`
        : `npx`

    const upgraded = []

    upgraded.push(
      ...(await this.upgradeAllRootsDependenciesOfType(
        bud,
        `devDependencies`,
      )),
      ...(await this.upgradeAllRootsDependenciesOfType(
        bud,
        `dependencies`,
      )),
    )

    if (upgraded.length) {
      await bud.fs.write(
        `package.json`,
        bud.fs.json.stringify(bud.context.manifest, null, 2),
      )

      this.text(`Dependencies upgraded in \`package.json\`.`)
      this.text(`Run \`yarn install\` or \`npm install\` to install.\n\n`)
    }
  }

  public async upgradeAllRootsDependenciesOfType(
    bud: Bud,
    type: `devDependencies` | `dependencies`,
  ): Promise<Array<string>> {
    const dependencies = Object.keys(
      bud.context.manifest[type] ?? {},
    ).filter(
      (signifier: string) =>
        signifier.startsWith(`@roots/`) || signifier.includes(`bud-`),
    )

    await Promise.all(
      dependencies?.map(
        async signifier => {
          bud.context.manifest[type][signifier] = await execa(
            this.bin,
            this.isYarn
              ? [`info`, signifier, `version`]
              : [`view`, signifier, `version`],
          ).then(({stdout}) => stdout.split(`\n`).shift().trim())
        },
        {cwd: bud.context.basedir},
      ),
    )

    return dependencies
  }
}
