import {CommandClass} from 'clipanion'
import {REGISTRY_NPM} from '../constants'

import {Command} from './base.command'

/**
 * Make command class
 *
 * @internal
 */
export class Make extends Command {
  /**
   * Command paths
   *
   * @internal
   */
  public static paths: CommandClass['paths'] = [['@bud', 'ci']]

  /**
   * Command usage
   *
   * @internal
   */
  public static usage: CommandClass['usage'] = {
    category: '@bud',
    description: 'make project files in ci',
    examples: [['install/build repo packages', 'yarn @bud ci']],
  }

  /**
   * Execute command
   *
   * @internal
   */
  public async execute() {
    await this.$(`yarn cache clean --all`)

    await this.$(
      `yarn config set npmRegistryServer ${REGISTRY_NPM}`,
    )
    await this.$(
      `yarn config set npmPublishRegistry ${REGISTRY_NPM}`,
    )
    await this.$(
      `yarn config set unsafeHttpWhitelist --json '[]'`,
    )

    await this.$('yarn install --immutable')
    await this.$('yarn @bud build')
    await this.$(
      'yarn @bud lint',
      'yarn @bud test --coverage --verbose --maxWorkers=50%',
    )

    await this.$('yarn @bud docs')
  }
}
