import {flags} from '@oclif/command'
import {ensureDir} from 'fs-extra'

import {Bud} from '../../Bud'
import {remove} from '../cli.dependencies'
import {Command} from '../Command'

/**
 * @public
 */
export default class Clean extends Command {
  /**
   * @public
   */
  public static id: string = 'clean'

  /**
   * @public
   */
  public static title: string | undefined = 'clean'

  /**
   * @public
   */
  public static description =
    'clean project distributables and caches'

  /**
   * @public
   */
  public static examples = [`$ bud clean`]

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
      default: true,
      hidden: true,
    }),
    ['dashboard']: flags.boolean({
      default: false,
      hidden: true,
    }),
  }

  /**
   * @public
   */
  public app: Bud

  /**
   * @public
   */
  public async run() {
    await this.prime(Clean)
    this.logger.enable()

    this.logger.info(`clearing artifacts`)

    try {
      this.logger.pending(`emptying ${this.app.path('storage')}`)

      await ensureDir(this.app.path('storage'))
      await remove(this.app.path('storage'))

      this.logger.success(`emptying ${this.app.path('storage')}`)
    } catch (err) {
      this.logger.error(err)
    }

    try {
      this.logger.pending(`emptying ${this.app.path('dist')}`)

      await remove(this.app.path('dist'))

      this.logger.success(`emptying ${this.app.path('dist')}`)
    } catch (err) {
      this.logger.error(err)
    }

    process.exit()
  }
}
