import {Command} from '../Command/index.js'

/**
 * @internal
 */
export default class Install extends Command {
  /**
   * @internal
   */
  public static id: string = 'install'

  /**
   * @internal
   */
  public static description = 'install peer dependencies'

  /**
   * @internal
   */
  public static examples = ['$ bud install']

  /**
   * @internal
   */
  public static aliases = ['init']

  /**
   * @internal
   */
  public static hidden = true

  /**
   * @internal
   */
  public async run() {
    await this.prime(Install)
    await this.app.project.buildProfile()

    process.stdout.write(
      `Since Bud v5.2.0 it is no longer required nor recommended to install dependencies directly to your project\n`,
    )

    this.exit(0)
  }
}
