import BudCommand, {ArgsModifier} from '@roots/bud/cli/commands/bud'
import {dry} from '@roots/bud/cli/decorators/command.dry'
import {Command, Option} from '@roots/bud-support/clipanion'
import {bind} from '@roots/bud-support/decorators'

import {detectPackageManager} from '../helpers/detectPackageManager.js'
import {isInternalDevelopmentEnv} from '../helpers/isInternalDevelopmentEnv.js'

/**
 * `bud upgrade` command
 *
 * @public
 * @decorator `@dry`
 */
@dry
export default class BudUpgradeCommand extends BudCommand {
  public static override paths = [[`upgrade`], [`version`, `set`]]
  public static override usage = Command.Usage({
    description: `Set bud.js version`,
    details: `
      This command will upgrade your bud.js installation to the latest stable version.

      It will upgrade any package that is prefixed with \`@roots/\` or \`bud-\`.

      If a version is specified, the command will upgrade to that version.

      If a private registry is specified, the command will upgrade through that registry.

      This command is a passthrough to the package manager you are using.
    `,
    category: `tasks`,
    examples: [
      [`Upgrade dependencies to latest`, `$0 upgrade`],
      [`Upgrade dependencies to specific version`, `$0 upgrade 6.6.6`],
      [
        `Upgrade through a private registry`,
        `$0 upgrade --registry http://localhost:4873`,
      ],
    ],
  })
  public override withArguments = ArgsModifier({dry: true})

  public version = Option.String({required: false})

  public registry = Option.String(`--registry`, undefined, {
    description: `custom registry`,
  })

  public get bin(): `yarn` | `npm` {
    const pacman = detectPackageManager(this.bud)
    if (pacman === false) throw new Error(`Package manager is ambiguous`)
    return pacman
  }

  public get command() {
    return this.bin === `npm` ? `install` : `add`
  }

  public override async execute() {
    await this.makeBud(this)
    await this.healthcheck(this)
    await this.run(this)

    if (isInternalDevelopmentEnv(this.bud)) {
      throw new Error(`Internal development environment`)
    }

    if (!this.version) {
      const get = await import(`axios`).then(
        ({default: axios}) => axios.get,
      )
      this.version = await get(
        `https://registry.npmjs.org/@roots/bud/latest`,
      ).then(async res => res.data?.version)
    }

    if (this.hasUpgradeableDependencies(`devDependencies`)) {
      await this.$(this.bin, [
        this.command,
        ...this.getUpgradeableDependencies(`devDependencies`),
        ...this.getFlags(`devDependencies`),
      ])
    }

    if (this.hasUpgradeableDependencies(`dependencies`)) {
      await this.$(this.bin, [
        this.command,
        ...this.getUpgradeableDependencies(`dependencies`),
        ...this.getFlags(`dependencies`),
      ])
    }
  }

  @bind
  public getUpgradeableDependencies(
    type: `devDependencies` | `dependencies`,
  ): Array<string> {
    const onlyBud = (pkg: string) =>
      pkg.startsWith(`@roots/`) || pkg.includes(`bud-`)

    const toScope = (pkg: string) => `${pkg}@${this.version}`

    return this.getAllDependenciesOfType(type)
      .filter(onlyBud)
      .map(toScope)
      .filter(Boolean)
  }

  @bind
  public getAllDependenciesOfType(
    type: `devDependencies` | `dependencies`,
  ): Array<string> {
    if (this.bud?.context.manifest?.[type]) {
      return Object.keys(this.bud.context.manifest[type])
    }
    return []
  }

  @bind
  public hasUpgradeableDependencies(
    type: `devDependencies` | `dependencies`,
  ): boolean {
    return this.getUpgradeableDependencies(type)?.length > 0
  }

  @bind
  public getFlags(type: `devDependencies` | `dependencies`) {
    const flags = []

    if (type === `devDependencies`) {
      switch (this.bin) {
        case `npm`:
          flags.push(`--save-dev`)
          break
        case `yarn`:
          flags.push(`--dev`)
          break
      }
    }

    if (type === `dependencies` && this.bin === `npm`) {
      flags.push(`--save`)
    }

    if (this.registry) flags.push(`--registry`, this.registry)

    return flags
  }
}
