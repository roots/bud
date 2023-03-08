import {Option} from '@roots/bud-support/clipanion'

import {dry} from '../decorators/command.dry.js'
import {detectPackageManager} from '../helpers/detectPackageManager.js'
import BudCommand from './bud.js'

/**
 * bud install command (hidden)
 */
@dry
export default class Install extends BudCommand {
  /**
   * Command paths
   */
  public static override paths = [[`install`], [`add`]]

  /**
   * --dev
   */
  public dev = Option.Boolean(`--dev,--save-dev`, false, {
    description: `Install devDependencies`,
  })

  /**
   * --registry
   */
  public registry = Option.String(`--registry`, undefined, {
    description: `custom registry`,
  })

  /**
   * Packages to install
   */
  public packages = Option.Rest({name: `packages`, required: 1})

  /**
   * Package manager
   */
  protected get manager(): `yarn` | `npm` {
    const manager = detectPackageManager(this.bud)
    if (manager === false) throw new Error(`Package manager is ambiguous`)
    return manager
  }

  /**
   * Subcommand for project package manager
   */
  protected get command() {
    return this.manager === `npm` ? `install` : `add`
  }

  /**
   * Install command flags
   */
  protected get flags() {
    const flags = []

    if (this.dev) {
      switch (this.manager) {
        case `npm`:
          flags.push(`--save-dev`)
          break
        case `yarn`:
          flags.push(`--dev`)
          break
      }
    }

    if (!this.dev && this.manager === `npm`) {
      flags.push(`--save`)
    }

    if (this.registry) flags.push(`--registry`, this.registry)

    return flags
  }

  /**
   * Execute command
   */
  public override async execute() {
    await this.makeBud(this)
    await this.bud.run()

    await this.$(this.manager, [
      this.command,
      ...this.packages,
      ...this.flags,
    ])
  }
}
