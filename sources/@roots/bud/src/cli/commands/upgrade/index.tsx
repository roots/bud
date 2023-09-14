import BudCommand from '@roots/bud/cli/commands'
import axios from '@roots/bud-support/axios'
import {Command, Option} from '@roots/bud-support/clipanion'
import {bind} from '@roots/bud-support/decorators/bind'
import {BudError} from '@roots/bud-support/errors'
import isString from '@roots/bud-support/lodash/isString'
import logger from '@roots/bud-support/logger'
import semver from '@roots/bud-support/semver'
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
      [
        `Upgrade all bud dependencies to version 6.15.2`,
        `$0 upgrade 6.15.2`,
      ],
      [
        `Upgrade all bud dependencies to version 6.15.2 using yarn-classic`,
        `$0 upgrade 6.15.2 --pm yarn-classic`,
      ],
    ],
  })

  /**
   * {@link BudCommand.clean}
   */
  public override clean = true

  public command: `add` | `install`

  /**
   * {@link BudCommand.force}
   */
  public override force = true

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
   * Do registry request
   */
  @bind
  public async doRegistryRequest(uri: string) {
    const request = `${this.registry}/${uri}`

    const response = await axios
      .get(request)
      .catch((error: Error | string): never => {
        const normalError = BudError.normalize(error)
        normalError.details = `There was a problem requesting data from ${request}`
        normalError.thrownBy = `@roots/bud-support/axios`
        throw normalError
      })

    if (response.status !== 200) {
      const badResponse = BudError.normalize(response.statusText)
      badResponse.details = `There was a problem requesting data from ${request}`
      badResponse.thrownBy = `@roots/bud-support/axios`
      throw badResponse
    }

    return response.data
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
        throw normalError
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
        logger.log(
          `registry set to`,
          this.registry,
          `(setting sourced from .yarnrc.yml)`,
        )
      }
    }

    this.command = this.pm === `npm` ? `install` : `add`
    this.pm = this.pm === `yarn-classic` ? `yarn` : this.pm
    logger.log(`set package manager to`, this.pm)

    if (!isString(this.version)) {
      const requestData = await this.doRegistryRequest(
        `@roots/bud/latest`,
      )
      logger.info(`latest version request data`, requestData)
      this.version = requestData?.version
      logger.log(`version set to`, this.version)
    }

    if (await this.hasUpgradeableDependencies(`devDependencies`)) {
      const devDependencies =
        await this.getUpgradeableDependencies(`devDependencies`)
      devDependencies.unshift(`@roots/bud@${this.version}`)
      logger.log(
        `Upgrading devDependencies`,
        `\n`,
        devDependencies.join(`\n `),
      )

      await this.$(this.pm, [
        this.command,
        ...devDependencies,
        ...this.getFlags(`devDependencies`),
      ]).catch(this.catch)
    }

    if (await this.hasUpgradeableDependencies(`dependencies`)) {
      const dependencies =
        await this.getUpgradeableDependencies(`dependencies`)
      logger.log(`Upgrading dependencies`, `\n`, dependencies.join(`\n `))

      await this.$(this.pm, [
        this.command,
        ...dependencies,
        ...this.getFlags(`dependencies`),
      ]).catch(this.catch)
    }

    if (this.pm === `pnpm`) {
      await this.$(`pnpm`, [`install`, `--shamefully-hoist`])
    }
  }

  @bind
  public getAllDependenciesOfType(
    type: `dependencies` | `devDependencies`,
  ): Array<string> {
    if (!this.bud?.context.manifest?.[type]) return []
    const dependencies = this.bud.context.manifest[type]

    return Object.entries(dependencies)
      .filter(
        ([, version]: [string, string]) =>
          version && !version?.includes(`workspace:`),
      )
      .map(([signifier]) => signifier)
  }

  @bind
  public getFlags(type: `dependencies` | `devDependencies`) {
    const flags = []

    if (type === `devDependencies`) {
      switch (this.pm) {
        case `npm`:
          flags.push(`--save-dev`)
          break

        case `pnpm`:
          flags.push(`--save-dev`)
          break

        default:
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

        default:
          break
      }

    if (this.pm !== `yarn`) {
      flags.push(`--registry`, this.registry)
    }

    return flags
  }

  @bind
  public async getUpgradeableDependencies(
    type: `dependencies` | `devDependencies`,
  ): Promise<Array<string>> {
    const allBudSignifiers = this.getAllDependenciesOfType(type).filter(
      signifier =>
        signifier.startsWith(`bud-`) ||
        signifier.includes(`/bud-`) ||
        signifier === `@roots/sage`,
    )

    const rootsPackages = allBudSignifiers
      .filter(signifier => signifier.startsWith(`@roots/`))
      .map(signifier => `${signifier}@${this.version}`)

    const communityPackages = await Promise.all(
      allBudSignifiers
        .filter(signifier => !signifier.startsWith(`@roots/`))
        .map(async signifier => {
          const {versions} = await this.doRegistryRequest(signifier)
          const manifests = Object.values(versions).reverse()

          const match: {version?: string} = manifests.find(
            ({bud}: {bud?: {version?: string}}) => {
              if (!bud?.version) return false

              const satisfies = semver.satisfies(this.version, bud.version)
              logger.log({
                required: bud.version,
                satisfies,
                version: this.version,
              })
              return satisfies
            },
          )

          const install = !match?.version
            ? `${signifier}@latest`
            : `${signifier}@${match.version}`

          return install
        }),
    )

    const installList = [...rootsPackages, ...communityPackages].filter(
      isString,
    )

    return installList
  }

  @bind
  public async hasUpgradeableDependencies(
    type: `dependencies` | `devDependencies`,
  ): Promise<boolean> {
    return (await this.getUpgradeableDependencies(type))?.length > 0
  }
}
