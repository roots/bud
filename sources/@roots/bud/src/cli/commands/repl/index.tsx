import {dry} from '@roots/bud/cli/decorators'
import {bind} from '@roots/bud-framework/extension/decorators'
import {Command, Option} from '@roots/bud-support/clipanion'

import BudCommand from '../bud.js'

/**
 * bud repl command
 */
@dry
export default class BudReplCommand extends BudCommand {
  /**
   * Command paths
   */
  public static override paths = [[`repl`]]

  /**
   * Command usage
   */
  public static override usage = Command.Usage({
    description: `Use bud in a repl`,
    examples: [[`repl`, `$0 repl`]],
  })

  /**
   * `--color`
   */
  public color = Option.Boolean(`--color,-c`, true, {
    description: `use syntax highlighting`,
  })

  /**
   * `--indent`
   */
  public indent = Option.String(`--indent,-i`, `1`, {
    description: `indentation level`,
    tolerateBoolean: false,
  })

  /**
   * `--depth`
   */
  public depth = Option.String(`--depth,-d`, `1`, {
    description: `recursion depth`,
    tolerateBoolean: false,
  })

  /**
   * Execute command
   */
  @bind
  public override async execute() {
    await this.makeBud(this)
    await this.bud.run()

    const {Repl} = await import(`./Repl.js`)

    this.render(
      <Repl app={this.bud} indent={this.indent} depth={this.depth} />,
    )
  }
}
