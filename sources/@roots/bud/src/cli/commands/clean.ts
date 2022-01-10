import * as oclif from '@oclif/core'
import {fs} from '@roots/bud-support'

import {remove} from '../cli.dependencies.js'
import {Command} from '../Command/index.js'

const {ensureDir} = fs

/**
 * @internal
 */
export default class Clean extends Command {
  /**
   * @internal
   */
  public static description =
    'clean project distributables and caches'

  /**
   * @internal
   */
  public static examples = [`$ bud clean`]

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
      default: true,
      hidden: true,
    }),
    ['dashboard']: oclif.Flags.boolean({
      default: false,
      hidden: true,
    }),
  }

  /**
   * @internal
   */
  public async run() {
    await this.prime(Clean)

    this.logger.enable()

    this.logger.info('clearing artifacts')

    try {
      this.logger.pending(`emptying ${this.app.path('storage')}`)

      await ensureDir(this.app.path('storage'))
      await remove(this.app.path('storage'))

      this.logger.success(`emptying ${this.app.path('storage')}`)
    } catch (err) {
      this.logger.error(err)
      this.exit(1)
    }

    try {
      this.logger.pending(`emptying ${this.app.path('dist')}`)

      await remove(this.app.path('dist'))

      this.logger.success(`emptying ${this.app.path('dist')}`)
    } catch (err) {
      this.logger.error(err)
      this.exit(1)
    }

    this.exit(0)
  }
}
