import type mode from '@roots/bud/cli/flags/mode'

import BuildCommand from '@roots/bud/cli/commands/build'
import browser from '@roots/bud/cli/flags/browser'
import hot from '@roots/bud/cli/flags/hot'
import indicator from '@roots/bud/cli/flags/indicator'
import overlay from '@roots/bud/cli/flags/overlay'
import port from '@roots/bud/cli/flags/port'
import proxy from '@roots/bud/cli/flags/proxy'
import reload from '@roots/bud/cli/flags/reload'

/**
 * `bud build development` command
 */
export default class BuildDevelopmentCommand extends BuildCommand {
  /**
   * {@link Command.paths}
   */
  public static override paths = [
    [`dev`],
    [`development`],
    [`build`, `dev`],
    [`build`, `development`],
  ]

  /**
   * {@link Command.usage}
   */
  public static override usage = BuildCommand.Usage({
    category: `build`,
    description: `Compile source assets in \`development\` mode.`,
    details: `Compile source assets in \`development\` mode.`,
    examples: [
      [
        `Compile source assets in \`development\` mode.`,
        `$0 build development`,
      ],
    ],
  })

  public override mode: typeof mode = `development`

  public browser = browser

  public override hot = hot

  public override proxy = proxy

  public indicator = indicator

  public overlay = overlay

  public port = port

  public reload = reload
}
