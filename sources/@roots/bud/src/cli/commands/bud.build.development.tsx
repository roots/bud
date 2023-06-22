import type {Context} from '@roots/bud-framework/context'

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

    description: `Compiles source assets in \`development\` mode.`,

    details: `\
      \`bud build development\` compiles source assets in \`development\` mode.
    `,

    examples: [
      [`compile source and serve`, `$0 build development`],
      [
        `open project in system default browser`,
        `$0 build development --browser`,
      ],
      [
        `do not force reload in the browser when encountering a fatal HMR error`,
        `$0 build development --no-reload`,
      ],
      [
        `do not display an error overlay when encountering errors in application code`,
        `$0 build development --no-overlay`,
      ],
    ],
  })

  public browser = browser

  public hot = hot

  public indicator = indicator

  public overlay = overlay

  public port = port

  public proxy = proxy

  public reload = reload

  /**
   * {@link Command.withSubcommandContext}
   */
  public override withSubcommandContext = async (context: Context) => {
    return {
      ...context,
      browser: this.browser,
      hot: this.hot,
      indicator: this.indicator,
      mode: `development` as `development`,
      overlay: this.overlay,
      port: this.port,
      proxy: this.proxy,
      reload: this.reload,
    }
  }
}
