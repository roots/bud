import {CommandClass, Option} from 'clipanion'

import {Command} from '../base.command'

export class ContainerUp extends Command {
  public static paths: CommandClass['paths'] = [[`@bud`, `up`]]

  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `start the container`,
    details: `equivalent to \`docker compose up [...]\``,
    examples: [
      [`start the container`, `yarn @bud up`],
      [`start the container detached`, `yarn @bud up -d`],
    ],
  }

  public passthrough = Option.Proxy({
    name: `docker compose up options`,
  })

  public async execute() {
    await this.$(this.withPassthrough(`docker compose up`))
  }
}
