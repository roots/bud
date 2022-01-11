import {CommandClass} from 'clipanion'

import {Command} from '../base.command'

/**
 * Proxy make command class
 *
 * @internal
 */
export class ProxyMake extends Command {
  /**
   * Command name
   *
   * @internal
   */
  public name = 'proxy make'

  /**
   * Command paths
   *
   * @internal
   */
  public static paths: CommandClass['paths'] = [
    ['@bud', 'proxy', 'make'],
  ]

  /**
   * Command usage
   *
   * @internal
   */
  public static usage: CommandClass['usage'] = {
    category: '@bud',
    description: 'make proxy server',
    examples: [
      ['make verdaccio server', 'yarn @bud proxy make'],
    ],
  }

  /**
   * Requires container
   *
   * @remarks
   * Will fail if process.env.BUD_ENV does not equal 'container'
   *
   * @internal
   */
  public requiresContainer = true

  /**
   * Execute command
   *
   * @internal
   */
  public async execute() {
    await this.$(`yarn cache clean --all`)
    await this.$(`yarn @bud config --proxy`)
    await this.$(`yarn @bud proxy publish`)
    await this.$(`yarn @bud config`)
  }
}
