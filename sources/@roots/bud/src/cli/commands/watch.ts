import {Command} from 'clipanion'

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
  public mode: 'development' = 'development'

  /**
   * Command paths
   *
   * @public
   */
  public static paths = [[`watch`]]

  /**
   * Watch mode
   *
   * @public
   */
  public static watch = true

  /**
   * Comand usage
   *
   * @public
   */
  public static usage = Command.Usage({
    category: `Compile`,
    description: `Compile and serve source assets`,
    examples: [
      [`Start dev server and compile assets in dev mode`, `$0 dev`],
    ],
  })
}
