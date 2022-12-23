import {Option} from '@roots/bud/cli/commands/bud'
import BuildCommand from '@roots/bud/cli/commands/bud.build'
import type {CommandContext} from '@roots/bud-framework/options'

/**
 * `bud build development` command
 *
 * @public
 */
export default class BuildDevelopmentCommand extends BuildCommand {
  public static override paths = [
    [`build`, `development`],
    [`dev`],
    [`development`],
  ]
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

  public reload = Option.Boolean(`--reload`, undefined, {
    description: `Reload browser on unrecoverable errors`,
  })

  public overlay = Option.Boolean(`--overlay`, undefined, {
    description: `Display error overlay in the browser`,
  })

  public indicator = Option.Boolean(`--indicator`, undefined, {
    description: `Display status in the browser`,
  })

  public browser = Option.String(`--browser`, undefined, {
    description: `Open browser on successful development build.`,
  })

  public override withSubcommandContext = async (
    context: CommandContext,
  ) => {
    return {
      ...context,
      mode: `development` as `development`,
    }
  }
  public override withSubcommandArguments = async (
    args: CommandContext[`args`],
  ) => {
    return {
      ...args,
      browser: this.browser,
      indicator: this.indicator,
      overlay: this.overlay,
      reload: this.reload,
    }
  }
}
