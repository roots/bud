import type mode from '@roots/bud/cli/flags/mode'

import BuildCommand from '@roots/bud/cli/commands/build'
import {Command} from '@roots/bud-support/clipanion'

/**
 * `bud build production` command
 */
export default class BuildProductionCommand extends BuildCommand {
  /**
   * {@link Command.paths}
   */
  public static override paths = [[`build`, `production`], [`production`]]

  /**
   * {@link Command.usage}
   */
  public static override usage = Command.Usage({
    category: `build`,
    description: `Compiles source assets in \`production\` mode.`,
    examples: [
      [`Compile source assets in \`production\` mode`, `$0 build`],
    ],
  })

  public override mode: typeof mode = `production`
}
