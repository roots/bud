import {Command, Option} from 'clipanion'

import {BuildCommand} from './build.js'

/**
 * `bud dev` command
 *
 * @remarks
 * This is really just the `bud build` command with a built-in `--mode dev` flag
 *
 * @public
 */
export class DevCommand extends BuildCommand {
  /**
   * --mode
   *
   * @public
   */
  public mode: 'development' = `development`

  /**
   * Command paths
   *
   * @public
   */
  public static paths = [[`dev`], [`serve`]]

  /**
   * --browser
   * @public
   */
  public browser = Option.String(`--browser`, undefined, {
    description: `Open browser on successful development build. Pass the application name as a string to open in a specific browser.`,
    tolerateBoolean: true,
  })

  /**
   * --indicator
   */
  public indicator = Option.Boolean(`--indicator`, undefined, {
    description: `Enable development status indicator`,
  })

  /**
   * --overlay
   */
  public overlay = Option.Boolean(`--overlay`, undefined, {
    description: `Enable error overlay in development mode`,
  })

  /**
   * --reload
   */
  public reload = Option.Boolean(`--reload`, undefined, {
    description: `Reload browser on unrecoverable error`,
  })

  /**
   * Comand usage
   *
   * @public
   */
  public static usage = Command.Usage({
    description: `Compile and serve source assets`,
    examples: [
      [`Start dev server and compile assets in dev mode`, `$0 dev`],
    ],
  })
}
