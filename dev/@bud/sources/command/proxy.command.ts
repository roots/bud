import {CommandClass, Option} from 'clipanion'

import {Command} from './base.command'

/**
 * Proxy command class
 *
 * @internal
 */
export class Proxy extends Command {
  /**
   * Command paths
   *
   * @internal
   */
  public static paths: CommandClass['paths'] = [
    [`@bud`, `proxy`],
  ]

  /**
   * Command usage
   *
   * @internal
   */
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `publish packages to proxy repo`,
    examples: [[`publish packages to proxy`, `yarn @bud proxy`]],
  }

  /**
   * --registry option
   *
   * @internal
   */
  public registry = Option.String(
    '-r,--registry',
    'http://verdaccio:4873',
    {
      description: 'registry url. default http://verdaccio:4873',
    },
  )

  /**
   * Execute command
   *
   * @internal
   */
  public async execute() {
    await this.auth()
    await this.setRegistry()
    await this.npmVersion()
    await this.publish()
  }

  /**
   * --version option
   *
   * @internal
   */
  public version = Option.String('-v,--version', null, {
    description: 'version',
  })

  /**
   * exec: authenticate
   *
   * @internal
   */
  public async auth() {
    await this.$(
      `yarn npm-auth-to-token -u test -p test -e -test@test.com -r ${this.registry}`,
    )
  }

  /**
   * exec: set registry
   *
   * @internal
   */
  public async setRegistry() {
    await this.$(`npm set registry ${this.registry}`)
  }

  /**
   * exec: version packages
   *
   * @internal
   */
  public async npmVersion() {
    if (this.version) {
      await this.$(
        `yarn workspaces foreach --no-private exec npm version ${this.version}`,
      )
    }
  }

  /**
   * exec: publish packages
   *
   * @internal
   */
  public async publish() {
    await this.$(
      `yarn workspaces foreach --no-private npm publish --access public`,
    )
  }
}
