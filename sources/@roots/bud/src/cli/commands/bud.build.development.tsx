import type mode from '@roots/bud/cli/flags/mode'

import BuildCommand from '@roots/bud/cli/commands/bud.build'
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
    [`build`, `development`],
    [`dev`],
    [`development`],
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

  public override browser = browser

  public hot = hot

  public indicator = indicator

  public override mode: typeof mode = `development`

  public overlay = overlay

  public port = port

  public proxy = proxy

  public reload = reload
}
