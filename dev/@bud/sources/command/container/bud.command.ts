import {CommandClass, Option} from 'clipanion'

import {Command} from '../base.command'

export class ContainerBud extends Command {
  public static paths: CommandClass['paths'] = [[`@bud`, `:`]]

  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `run a @bud command inside the container.`,
    details: `equivalent to \`docker compose run bud yarn @bud [...]\``,
    examples: [
      [
        `run \`yarn @bud make\` within the container`,
        `yarn @bud : make`,
      ],
    ],
  }

  public passthrough = Option.Proxy({
    name: `@bud options`,
  })

  public async execute() {
    await this.$(
      this.withPassthrough(`docker compose run bud yarn @bud`),
    )
  }
}
