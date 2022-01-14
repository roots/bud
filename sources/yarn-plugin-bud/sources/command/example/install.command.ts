import {CommandClass, Option} from 'clipanion'
import {REGISTRY_PROXY} from '../../constants'
import {Command} from '../base.command'

/**
 * Example install command
 *
 * @internal
 */
export class ExampleInstall extends Command {
  /**
   * Command name
   *
   * @internal
   */
  public name = `example install`

  /**
   * Package manager
   *
   * @internal
   */
  public example = Option.String()

  /**
   * --with flag
   *
   * @internal
   */
  public with = Option.String(`-w,--with`, null, {
    description: `yarn or npm`,
  })

  /**
   * Command paths
   *
   * @internal
   */
  public static paths: CommandClass['paths'] = [
    [`@bud`, `example`, `install`],
  ]

  /**
   * Command usage
   *
   * @internal
   */
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `install an example`,
    examples: [
      [
        `@bud example install babel --with npm`,
        `install ./examples/babel with npm`,
      ],
    ],
  }

  /**
   * cd command screen
   *
   * @internal
   */
  public ctx(command: string) {
    return `cd /${this.with}/${this.example} && ${command}`
  }

  /**
   * Install command screen
   *
   * @internal
   */
  public get install() {
    return this.with === 'yarn'
      ? `yarn --registry ${REGISTRY_PROXY}`
      : `npm install --registry ${REGISTRY_PROXY}`
  }

  /**
   * Execute command
   *
   * @internal
   */
  public async execute() {
    await this.$(this.ctx(this.install))
  }
}
