import BudCommand from '@roots/bud/cli/commands'
import {Command, Option} from '@roots/bud-support/clipanion'
import {bind} from '@roots/bud-support/decorators/bind'
import {BudError} from '@roots/bud-support/errors'
import logger from '@roots/bud-support/logger'
import {isLiteral, isOneOf} from '@roots/bud-support/typanion'
import whichPm from '@roots/bud-support/which-pm'

/**
 * `bud upgrade` command
 */
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
      [`Upgrade all bud dependencies to latest`, `$0 upgrade`],
      [`Upgrade all bud dependencies to version 6.15.2`, `$0 upgrade 6.15.2`],
      [`Upgrade all bud dependencies to version 6.15.2 using yarn-classic`, `$0 upgrade 6.15.2 --pm yarn-classic`],
    ],
  })

  public command: `add` | `install`

  /**
   * Package manager option
   */
  public pm = Option.String(`--pm`, undefined, {
    description: `Package manager to use. One of: \`npm\`, \`yarn-classic\`, \`pnpm\` (experimental), or \`yarn\` (experimental)`,
    validator: isOneOf([
      isLiteral(`npm`),
      isLiteral(`pnpm`),
      isLiteral(`yarn`),
      isLiteral(`yarn-classic`),
    ]),
  })

  /**
   * Registry option
   */
  public registry = Option.String(
    `--registry`,
    `https://registry.npmjs.org`,
    {
      description: `custom registry`,
    },
  )

  /**
   * Version option
   */
  public version = Option.String({required: false})

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
      this.pm = await whichPm(this.bud.context.basedir).catch(error => {
        const normalError = BudError.normalize(error)
        normalError.details = normalError.message
        normalError.thrownBy = `@roots/bud-support/which-pm`
        throw error
      })
    }

    if (this.pm === `yarn`) {
      if (this.registry !== `https://registry.npmjs.org`) {
        logger.warn(
          `Yarn berry does not support custom registries set by CLI. Ignoring registry flag. Set your custom registry in \`.yarnrc.yml\``,
        )
        this.registry = `https://registry.npmjs.org`
      }

      const yarnrc = await this.bud.fs.yml.read(
        this.bud.path(`.yarnrc.yml`),
      )
      if (yarnrc?.[`npmRegistryServer`]) {
        this.registry = yarnrc[`npmRegistryServer`]
      }
    }

    this.command = this.pm === `npm` ? `install` : `add`
    this.pm = this.pm === `yarn-classic` ? `yarn` : this.pm

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

    if (this.hasUpgradeableDependencies(`devDependencies`)) {
      await this.$(this.pm, [
        this.command,
        ...this.getUpgradeableDependencies(`devDependencies`),
        ...this.getFlags(`devDependencies`),
      ]).catch(this.catch)
    }

    if (this.hasUpgradeableDependencies(`dependencies`)) {
      await this.$(this.pm, [
        this.command,
        ...this.getUpgradeableDependencies(`dependencies`),
        ...this.getFlags(`dependencies`),
      ]).catch(this.catch)
    }

    if (this.pm === `pnpm`) {
      await this.$(`pnpm`, [`install`, `--shamefully-hoist`])
    }

    /**
     * Clean old caches and distributables
     */
    await this.$(this.pm, [`bud`, `clean`])
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

    if (type === `devDependencies`) {
      switch (this.pm) {
        case `npm`:
          flags.push(`--save-dev`, `--registry`, this.registry)
          break

        case `pnpm`:
          flags.push(`--save-dev`, `--registry`, this.registry)
          break

        default:
          flags.push(`--dev`)
          break
      }
    }

    if (type === `dependencies`)
      switch (this.pm) {
        case `npm`:
          flags.push(`--save`, `--registry`, this.registry)
          break

        case `pnpm`:
          flags.push(`--save-prod`, `--registry`, this.registry)
          break

        case `yarn-classic`:
          flags.push(`--registry`, this.registry)
          break

        case `yarn`:
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
}
