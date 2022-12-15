import {Command, Option} from '@roots/bud-support/clipanion'

import BuildCommand from './bud.build.js'

/**
 * `bud build development` command
 *
 * @public
 */
export default class BuildDevelopmentCommand extends BuildCommand {
  /**
   * Command paths
   *
   * @public
   */
  public static override paths = [
    [`build`, `development`],
    [`dev`],
    [`development`],
  ]

  /**
   * Command usage
   * @public
   */
  public static override usage = Command.Usage({
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

  /**
   * --mode
   * @public
   */
  public override mode: `development` = `development`

  /**
   * --browser
   * @public
   */
  public override browser = Option.String(`--browser`, undefined, {
    description: `Open browser on successful development build.`,
    tolerateBoolean: true,
  })

  /**
   * --indicator
   * @public
   */
  public override indicator = Option.Boolean(`--indicator`, undefined, {
    description: `Enable development status indicator`,
  })

  /**
   * --overlay
   * @public
   */
  public override overlay = Option.Boolean(`--overlay`, undefined, {
    description: `Enable error overlay in development mode`,
  })

  /**
   * --reload
   * @public
   */
  public override reload = Option.Boolean(`--reload`, undefined, {
    description: `Reload browser on unrecoverable error`,
  })
}
