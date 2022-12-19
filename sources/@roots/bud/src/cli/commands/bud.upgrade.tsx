import BudCommand, {Context} from '@roots/bud/cli/commands/bud'
import {dry} from '@roots/bud/cli/decorators/command.dry'
import {Command, Option} from '@roots/bud-support/clipanion'
import {bind} from '@roots/bud-support/decorators'
import {execa} from '@roots/bud-support/execa'

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

  public version = Option.String({required: false})
  public directory = Option.String(`--cwd`, undefined, {
    description: `installation directory`,
  })
  public registry = Option.String(`--registry`, undefined, {
    description: `private registry`,
  })

  public override async execute() {
    await this.makeBud(this)
    await this.healthcheck(this)
    await this.run(this)

    if (isInternalDevelopmentEnv(this.bud)) {
      throw new Error(`Internal development environment`)
    }

    if (!this.directory) {
      this.directory = this.context.basedir
    }

    if (!this.version) {
      this.version = await this.latest()
    }

    const installDepsOfType = async (
      type: `devDependencies` | `dependencies`,
    ) =>
      await execa(
        this.getPacman(),
        this.getInstallArgs(type),
        this.getProcessOptions(),
      )

    try {
      this.hasDependenciesOfType(`devDependencies`) &&
        (await installDepsOfType(`devDependencies`))
    } catch (error) {
      throw error
    }

    try {
      this.hasDependenciesOfType(`dependencies`) &&
        (await installDepsOfType(`dependencies`))
    } catch (error) {
      throw error
    }
  }

  @bind
  public getPacman(): `yarn` | `npm` {
    const pacman = detectPackageManager(this.bud)
    if (pacman === false) {
      throw new Error(`Package manager is ambiguous`)
    }
    return pacman
  }

  @bind
  public getInstallArgs(type: `devDependencies` | `dependencies`) {
    const npmFlagMap = new Map([
      [`dependencies`, `--save`],
      [`devDependencies`, `--save-dev`],
    ])

    return (
      /** `dependencies` or `devDependencies` */
      this.getDependenciesOfType(type)
        /** in the @roots/ scope or starting with bud- */
        .filter(
          signifier =>
            signifier.startsWith(`@roots/`) || signifier.includes(`bud-`),
        )
        /** formatted as `{signifier}@{semver}` */
        .reduce(
          (args, dep) => [...args, `${dep}@${this.version}`],
          /** prefix the packages with the install/add subcommand */
          [this.getPacman() === `npm` ? `install` : `add`],
        )
        /** set install flags... */
        .concat(
          /** ... --save / --save-dev */
          this.getPacman() === `npm` ? npmFlagMap.get(type) : undefined,
          /** ... --registry */
          this.registry ? `--registry=${this.registry}` : undefined,
        )
        /** remove unset flags */
        .filter(Boolean)
    )
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
  public hasDependenciesOfType(
    type: `devDependencies` | `dependencies`,
  ): boolean {
    return this.bud?.context.manifest?.[type] !== undefined
  }

  @bind
  public getProcessOptions() {
    return {
      reject: false,
      cwd: this.directory,
      stdout: this.context.stdout,
      stderr: this.context.stderr,
    }
  }

  @bind
  public async latest() {
    const axios = await import(`axios`).then(axios => axios.default)
    return await axios
      .get(`https://registry.npmjs.org/@roots/bud/latest`)
      .then(async res => res.data?.version)
  }
}
