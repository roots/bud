import {Command, Option} from 'clipanion'

import {BuildCommand} from './build.base.js'

/**
 * `bud build development` command
 *
 * @public
 */
export class BuildDevelopmentCommand extends BuildCommand {
  /**
   * Command paths
   *
   * @public
   */
  public static paths = [
    [`build`, `development`],
    [`dev`],
    [`development`],
  ]

  /**
   * Command usage
   * @public
   */
  public static usage = Command.Usage({
    category: `build`,
    description: `Compiles source assets in \`development\` mode.`,
    details: `\
      \`bud build development\` compiles source assets in \`development\` mode.

      If you run this command without a bud configuration file \`bud\` will
      look for an entrypoint at \`@src/index.js\`.
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
  public mode: `development` = `development`

  /**
   * --browser
   * @public
   */
  public browser = Option.String(`--browser`, undefined, {
    description: `Open browser on successful development build.`,
    tolerateBoolean: true,
  })

  /**
   * --indicator
   * @public
   */
  public indicator = Option.Boolean(`--indicator`, undefined, {
    description: `Enable development status indicator`,
  })

  /**
   * --overlay
   * @public
   */
  public overlay = Option.Boolean(`--overlay`, undefined, {
    description: `Enable error overlay in development mode`,
  })

  /**
   * --reload
   * @public
   */
  public reload = Option.Boolean(`--reload`, undefined, {
    description: `Reload browser on unrecoverable error`,
  })
}
