import {bind} from '@roots/bud-framework/extension/decorators'
import {Command, Option} from '@roots/bud-support/clipanion'
import {render} from '@roots/bud-support/ink'
import logger from '@roots/bud-support/logger'
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
    category: `debug`,
    description: `Explore the fully booted bud object`,
    examples: [[`Explore the fully booted bud object`, `$0 repl`]],
  })

  public depth = Option.String(`--depth,-d`, `1`, {
    description: `recursion depth`,
    tolerateBoolean: false,
  })

  public indent = indent

  /**
   * {@link BudCommand.catch}
   */
  public override async catch(error: Error) {
    logger.error(error.message)
  }

  /**
   * {@link BudCommand.execute}
   */
  @bind
  public override async execute() {
    await this.makeBud().catch(logger.warn)

    await this.bud.compiler?.compile(this.bud).catch(error => {
      throw error
    })

    const {Repl} = await import(`./Repl.js`)

    render(<Repl app={this.bud} depth={this.depth} indent={this.indent} />)
  }
}
