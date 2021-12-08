import {CommandClass, Option} from 'clipanion'

import {Command} from '../base.command'

export class ContainerDown extends Command {
  public static paths: CommandClass['paths'] = [[`@bud`, `down`]]

  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `stop the container`,
    details: `equivalent to \`docker compose down [...]\``,
    examples: [[`stop the container`, `yarn @bud down`]],
  }

  public passthrough = Option.Proxy({
    name: `docker compose down options`,
  })

  public async execute() {
    await this.$(this.withPassthrough(`docker compose down`))
  }
}
