import type mode from '@roots/bud/cli/flags/mode'

import {Command} from '@roots/bud-support/clipanion'
import BuildCommand from '@roots/bud/cli/commands/build'

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
    examples: [
      [
        `Compile source assets in \`production\` mode`,
        `$0 build production`,
      ],
    ],
  })

  public override mode: typeof mode = `production`
}
