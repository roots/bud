import {flags} from '@oclif/command'
import {chalk, Signale} from '@roots/bud-support'

import {DependenciesManager} from '../../services/Dependencies/dependencies.dependencies'
import {Command} from '../Command'

export default class Install extends Command {
  /**
   * @public
   */
  public static id = 'install'

  /**
   * @public
   */
  public static title = 'install'

  /**
   * @public
   */
  public static description = 'install peer dependencies'

  /**
   * @public
   */
  public static examples = ['$ bud install']

  /**
   * @public
   */
  public static aliases = ['init']

  /**
   * @public
   */
  public static flags = {
    ...Command.flags,
    ['log']: flags.boolean({
      default: false,
      hidden: true,
    }),
    ['log.papertrail']: flags.boolean({
      default: false,
      hidden: true,
    }),
  }

  /**
   * @public
   */
  public async run() {
    await this.prime(Install)
    await this.app.project.buildProfile()
    const logger = new Signale()

    const dependencies: Array<[string, string]> =
      this.app.project
        .get('unmet')
        .map(({name, version}) => [name, version])

    logger.await({
      message: `installing dependencies`,
      suffix: chalk.dim(dependencies),
    })

    const manager = new DependenciesManager(
      this.app.path('project'),
    )

    try {
      await manager.client.install(
        dependencies,
        true,
        (message: string) => {
          logger.log({
            prefix: chalk.blue(manager.isYarn ? 'yarn' : 'npm'),
            message: chalk.dim(message),
          })
        },
      )

      logger.success(chalk.green`installation complete`)
    } catch (error) {
      logger.error(error)
      this.exit(1)
    }

    this.exit()
  }
}
