import {Command} from '@roots/bud-support/clipanion'

import BuildCommand from './bud.build.js'
import type {Context} from './bud.js'

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
    details: `\
      \`bud build production\` compiles source assets in \`production\` mode.

      If you run this command without a bud configuration file \`bud\` will
      look for an entrypoint at \`@src/index.js\`.
    `,
    examples: [[`compile source assets`, `$0 build production`]],
  })

  /**
   * {@link BuildCommand.withSubcommandContext}
   */
  public override withSubcommandContext: BuildCommand[`withSubcommandContext`] =
    async (context: Context) => {
      return {
        ...context,
        mode: `production` as `production`,
      }
    }
}
