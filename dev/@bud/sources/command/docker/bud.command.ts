import {CommandClass, Option} from 'clipanion'

import {Command} from '../base.command'

export class DockerBud extends Command {
  public static paths: CommandClass['paths'] = [[`@bud`, `:`]]

  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `run a @bud command inside the container`,
    examples: [
      [
        `run \`yarn @bud make\` within the container`,
        `yarn @bud : make`,
      ],
    ],
  }

  public rest = Option.Rest()

  public async execute() {
    await this.$(
      `docker compose run bud yarn @bud ${this.rest.reduce(
        (a, c) => `${a} ${c}`,
        ``,
      )}`,
    )
  }
}
