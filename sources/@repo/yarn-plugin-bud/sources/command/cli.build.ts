import {CommandClass} from 'clipanion'

import {Command} from './base.command'

export class YarnPluginBuild extends Command {
  public static paths: CommandClass['paths'] = [
    [`@bud`, `plugin`, `build`],
  ]

  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    examples: [[`build @bud yarn plugin`, `yarn @bud plugin build`]],
  }

  public async execute() {
    await this.cli
      .run([`workspace`, `@repo/yarn-plugin-bud`, `build`])
      .catch(error => {
        throw error
      })
      .then(result => {
        if (result !== 0) throw new Error(`Plugin could not be built.`)
      })
  }
}
