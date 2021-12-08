import {CommandClass, Option} from 'clipanion'

import {Command} from './base.command'

export class Proxy extends Command {
  public static paths: CommandClass['paths'] = [
    [`@bud`, `verdaccio`],
  ]
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `publish packages to verdaccio proxy`,
    examples: [
      [`publish packages to proxy`, `yarn @bud verdaccio`],
    ],
  }

  public registry = Option.String(
    '-r,--registry',
    'http://verdaccio:4873',
    {
      description: 'registry url. default http://verdaccio:4873',
    },
  )

  public async auth() {
    await this.$(
      `npm-auth-to-token -u test -p test -e -test@test.com -r ${this.registry}`,
    )
  }

  public async setRegistry() {
    await this.$(`npm set registry ${this.registry}`)
  }

  public async publish() {
    await this.$(
      `yarn workspaces foreach --no-private npm --registry ${this.registry} --access public publish`,
    )
  }

  public async execute() {
    await this.auth()
    await this.setRegistry()
    await this.publish()
  }
}
