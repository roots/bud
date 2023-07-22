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
    category: `task`,
    description: `Set bud.js version`,
    details: `
      This command will upgrade your bud.js installation to the latest stable version.

      It will upgrade any package that is prefixed with \`@roots/\` or \`bud-\`.

      If a version is specified, the command will upgrade to that version.

      If a private registry is specified, the command will upgrade through that registry.

      This command is a passthrough to the package manager you are using.
    `,
    examples: [
      [`Upgrade all bud dependencies to latest version`, `$0 upgrade`],
    ],
  })

  public command: `add` | `install`

  /**
   * Package manager option
   */
  public pm = Option.String(`--pm`, undefined, {
    description: `Package manager to use. One of: npm, yarn, yarn3, pnpm`,
  })

  /**
   * Registry option
   */
  public registry = Option.String(`--registry`, undefined, {
    description: `custom registry`,
  })

  /**
   * Version option
   */
  public version = Option.String({required: false})

  public get binary() {
    if (this.pm === `yarn3`) return `yarn`
    return this.pm
  }

  /**
   * Catch fetch errors
   */
  public catchFetchError(error: Error | string): never {
    const normalError = BudError.normalize(error)
    normalError.details = `There was a problem fetching the latest version of bud.js`
    normalError.thrownBy = `@roots/bud-support/axios`
    throw normalError
  }

  /**
   * {@link Command.execute}
   */
  public override async execute() {
    await this.makeBud()

    if (!this.pm) {
      const pacman = await whichPm(this.bud.context.basedir).catch(
        error => {
          const normalError = BudError.normalize(error)
          normalError.details = normalError.message
          normalError.thrownBy = `@roots/bud-support/which-pm`
          throw error
        },
      )

      if (!this.isSupportedPackageManager(pacman)) {
        const error = new BudError(
          `bud upgrade only supports yarn classic and npm`,
        )
        error.details = `You are using ${
          pacman ?? `an unknown package manager`
        }`
        error.thrownBy = `@roots/bud/cli/commands/upgrade`
        throw error
      }

      this.pm = pacman
    }

    this.command = this.pm === `npm` ? `install` : `add`

    if (!this.version) {
      const get = await import(`@roots/bud-support/axios`)
        .then(m => m.default.get)
        .catch(this.catchFetchError)

      this.version = await get(
        `${
          this.registry ?? `https://registry.npmjs.org`
        }/@roots/bud/latest`,
      )
        .then(async res => res.data?.version)
        .catch(this.catchFetchError)

      if (!this.version)
        return this.catchFetchError(new Error(`No version found`))
    }

    if (this.pm === `yarn3` && this.registry) {
      const error = new BudError(
        `yarn 3 does not support custom registries via the CLI`,
      )
      error.details = `Set the registry in your .yarnrc.yml`
      error.thrownBy = `@roots/bud/cli/commands/upgrade`
      throw error
    }

    if (this.hasUpgradeableDependencies(`devDependencies`)) {
      await this.$(this.binary, [
        this.command,
        ...this.getUpgradeableDependencies(`devDependencies`),
        ...this.getFlags(`devDependencies`),
      ]).catch(this.catch)
    }

    if (this.hasUpgradeableDependencies(`dependencies`)) {
      await this.$(this.binary, [
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
      switch (this.pm) {
        case `npm`:
          flags.push(`--save-dev`)
          break
        case `pnpm`:
          flags.push(`--save-dev`)
          break
        case `yarn`:
          flags.push(`--dev`)
          break
        case `yarn3`:
          flags.push(`--dev`)
          break
      }
    }

    if (type === `dependencies`)
      switch (this.pm) {
        case `npm`:
          flags.push(`--save`)
          break
        case `pnpm`:
          flags.push(`--save-prod`)
          break
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

  public isSupportedPackageManager(
    pacman: false | string,
  ): pacman is `npm` | `pnpm` | `yarn` | `yarn3` {
    return (
      isString(pacman) && [`npm`, `pnpm`, `yarn`, `yarn3`].includes(pacman)
    )
  }
}
