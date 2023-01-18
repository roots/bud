import {Command} from '@roots/bud-support/clipanion'

import BuildCommand from './bud.build.js'
import type {CommandContext} from './bud.js'

/**
 * `bud build production` command
 */
export default class BuildProductionCommand extends BuildCommand {
  public static override paths = [[`build`, `production`], [`production`]]
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
  public override withSubcommandContext = async (
    context: CommandContext,
  ) => {
    return {
      ...context,
      mode: `production` as `production`,
    }
  }
}
