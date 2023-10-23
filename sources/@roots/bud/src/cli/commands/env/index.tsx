import BudCommand from '@roots/bud/cli/commands'
import {Command} from '@roots/bud-support/clipanion'

import DisplayEnv from './displayEnv.js'

/**
 * bud env command
 */
export default class EnvCommand extends BudCommand {
  public static override paths = [[`env`]]

  public static override usage = Command.Usage({
    category: `debug`,
    description: `Check environment values`,
    details: `\
      This command will output the values of the environment variables as processed by bud.js.
      You can use this to check that your values are being set correctly.
`,
    examples: [[`Check environment values set by bud.js`, `$0 env`]],
  })

  /**
   * Execute command
   */
  public override async execute() {
    await this.makeBud()
    await this.bud.run()

    this.renderStatic(<DisplayEnv bud={this.bud} />)
  }
}
