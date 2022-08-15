import * as repo from '@repo/constants'
import {CommandClass} from 'clipanion'

import {Command} from './base.command'

/**
 * Emulate CI workflow command
 *
 * @internal
 */
export class CI extends Command {
  /**
   * Command name
   *
   * @internal
   */
  public static label = '@bud ci'

  /**
   * Command paths
   *
   * @internal
   */
  public static paths: CommandClass['paths'] = [[`@bud`, `ci`]]

  /**
   * Command usage
   *
   * @internal
   */
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `Emulate CI workflow`,
    examples: [[`Emulate CI workflow`, `yarn @bud ci`]],
  }

  /**
   * Command execution
   *
   * @internal
   */
  public async execute() {
    await this.$(`yarn @bud clean`)
    await this.$(`yarn install`)
    await this.$(`yarn @bud build`)
    await this.$(
      `yarn @bud lint dependencies`,
      `yarn @bud lint format --no-fix`,
      `yarn @bud lint exports`,
      `yarn @bud test unit`,
    )
    await this.$(`yarn @bud registry start`)
    await this.$(`yarn @bud release --tag latest`)
    await this.$(`yarn @bud test integration`)
    await this.$(`yarn @bud test e2e`)
  }

  public async err(error: Error) {
    this.log(error.message)
  }
}
