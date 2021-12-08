import {CommandClass} from 'clipanion'

import {Command} from '../base.command'

export class DockerDown extends Command {
  public static paths: CommandClass['paths'] = [[`@bud`, `down`]]

  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `stop the container`,
    examples: [[`stop the container`, `yarn @bud down`]],
  }

  public async execute() {
    await this.$(`docker compose down`)
  }
}
