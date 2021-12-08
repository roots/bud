import {CommandClass, Option} from 'clipanion'

import {Command} from '../base.command'

export class DockerExec extends Command {
  public static paths: CommandClass['paths'] = [[`@bud`, `bash`]]

  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `open a bash shell`,
    examples: [[`open a bash shell`, `yarn @bud bash`]],
  }

  public async execute() {
    await this.$(`docker compose run bud bash`)
  }
}
