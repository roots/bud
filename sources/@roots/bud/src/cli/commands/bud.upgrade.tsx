import {Command, Option} from '@roots/bud-support/clipanion'
import {bind} from '@roots/bud-support/decorators/bind'
import {BudError} from '@roots/bud-support/errors'
import isString from '@roots/bud-support/lodash/isString'
import whichPm from '@roots/bud-support/which-pm'
import BudCommand from '@roots/bud/cli/commands/bud'
import {dry} from '@roots/bud/cli/decorators/dry'

/**
 * `bud upgrade` command
 */
@dry
export default class BudUpgradeCommand extends BudCommand {
  /**
   * {@link Command.paths}
   */
  public static override paths = [[`upgrade`], [`version`, `set`]]

  /**
   * {@link Command.usage}
   */
  public static override usage = Command.Usage({
    category: `tasks`,
    description: `Set bud.js version`,
    details: `
      This command will upgrade your bud.js installation to the latest stable version.

      It will upgrade any package that is prefixed with \`@roots/\` or \`bud-\`.

      If a version is specified, the command will upgrade to that version.

      If a private registry is specified, the command will upgrade through that registry.

      This command is a passthrough to the package manager you are using.
    `,
    examples: [
      [`Upgrade dependencies to latest`, `$0 upgrade`],
      [`Upgrade dependencies to specific version`, `$0 upgrade 6.6.6`],
      [
        `Upgrade through a private registry`,
        `$0 upgrade --registry http://localhost:4873`,
      ],
    ],
  })

  public command: `add` | `install`

  public pacman: `npm` | `yarn`

  /**
   * Use an alternative registry
   */
  public registry = Option.String(`--registry`, undefined, {
    description: `custom registry`,
  })

  /**
   * Request a specific version of bud.js
   */
  public version = Option.String({required: false})

  public override async execute() {
    await this.makeBud()

    const pacman = await whichPm(this.bud.context.basedir)
    if (!isString(pacman) || ![`npm`, `yarn`].includes(pacman)) {
      throw new BudError(`bud upgrade only supports yarn classic and npm.`)
    }

    this.pacman = pacman as `npm` | `yarn`
    this.command = this.pacman === `npm` ? `install` : `add`

    if (!this.version) {
      const get = await import(`@roots/bud-support/axios`)
        .then(m => m.default.get)
        .catch(error => {
          throw BudError.normalize(error)
        })

      this.version = await get(
        `https://registry.npmjs.org/@roots/bud/latest`,
      )
        .then(async res => res.data?.version)
        .catch(this.catch)
    }

    if (this.hasUpgradeableDependencies(`devDependencies`)) {
      await this.$(this.pacman, [
        this.command,
        ...this.getUpgradeableDependencies(`devDependencies`),
        ...this.getFlags(`devDependencies`),
      ]).catch(this.catch)
    }

    if (this.hasUpgradeableDependencies(`dependencies`)) {
      await this.$(this.pacman, [
        this.command,
        ...this.getUpgradeableDependencies(`dependencies`),
        ...this.getFlags(`dependencies`),
      ]).catch(this.catch)
    }
  }

  @bind
  public getAllDependenciesOfType(
    type: `dependencies` | `devDependencies`,
  ): Array<string> {
    return this.bud?.context.manifest?.[type]
      ? Object.keys(this.bud.context.manifest[type])
      : []
  }

  @bind
  public getFlags(type: `dependencies` | `devDependencies`) {
    const flags = []

    if (this.registry) flags.push(`--registry`, this.registry)

    if (type === `devDependencies`) {
      switch (this.pacman) {
        case `npm`:
          flags.push(`--save-dev`)
          break
        case `yarn`:
          flags.push(`--dev`)
          break
      }
    }

    if (type === `dependencies` && this.pacman === `npm`) {
      flags.push(`--save`)
    }

    return flags
  }

  @bind
  public getUpgradeableDependencies(
    type: `dependencies` | `devDependencies`,
  ): Array<string> {
    return this.getAllDependenciesOfType(type)
      .filter(pkg => pkg.startsWith(`@roots/`) || pkg.includes(`bud-`))
      .map(pkg => `${pkg}@${this.version}`)
      .filter(Boolean)
  }

  @bind
  public hasUpgradeableDependencies(
    type: `dependencies` | `devDependencies`,
  ): boolean {
    return this.getUpgradeableDependencies(type)?.length > 0
  }
}
