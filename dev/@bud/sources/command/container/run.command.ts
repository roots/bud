import {CommandClass, Option} from 'clipanion'

import {Command} from '../base.command'

export class ContainerRun extends Command {
  public static paths: CommandClass['paths'] = [[`@bud`, `$`]]

  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `run a command in the container`,
    details: `equivalent to \`docker compose run bud [...]\``,

    examples: [
      [
        `run bash command in docker container`,
        `yarn @bud $ echo "hello world"`,
      ],
    ],
  }

  public async execute() {
    await this.$(this.withPassthrough(`docker compose run bud`))
  }
}
