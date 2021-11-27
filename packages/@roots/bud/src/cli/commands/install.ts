import * as oclif from '@oclif/core'
import {chalk, Signale} from '@roots/bud-support'

import {DependenciesManager} from '../../services/Dependencies/dependencies.dependencies.js'
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
  public static flags = {
    ...Command.flags,
    ['log']: oclif.Flags.boolean({
      default: false,
      hidden: true,
    }),
    ['log.papertrail']: oclif.Flags.boolean({
      default: false,
      hidden: true,
    }),
  }

  /**
   * @internal
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

    this.exit(0)
  }
}
