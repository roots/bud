import {CommandClass, Option} from 'clipanion'

import {Command} from './base.command.js'

/**
 * Lint command class
 */
export class Lint extends Command {
  public static override paths: CommandClass['paths'] = [[`@bud`, `lint`]]

  public static override usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `Lint project`,
  }

  public fix = Option.Boolean(`--fix`, false)

  public async execute() {
    await Promise.all([
      this.cli
        .run(
          [`@bud`, `eslint`, this.fix ? `--fix` : undefined].filter(
            Boolean,
          ),
        )
        .then(this.throwIfError)
        .catch(this.catch),

      this.cli
        .run([`@bud`, `syncpack`])
        .then(this.throwIfError)
        .catch(this.catch),

      this.cli
        .run(
          [`@bud`, `prettier`, this.fix ? `--write` : undefined].filter(
            Boolean,
          ),
        )
        .then(this.throwIfError)
        .catch(this.catch),

      this.cli
        .run([`@bud`, `package-check`])
        .then(this.throwIfError)
        .catch(this.catch),
    ])
  }
}
