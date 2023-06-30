import {bind} from '@roots/bud-framework/extension/decorators'
import {Command, Option} from '@roots/bud-support/clipanion'
import {render} from '@roots/bud-support/ink'
import BudCommand from '@roots/bud/cli/commands/bud'
import indent from '@roots/bud/cli/flags/indent'

/**
 * {@link BudCommand}
 */
export default class BudReplCommand extends BudCommand {
  /**
   * {@link BudCommand.paths}
   */
  public static override paths = [[`repl`]]

  /**
   * {@link BudCommand.usage}
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
   * {@link BudCommand.execute}
   */
  @bind
  public override async execute() {
    await this.makeBud()
    await this.bud.run()

    const {Repl} = await import(`./Repl.js`)

    render(<Repl app={this.bud} depth={this.depth} indent={this.indent} />)
  }
}
