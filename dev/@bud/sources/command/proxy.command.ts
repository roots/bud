import {CommandClass, Option} from 'clipanion'

import {Command} from './base.command'

export class Proxy extends Command {
  public static paths: CommandClass['paths'] = [
    [`@bud`, `proxy`],
  ]
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `publish packages to proxy repo`,
    examples: [[`publish packages to proxy`, `yarn @bud proxy`]],
  }

  public registry = Option.String(
    '-r,--registry',
    'http://verdaccio:4873',
    {
      description: 'registry url. default http://verdaccio:4873',
    },
  )

  public version = Option.String('-v,--version', null, {
    description: 'version',
  })

  public async auth() {
    await this.$(
      `yarn npm-auth-to-token -u test -p test -e -test@test.com -r ${this.registry}`,
    )
  }

  public async setRegistry() {
    await this.$(`npm set registry ${this.registry}`)
  }

  public async npmVersion() {
    if (this.version) {
      await this.$(
        `yarn workspaces foreach --no-private exec npm version ${this.version}`,
      )
    }
  }

  public async publish() {
    await this.$(
      `yarn workspaces foreach --no-private npm publish --access public`,
    )
  }

  public async execute() {
    await this.auth()
    await this.setRegistry()
    await this.npmVersion()
    await this.publish()
  }
}
