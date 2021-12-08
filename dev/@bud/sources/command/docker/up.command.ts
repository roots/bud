import {CommandClass} from 'clipanion'

import {Command} from '../base.command'

export class DockerUp extends Command {
  public static paths: CommandClass['paths'] = [[`@bud`, `up`]]

  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `start the container`,
    examples: [[`start the container`, `yarn @ up`]],
  }

  public async execute() {
    await this.$(`docker compose up -d`)
  }
}
