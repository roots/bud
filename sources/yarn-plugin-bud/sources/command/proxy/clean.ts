import {CommandClass} from 'clipanion'
import {Command} from '../base.command'

/**
 * Proxy clean command
 *
 * @internal
 */
export class ProxyClean extends Command {
  /**
   * Command name
   *
   * @internal
   */
  public name = `proxy clean`

  /**
   * Command paths
   *
   * @internal
   */
  public static paths: CommandClass['paths'] = [
    [`@bud`, `proxy`, `clean`],
  ]

  /**
   * Command usage
   *
   * @internal
   */
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `clean proxied packages`,
    examples: [
      [
        `@bud proxy clean`,
        `clean all proxied packages`,
      ],
    ],
  }

  /**
   * cd command string
   *
   * @internal
   */
  public ctx(command: string) {
    return `cd /verdaccio && ${command}`
  }

  /**
   * Execute command
   *
   * @internal
   */
  public async execute() {
    await this.$(this.ctx(`rm -rf *`))
  }
}
