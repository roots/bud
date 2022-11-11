import {Command} from '@roots/bud-support/clipanion'

import BuildCommand from './build.base.js'

/**
 * `bud build production` command
 *
 * @public
 */
export default class BuildProductionCommand extends BuildCommand {
  /**
   * Command paths
   *
   * @public
   */
  public static override paths = [[`build`, `production`], [`production`]]

  /**
   * Command usage
   * @public
   */
  public static override usage = Command.Usage({
    category: `build`,
    description: `Compiles source assets in \`production\` mode.`,
    details: `\
      \`bud build production\` compiles source assets in \`production\` mode.

      If you run this command without a bud configuration file \`bud\` will
      look for an entrypoint at \`@src/index.js\`.
    `,
    examples: [[`compile source assets`, `$0 build`]],
  })

  /**
   * --mode
   *
   * @public
   */
  public override mode: `production` = `production`
}
