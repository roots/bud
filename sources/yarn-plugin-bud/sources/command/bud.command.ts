import {CommandClass} from 'clipanion'

import {Command} from './base.command'

export class Bud extends Command {
  public static paths: CommandClass['paths'] = [[`@bud`]]

  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `run developer commands`,
    details: `\
Use this command to assist with developer tasks and debugging across the repository.

If you are just trying to build \`bud.js\` run \`yarn @bud make\`.

If you are doing development work in the repository you can run \`yarn @bud build -w\` to watch for changes and rebuild automatically.
`,
  }

  public async execute() {
    this.context.stdout.write(Bud.usage.details)
  }
}
