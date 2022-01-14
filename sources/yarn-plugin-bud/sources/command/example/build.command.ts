import {CommandClass, Option} from 'clipanion'
import {Command} from '../base.command'

/**
 * Example build command
 *
 * @internal
 */
export class ExampleBuild extends Command {
  /**
   * Command name
   *
   * @internal
   */
  public name = `example build`

  /**
   * --with flag
   *
   * @internal
   */
  public with = Option.String(`-w,--with`, null, {
    description: `yarn or npm`,
  })

  /**
   * Package manager
   *
   * @internal
   */
  public example = Option.String()

  /**
   * Command paths
   *
   * @internal
   */
  public static paths: CommandClass['paths'] = [
    [`@bud`, `example`, `build`],
  ]

  /**
   * Command usage
   *
   * @internal
   */
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `build an example`,
    examples: [
      [
        `@bud example build babel --with npm`,
        `build ./examples/babel with npm`,
      ],
    ],
  }

  /**
   * cd command string
   *
   * @internal
   */
  public ctx(command: string) {
    return `cd /${this.with}/${this.example} && ${command}`
  }

  /**
   * Build command string
   *
   * @internal
   */
  public get build() {
    return this.with == 'yarn'
      ? `yarn bud build`
      : `npx bud build`
  }

  /**
   * Execute command
   *
   * @internal
   */
  public async execute() {
    await this.$(this.ctx(this.build))
  }
}
