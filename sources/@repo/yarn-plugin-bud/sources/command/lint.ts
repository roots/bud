import {CommandClass} from 'clipanion'

import {Command} from './base.command'

/**
 * Lint command class
 */
export class Lint extends Command {
  public static paths: CommandClass['paths'] = [[`@bud`, `lint`]]

  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `Lint project`,
  }

  public async execute() {
    this.promised.push(
      this.cli
        .run([`@bud`, `eslint`])
        .then(this.throwIfError)
        .catch(this.catch),

      this.cli
        .run([`@bud`, `syncpack`])
        .then(this.throwIfError)
        .catch(this.catch),

      this.cli
        .run([`@bud`, `prettier`])
        .then(this.throwIfError)
        .catch(this.catch),

      this.cli
        .run([`@bud`, `package-check`])
        .then(this.throwIfError)
        .catch(this.catch),
    )

    await Promise.all(this.promised)
  }
}
