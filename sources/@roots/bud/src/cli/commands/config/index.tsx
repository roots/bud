import BudCommand from '@roots/bud/cli/commands'
import {Command} from '@roots/bud-support/clipanion'

import DisplayConfigFiles from './displayConfigFiles.js'
import DisplayGeneratedConfig from './displayGeneratedConfig.js'

/**
 * bud env command
 */
export default class ConfigCommand extends BudCommand {
  public static override paths = [[`config`]]

  public static override usage = Command.Usage({
    category: `debug`,
    description: `Check configuration files`,
    details: `\
      This command will output information about configuration files found in the project.
`,
    examples: [[`Check configuration files used by bud.js`, `$0 config`]],
  })

  /**
   * Execute command
   */
  public override async execute() {
    await this.makeBud()
    await this.bud.run()

    ConfigCommand.renderStatic(<DisplayConfigFiles bud={this.bud} />)
    ConfigCommand.renderStatic(<DisplayGeneratedConfig bud={this.bud} />)
  }
}
