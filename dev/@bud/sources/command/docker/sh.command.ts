import {CommandClass, Option} from 'clipanion'

import {Command} from '../base.command'

export class DockerExec extends Command {
  public static paths: CommandClass['paths'] = [[`@bud`, `$`]]

  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `run a command in the container`,
    examples: [
      [
        `run bash command in docker container`,
        `yarn @bud @ $ echo "hello world"`,
      ],
    ],
  }

  public rest = Option.Rest()

  public async execute() {
    await this.$(
      `docker compose run bud ${this.rest.reduce(
        (a, c) => `${a} ${c}`,
        ``,
      )}`,
    )
  }
}
