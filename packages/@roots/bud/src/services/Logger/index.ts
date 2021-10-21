import {INSTANCE_CONFIG} from './logger.constants'
import {Service, Signale} from './logger.dependencies'
import {Contract, Framework} from './logger.interface'

/**
 * Logger service
 *
 * @public
 */
export class Logger extends Service implements Contract {
  /**
   * Logger instance
   *
   * @public
   */
  public instance: Signale

  /**
   * Class constructor
   *
   * @public
   */
  public constructor(app: Framework) {
    super(app)

    this.instance = new Signale({
      disabled: true,
      interactive: false,
      secrets: [process.cwd()],
      scope: app.name,
      stream: [process.stdout],
    })

    this.instance.config(INSTANCE_CONFIG)

    if (process.argv.includes('--log')) {
      this.instance.enable()
    }
  }
}
