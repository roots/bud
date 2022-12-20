import {execSync} from 'node:child_process'

import BudCommand, {Context} from '@roots/bud/cli/commands/bud'
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
  public override withArguments = async (args: Context[`args`]) => ({
    ...args,
    dry: true,
  })

  public _version = Option.String({required: false})
  public _directory = Option.String(`--cwd`, undefined, {
    description: `installation directory`,
  })
  public _registry = Option.String(`--registry`, undefined, {
    description: `private registry`,
  })

  public _latest: string | undefined

  public get version() {
    return this._version ?? this._latest
  }
  public get directory() {
    return this._directory ?? this.bud.context.basedir
  }
  public get registry() {
    return this._registry
  }
  public get packageManager(): `yarn` | `npm` {
    const pacman = detectPackageManager(this.bud)
    if (pacman === false) {
      throw new Error(`Package manager is ambiguous`)
    }
    return pacman
  }

  public override async execute() {
    await this.makeBud(this)
    if (isInternalDevelopmentEnv(this.bud)) {
      throw new Error(`Internal development environment`)
    }
    await this.healthcheck(this)
    await this.run(this)
    await this.setLatest()

    if (this.hasBudDependencies(`devDependencies`)) {
      const deps = this.getBudDependencies(`devDependencies`)
      const upgrade = `${this.install} ${deps} ${this.devFlags}`
      process.stdout.write(`Upgrading devDependencies...\n`)
      execSync(upgrade, {encoding: `utf8`, stdio: null})
    }
  }

  @bind
  public async setLatest() {
    const axios = await import(`axios`).then(axios => axios.default)
    this._latest = await axios
      .get(`https://registry.npmjs.org/@roots/bud/latest`)
      .then(async res => res.data?.version)
  }
  public get install() {
    return this.packageManager === `npm` ? `npm install` : `yarn add`
  }

  public get devFlags() {
    return [
      this.packageManager === `npm` ? `--save-dev` : `--dev`,
      this.registry ? [`--registry`, this.registry] : null,
    ]
      .flat()
      .filter(Boolean)
      .join(` `)
  }

  @bind
  public getBudDependencies(
    type: `devDependencies` | `dependencies`,
  ): string {
    const onlyBudPackages = (pkg: string) =>
      pkg.startsWith(`@roots/`) || pkg.includes(`bud-`)

    const toScope = (pkg: string) => `${pkg}@${this.version}`

    return this.getDependenciesOfType(type)
      .filter(onlyBudPackages)
      .map(toScope)
      .filter(Boolean)
      .join(` `)
  }

  @bind
  public getDependenciesOfType(
    type: `devDependencies` | `dependencies`,
  ): Array<string> {
    if (this.bud?.context.manifest?.[type]) {
      return Object.keys(this.bud.context.manifest[type])
    }
    return []
  }

  @bind
  public hasBudDependencies(
    type: `devDependencies` | `dependencies`,
  ): boolean {
    return this.getBudDependencies(type)?.length > 0
  }
}
