import BudCommand, {ArgsModifier} from '@roots/bud/cli/commands/bud'
import {dry} from '@roots/bud/cli/decorators/command.dry'
import {Command, Option} from '@roots/bud-support/clipanion'
import {bind} from '@roots/bud-support/decorators'

/**
 * bud upgrade command
 */
@dry
export default class BudUpgradeCommand extends BudCommand {
  /**
   * Command paths
   */
  public static override paths = [[`upgrade`], [`version`, `set`]]

  /**
   * Command usage
   */
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

  /**
   * --version
   */
  public version = Option.String({required: false})

  /**
   * --registry
   */
  public registry = Option.String(`--registry`, undefined, {
    description: `custom registry`,
  })

  /**
   * Execute command
   */
  public override async execute() {
    await this.makeBud(this)
    await this.bud.run()

    if (!this.version) {
      const get = await import(`@roots/bud-support/axios`).then(
        ({default: axios}) => axios.get,
      )

      this.version = await get(
        `https://registry.npmjs.org/@roots/bud/latest`,
      ).then(async res => res.data?.version)
    }

    if (this.hasUpgradeableDependencies(`devDependencies`)) {
      await this.cli.run([`add`,
        ...(this.registry ? [`--registry`, this.registry] : []),
        `--dev`,
        ...this.getUpgradeableDependencies(`devDependencies`),
      ])
    }

    if (this.hasUpgradeableDependencies(`dependencies`)) {
      await this.cli.run([`add`,
        ...(this.registry ? [`--registry`, this.registry] : []),
        ...this.getUpgradeableDependencies(`devDependencies`),
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
}
