import {bind} from '@roots/bud-framework/extension/decorators'
import {Command, Option} from '@roots/bud-support/clipanion'
import {dry} from '@roots/bud/cli/decorators/dry'
import indent from '@roots/bud/cli/flags/indent'

import BudCommand from '../bud.js'

/**
 * `bud repl`
 */
@dry
export default class BudReplCommand extends BudCommand {
  /**
   * {@link Command.paths}
   */
  public static override paths = [[`repl`]]

  /**
   * {@link Command.usage}
   */
  public static override usage = Command.Usage({
    description: `Use bud in a repl`,
    examples: [[`repl`, `$0 repl`]],
  })

  public depth = Option.String(`--depth,-d`, `1`, {
    description: `recursion depth`,
    tolerateBoolean: false,
  })

  public indent = indent

  /**
   * {@link Command.execute}
   */
  @bind
  public override async execute() {
    await this.makeBud()
    await this.bud.run()

    const {Repl} = await import(`./Repl.js`)

    this.render(
      <Repl app={this.bud} depth={this.depth} indent={this.indent} />,
    )
  }
}
